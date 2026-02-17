
import React, { useState, useMemo } from 'react';
import { Customer, Device, SubscriptionStatus } from '../types';
import { PlusIcon, SearchIcon, EditIcon, DeleteIcon, DeviceIcon } from './Icons';
import CustomerForm from './CustomerForm';
import DeviceListModal from './DeviceListModal';

interface CustomersProps {
  customers: Customer[];
  devices: Device[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'joinDate' | 'status'>) => Promise<void>;
  onUpdateCustomer: (customer: Customer) => Promise<void>;
  onDeleteCustomer: (customerId: string) => Promise<void>;
  onAddDevice: (device: Omit<Device, 'id' | 'status' | 'endDate'>) => Promise<void>;
  onUpdateDevice: (device: Device) => Promise<void>;
  onDeleteDevice: (deviceId: string) => Promise<void>;
  isNewCustomersView?: boolean;
}

const Customers: React.FC<CustomersProps> = ({ 
    customers, 
    devices, 
    onAddCustomer, 
    onUpdateCustomer, 
    onDeleteCustomer,
    onAddDevice,
    onUpdateDevice,
    onDeleteDevice,
    isNewCustomersView = false
}) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | 'all'>('all');

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);
  
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsCustomerModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(true);
  };
  
  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الزبون وجميع أجهزته؟')) {
      onDeleteCustomer(customerId);
    }
  };

  const handleViewDevices = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeviceModalOpen(true);
  }

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.Active:
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">نشط</span>;
      case SubscriptionStatus.Expired:
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">منتهي</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">غير معروف</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{isNewCustomersView ? 'الزبائن الجدد' : 'إدارة الزبائن'}</h2>
        {!isNewCustomersView && (
             <button onClick={handleAddCustomer} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow">
                <PlusIcon />
                إضافة زبون جديد
            </button>
        )}
      </div>

      {!isNewCustomersView && (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="ابحث بالاسم أو رقم الهاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                </span>
            </div>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as SubscriptionStatus | 'all')}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="all">كل الحالات</option>
                <option value={SubscriptionStatus.Active}>نشط</option>
                <option value={SubscriptionStatus.Expired}>منتهي</option>
            </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600">الاسم الكامل</th>
              <th className="p-3 font-semibold text-sm text-gray-600">رقم الهاتف</th>
              <th className="p-3 font-semibold text-sm text-gray-600">تاريخ الاشتراك</th>
              <th className="p-3 font-semibold text-sm text-gray-600">الحالة</th>
              <th className="p-3 font-semibold text-sm text-gray-600 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="p-3 text-gray-800 font-medium">{customer.fullName}</td>
                <td className="p-3 text-gray-600 font-mono">{customer.phone}</td>
                <td className="p-3 text-gray-600">{new Date(customer.joinDate).toLocaleDateString('ar-EG')}</td>
                <td className="p-3">{getStatusBadge(customer.status)}</td>
                <td className="p-3">
                    <div className="flex justify-center items-center gap-2">
                         <button onClick={() => handleViewDevices(customer)} className="p-2 text-blue-600 hover:text-blue-800" title="عرض الأجهزة"><DeviceIcon /></button>
                         <button onClick={() => handleEditCustomer(customer)} className="p-2 text-green-600 hover:text-green-800" title="تعديل"><EditIcon /></button>
                         <button onClick={() => handleDeleteCustomer(customer.id)} className="p-2 text-red-600 hover:text-red-800" title="حذف"><DeleteIcon /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && (
            <p className="text-center text-gray-500 py-8">لا يوجد زبائن يطابقون معايير البحث.</p>
        )}
      </div>

      {isCustomerModalOpen && (
        <CustomerForm
          customer={selectedCustomer}
          onClose={() => setIsCustomerModalOpen(false)}
          onSave={selectedCustomer ? onUpdateCustomer : onAddCustomer}
        />
      )}

      {isDeviceModalOpen && selectedCustomer && (
        <DeviceListModal
            customer={selectedCustomer}
            devices={devices.filter(d => d.customerId === selectedCustomer.id)}
            onClose={() => setIsDeviceModalOpen(false)}
            onAddDevice={onAddDevice}
            onUpdateDevice={onUpdateDevice}
            onDeleteDevice={onDeleteDevice}
        />
      )}
    </div>
  );
};

export default Customers;
