
import { Customer, Device, SubscriptionStatus, DeviceStatus } from '../types';

// --- MOCK DATABASE ---
const createInitialData = () => {
    const customers: Customer[] = [];
    const devices: Device[] = [];
    const firstNames = ['أحمد', 'محمد', 'علي', 'خالد', 'يوسف', 'فاطمة', 'زينب', 'مريم', 'عائشة', 'نور'];
    const lastNames = ['المصري', 'السيد', 'عبدالله', 'حسن', 'محمود', 'الهاشمي', 'القحطاني', 'الغامدي', 'العتيبي', 'المالكي'];

    for (let i = 1; i <= 25; i++) {
        const joinDate = new Date();
        joinDate.setDate(joinDate.getDate() - Math.floor(Math.random() * 365));
        const customerId = `c${i}`;
        const customer: Customer = {
            id: customerId,
            fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            phone: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
            address: `شارع المثال ${i}, الرياض`,
            joinDate: joinDate.toISOString(),
            status: SubscriptionStatus.Active, // To be updated later
        };
        customers.push(customer);

        const deviceCount = Math.floor(Math.random() * 3) + 1;
        let hasActiveDevice = false;
        for (let j = 1; j <= deviceCount; j++) {
            const startDate = new Date(customer.joinDate);
            startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
            // Make some subscriptions about to expire
            if (i % 5 === 0 && j === 1) {
                startDate.setFullYear(startDate.getFullYear() - 1);
                startDate.setDate(startDate.getDate() + 20);
            }
            const endDate = new Date(startDate);
            endDate.setFullYear(endDate.getFullYear() + 1);

            const now = new Date();
            let status: DeviceStatus;
            if (now > endDate) {
                status = DeviceStatus.Expired;
            } else {
                status = DeviceStatus.Active;
                hasActiveDevice = true;
            }

            const device: Device = {
                id: `d${i}-${j}`,
                customerId: customerId,
                deviceId: `DEV${Math.floor(100000 + Math.random() * 900000)}`,
                deviceName: `جهاز تتبع ${j}`,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                status: status,
            };
            devices.push(device);
        }
        customer.status = hasActiveDevice ? SubscriptionStatus.Active : SubscriptionStatus.Expired;
    }
    return { customers, devices };
};

let { customers: mockCustomers, devices: mockDevices } = createInitialData();
// --- END MOCK DATABASE ---

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

const updateCustomerStatus = (customerId: string) => {
    const customerDevices = mockDevices.filter(d => d.customerId === customerId);
    const hasActiveDevice = customerDevices.some(d => d.status === DeviceStatus.Active);
    const customerIndex = mockCustomers.findIndex(c => c.id === customerId);
    if(customerIndex > -1) {
        mockCustomers[customerIndex].status = hasActiveDevice ? SubscriptionStatus.Active : SubscriptionStatus.Expired;
    }
}

// Customer Functions
export const getCustomers = (): Promise<Customer[]> => simulateDelay([...mockCustomers]);
export const addCustomer = (customerData: Omit<Customer, 'id' | 'joinDate' | 'status'>): Promise<Customer> => {
    const newCustomer: Customer = {
        ...customerData,
        id: `c${Date.now()}`,
        joinDate: new Date().toISOString(),
        status: SubscriptionStatus.Expired, // A new customer has no devices, so status is Expired
    };
    mockCustomers.push(newCustomer);
    return simulateDelay(newCustomer);
}
export const updateCustomer = (updatedCustomer: Customer): Promise<Customer> => {
    const index = mockCustomers.findIndex(c => c.id === updatedCustomer.id);
    if (index > -1) {
        mockCustomers[index] = { ...mockCustomers[index], ...updatedCustomer };
        return simulateDelay(mockCustomers[index]);
    }
    return Promise.reject('Customer not found');
}
export const deleteCustomer = (customerId: string): Promise<{success: boolean}> => {
    mockCustomers = mockCustomers.filter(c => c.id !== customerId);
    mockDevices = mockDevices.filter(d => d.customerId !== customerId);
    return simulateDelay({success: true});
}

// Device Functions
export const getDevices = (): Promise<Device[]> => simulateDelay([...mockDevices]);

export const addDevice = (deviceData: Omit<Device, 'id' | 'status' | 'endDate'>): Promise<Device> => {
    const startDate = new Date(deviceData.startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const newDevice: Device = {
        ...deviceData,
        id: `d${Date.now()}`,
        endDate: endDate.toISOString(),
        status: DeviceStatus.Active,
    };
    mockDevices.push(newDevice);
    updateCustomerStatus(newDevice.customerId);
    return simulateDelay(newDevice);
}
export const updateDevice = (updatedDevice: Device): Promise<Device> => {
    const index = mockDevices.findIndex(d => d.id === updatedDevice.id);
    if (index > -1) {
        mockDevices[index] = { ...mockDevices[index], ...updatedDevice };
        const now = new Date();
        const endDate = new Date(mockDevices[index].endDate);
        mockDevices[index].status = now > endDate ? DeviceStatus.Expired : DeviceStatus.Active;
        updateCustomerStatus(mockDevices[index].customerId);
        return simulateDelay(mockDevices[index]);
    }
    return Promise.reject('Device not found');
}
export const deleteDevice = (deviceId: string): Promise<{success: boolean}> => {
    const device = mockDevices.find(d => d.id === deviceId);
    if(device){
        const customerId = device.customerId;
        mockDevices = mockDevices.filter(d => d.id !== deviceId);
        updateCustomerStatus(customerId);
    }
    return simulateDelay({success: true});
}
