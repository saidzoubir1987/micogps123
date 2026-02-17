
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Customer, Device, SubscriptionStatus, View, DeviceStatus } from './types';
import { getCustomers, getDevices, addCustomer as apiAddCustomer, updateCustomer as apiUpdateCustomer, deleteCustomer as apiDeleteCustomer, addDevice as apiAddDevice, updateDevice as apiUpdateDevice, deleteDevice as apiDeleteDevice } from './services/googleSheetsService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import { LoadingIcon } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [customersData, devicesData] = await Promise.all([getCustomers(), getDevices()]);
      setCustomers(customersData);
      setDevices(devicesData);
    } catch (err) {
      setError('فشل في تحميل البيانات. الرجاء المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return {
      totalCustomers: customers.length,
      newCustomers: customers.filter(c => new Date(c.joinDate) > thirtyDaysAgo).length,
      totalDevices: devices.length,
      expiringSoon: devices.filter(d => {
        const endDate = new Date(d.endDate);
        return endDate <= thirtyDaysFromNow && endDate > new Date();
      }).length
    };
  }, [customers, devices]);
  
  const expiringDevices = useMemo(() => {
     const thirtyDaysFromNow = new Date();
     thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
     return devices
       .filter(d => {
         const endDate = new Date(d.endDate);
         return endDate <= thirtyDaysFromNow && endDate > new Date();
       })
       .map(d => ({...d, customerName: customers.find(c => c.id === d.customerId)?.fullName || 'غير معروف'}));
  }, [devices, customers]);

  const addCustomer = async (customer: Omit<Customer, 'id' | 'joinDate' | 'status'>) => {
    const newCustomer = await apiAddCustomer(customer);
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = async (customer: Customer) => {
    const updatedCustomer = await apiUpdateCustomer(customer);
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };
  
  const deleteCustomer = async (customerId: string) => {
    await apiDeleteCustomer(customerId);
    setCustomers(prev => prev.filter(c => c.id !== customerId));
    setDevices(prev => prev.filter(d => d.customerId !== customerId));
  };

  const addDevice = async (device: Omit<Device, 'id' | 'status' | 'endDate'>) => {
    const newDevice = await apiAddDevice(device);
    setDevices(prev => [...prev, newDevice]);
    // A new device is always active, so the customer's status becomes active.
    setCustomers(prevCustomers => prevCustomers.map(c => {
        if (c.id === newDevice.customerId && c.status !== SubscriptionStatus.Active) {
            return { ...c, status: SubscriptionStatus.Active };
        }
        return c;
    }));
  };

  const updateDevice = async (device: Device) => {
    const updatedDevice = await apiUpdateDevice(device);
    setDevices(prevDevices => {
        const newDevicesList = prevDevices.map(d => d.id === updatedDevice.id ? updatedDevice : d);
        
        setCustomers(prevCustomers => {
            const customerDevices = newDevicesList.filter(d => d.customerId === updatedDevice.customerId);
            const hasActiveDevice = customerDevices.some(d => d.status === DeviceStatus.Active);
            const newStatus = hasActiveDevice ? SubscriptionStatus.Active : SubscriptionStatus.Expired;
            
            return prevCustomers.map(c => 
                c.id === updatedDevice.customerId ? { ...c, status: newStatus } : c
            );
        });
        
        return newDevicesList;
    });
  };

  const deleteDevice = async (deviceId: string) => {
    await apiDeleteDevice(deviceId);

    setDevices(prevDevices => {
        const deviceToDelete = prevDevices.find(d => d.id === deviceId);
        if (!deviceToDelete) return prevDevices; 

        const customerId = deviceToDelete.customerId;
        const newDevicesList = prevDevices.filter(d => d.id !== deviceId);

        setCustomers(prevCustomers => {
            const customerDevices = newDevicesList.filter(d => d.customerId === customerId);
            const hasActiveDevice = customerDevices.some(d => d.status === DeviceStatus.Active);
            const newStatus = hasActiveDevice ? SubscriptionStatus.Active : SubscriptionStatus.Expired;
            
            return prevCustomers.map(c => 
                c.id === customerId ? { ...c, status: newStatus } : c
            );
        });

        return newDevicesList;
    });
  };


  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <LoadingIcon className="w-12 h-12 text-blue-500" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
            {error}
          </div>
        </div>
      );
    }
    switch (view) {
      case 'dashboard':
        return <Dashboard stats={stats} expiringDevices={expiringDevices} />;
      case 'customers':
        return (
          <Customers
            customers={customers}
            devices={devices}
            onAddCustomer={addCustomer}
            onUpdateCustomer={updateCustomer}
            onDeleteCustomer={deleteCustomer}
            onAddDevice={addDevice}
            onUpdateDevice={updateDevice}
            onDeleteDevice={deleteDevice}
          />
        );
      case 'new-customers':
        const newCustomersList = customers
          .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
          .slice(0, 50); // Show last 50 new customers
        return (
          <Customers
            customers={newCustomersList}
            devices={devices}
            onAddCustomer={addCustomer}
            onUpdateCustomer={updateCustomer}
            onDeleteCustomer={deleteCustomer}
            onAddDevice={addDevice}
            onUpdateDevice={updateDevice}
            onDeleteDevice={deleteDevice}
            isNewCustomersView={true}
          />
        );
      default:
        return <Dashboard stats={stats} expiringDevices={expiringDevices} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
