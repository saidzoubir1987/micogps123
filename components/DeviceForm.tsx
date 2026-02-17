
import React, { useState, useEffect } from 'react';
import { Device } from '../types';
import { CloseIcon } from './Icons';

interface DeviceFormProps {
  device: Device | null;
  customerId: string;
  onClose: () => void;
  onSave: (device: any) => Promise<void>;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ device, customerId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceName: '',
    startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (device) {
      setFormData({
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        startDate: new Date(device.startDate).toISOString().split('T')[0],
      });
    }
  }, [device]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.deviceId || !formData.deviceName) {
      alert('رقم الجهاز واسم الجهاز حقول إلزامية.');
      return;
    }
    setIsSubmitting(true);
    const dataToSave = device ? { ...device, ...formData } : { ...formData, customerId };
    await onSave(dataToSave);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60]">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg m-4" dir="rtl">
        <div className="flex justify-between items-center mb-6 pb-3 border-b">
          <h3 className="text-2xl font-bold text-gray-800">{device ? 'تعديل بيانات الجهاز' : 'إضافة جهاز جديد'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز</label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              value={formData.deviceName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700 mb-1">رقم الجهاز (Device ID)</label>
            <input
              type="text"
              id="deviceId"
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">تاريخ بداية الاشتراك</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
             <p className="text-xs text-gray-500 mt-1">تاريخ الانتهاء سيتم حسابه تلقائياً بعد سنة.</p>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              إلغاء
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceForm;
