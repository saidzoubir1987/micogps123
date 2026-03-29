// googleSheetsService.ts
import { Customer, Device, SubscriptionStatus, DeviceStatus } from '../types';

// LocalStorage keys
const CUSTOMERS_KEY = 'subscription_customers';
const DEVICES_KEY = 'subscription_devices';
const INITIALIZED_KEY = 'subscription_initialized';

// Initialize with sample data if empty
const initializeSampleData = () => {
  // Check if already initialized
  if (localStorage.getItem(INITIALIZED_KEY)) {
    return;
  }

  if (!localStorage.getItem(CUSTOMERS_KEY)) {
    const sampleCustomers: Customer[] = [
      {
        id: '1',
        fullName: 'أحمد محمد',
        phone: '0123456789',
        address: 'الرياض، المملكة العربية السعودية',
        joinDate: new Date(2024, 0, 15).toISOString(),
        status: SubscriptionStatus.Active
      },
      {
        id: '2',
        fullName: 'فاطمة علي',
        phone: '0123456790',
        address: 'جدة، المملكة العربية السعودية',
        joinDate: new Date(2024, 2, 20).toISOString(),
        status: SubscriptionStatus.Active
      }
    ];
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(sampleCustomers));
  }

  if (!localStorage.getItem(DEVICES_KEY)) {
    const today = new Date();
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);
    
    const twentyDaysLater = new Date(today);
    twentyDaysLater.setDate(today.getDate() + 20);

    const sampleDevices: Device[] = [
      {
        id: '1',
        customerId: '1',
        deviceId: 'GPS001',
        deviceName: 'جهاز تتبع 1',
        startDate: today.toISOString(),
        endDate: oneYearLater.toISOString(),
        status: DeviceStatus.Active
      },
      {
        id: '2',
        customerId: '2',
        deviceId: 'GPS002',
        deviceName: 'جهاز تتبع 2',
        startDate: new Date(2024, 2, 20).toISOString(),
        endDate: twentyDaysLater.toISOString(),
        status: DeviceStatus.Active
      }
    ];
    localStorage.setItem(DEVICES_KEY, JSON.stringify(sampleDevices));
  }

  // Mark as initialized
  localStorage.setItem(INITIALIZED_KEY, 'true');
};

// Helper to generate unique IDs
const generateId = (): string => {
  // Use crypto.randomUUID if available, otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
};

// Customer CRUD operations
export const getCustomers = async (): Promise<Customer[]> => {
  initializeSampleData();
  const data = localStorage.getItem(CUSTOMERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addCustomer = async (customer: Omit<Customer, 'id' | 'joinDate' | 'status'>): Promise<Customer> => {
  const customers = await getCustomers();
  const newCustomer: Customer = {
    ...customer,
    id: generateId(),
    joinDate: new Date().toISOString(),
    status: SubscriptionStatus.Active
  };
  customers.push(newCustomer);
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  return newCustomer;
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const customers = await getCustomers();
  const index = customers.findIndex(c => c.id === customer.id);
  if (index !== -1) {
    customers[index] = customer;
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  }
  return customer;
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  const customers = await getCustomers();
  const filtered = customers.filter(c => c.id !== customerId);
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(filtered));
  
  // Also delete associated devices
  const devices = await getDevices();
  const filteredDevices = devices.filter(d => d.customerId !== customerId);
  localStorage.setItem(DEVICES_KEY, JSON.stringify(filteredDevices));
};

// Device CRUD operations
export const getDevices = async (): Promise<Device[]> => {
  initializeSampleData();
  const data = localStorage.getItem(DEVICES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addDevice = async (device: Omit<Device, 'id' | 'status' | 'endDate'>): Promise<Device> => {
  const devices = await getDevices();
  
  // Calculate end date (1 year from start date)
  const startDate = new Date(device.startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);
  
  const newDevice: Device = {
    ...device,
    id: generateId(),
    endDate: endDate.toISOString(),
    status: DeviceStatus.Active
  };
  
  devices.push(newDevice);
  localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
  return newDevice;
};

export const updateDevice = async (device: Device): Promise<Device> => {
  const devices = await getDevices();
  const index = devices.findIndex(d => d.id === device.id);
  if (index !== -1) {
    devices[index] = device;
    localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
  }
  return device;
};

export const deleteDevice = async (deviceId: string): Promise<void> => {
  const devices = await getDevices();
  const filtered = devices.filter(d => d.id !== deviceId);
  localStorage.setItem(DEVICES_KEY, JSON.stringify(filtered));
};