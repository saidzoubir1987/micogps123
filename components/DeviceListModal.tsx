
import React, { useState } from 'react';
import { Customer, Device, DeviceStatus } from '../types';
import { CloseIcon, PlusIcon, EditIcon, DeleteIcon } from './Icons';
import DeviceForm from './DeviceForm';

interface DeviceListModalProps {
    customer: Customer;
    devices: Device[];
    onClose: () => void;
    onAddDevice: (device: Omit<Device, 'id' | 'status' | 'endDate'>) => Promise<void>;
    onUpdateDevice: (device: Device) => Promise<void>;
    onDeleteDevice: (deviceId: string) => Promise<void>;
}

const DeviceListModal: React.FC<DeviceListModalProps> = ({ customer, devices, onClose, onAddDevice, onUpdateDevice, onDeleteDevice }) => {
    const [isDeviceFormOpen, setIsDeviceFormOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    const handleAddDevice = () => {
        setSelectedDevice(null);
        setIsDeviceFormOpen(true);
    };

    const handleEditDevice = (device: Device) => {
        setSelectedDevice(device);
        setIsDeviceFormOpen(true);
    };

    const handleDeleteDevice = (deviceId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الجهاز؟')) {
            onDeleteDevice(deviceId);
        }
    };

    const getStatusBadge = (status: DeviceStatus) => {
        switch (status) {
            case DeviceStatus.Active:
                return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">مفعل</span>;
            case DeviceStatus.Expired:
                return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">منتهي</span>;
            case DeviceStatus.New:
                 return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">جديد</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">غير معروف</span>;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-3xl m-4" dir="rtl">
                <div className="flex justify-between items-center mb-6 pb-3 border-b">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">أجهزة الزبون</h3>
                        <p className="text-gray-600">{customer.fullName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><CloseIcon /></button>
                </div>

                <div className="flex justify-end mb-4">
                     <button onClick={handleAddDevice} className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow">
                        <PlusIcon />
                        إضافة جهاز جديد
                    </button>
                </div>

                <div className="overflow-y-auto max-h-96">
                    {devices.length > 0 ? (
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-3 font-semibold text-sm text-gray-600">اسم الجهاز</th>
                                    <th className="p-3 font-semibold text-sm text-gray-600">رقم الجهاز</th>
                                    <th className="p-3 font-semibold text-sm text-gray-600">تاريخ البدء</th>
                                    <th className="p-3 font-semibold text-sm text-gray-600">تاريخ الانتهاء</th>
                                    <th className="p-3 font-semibold text-sm text-gray-600">الحالة</th>
                                    <th className="p-3 font-semibold text-sm text-gray-600 text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {devices.map(device => (
                                    <tr key={device.id} className="hover:bg-gray-50">
                                        <td className="p-3">{device.deviceName}</td>
                                        <td className="p-3 font-mono">{device.deviceId}</td>
                                        <td className="p-3">{new Date(device.startDate).toLocaleDateString('ar-EG')}</td>
                                        <td className="p-3">{new Date(device.endDate).toLocaleDateString('ar-EG')}</td>
                                        <td className="p-3">{getStatusBadge(device.status)}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => handleEditDevice(device)} className="p-2 text-green-600 hover:text-green-800" title="تعديل"><EditIcon /></button>
                                                <button onClick={() => handleDeleteDevice(device.id)} className="p-2 text-red-600 hover:text-red-800" title="حذف"><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-8">لا توجد أجهزة مسجلة لهذا الزبون.</p>
                    )}
                </div>

                 <div className="flex justify-end pt-6 mt-6 border-t">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                      إغلاق
                    </button>
                </div>

                 {isDeviceFormOpen && (
                    <DeviceForm
                        device={selectedDevice}
                        customerId={customer.id}
                        onClose={() => setIsDeviceFormOpen(false)}
                        onSave={selectedDevice ? onUpdateDevice : onAddDevice}
                    />
                )}
            </div>
        </div>
    );
};

export default DeviceListModal;
