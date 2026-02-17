
import React from 'react';
import StatCard from './StatCard';
import { UsersIcon, NewUserIcon, DeviceIcon, ExclamationIcon } from './Icons';
import { DeviceWithCustomer } from '../types';

interface DashboardProps {
  stats: {
    totalCustomers: number;
    newCustomers: number;
    totalDevices: number;
    expiringSoon: number;
  };
  expiringDevices: DeviceWithCustomer[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, expiringDevices }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">لوحة التحكم الرئيسية</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الزبائن" value={stats.totalCustomers} icon={<UsersIcon />} color="blue" />
        <StatCard title="الزبائن الجدد (آخر 30 يوم)" value={stats.newCustomers} icon={<NewUserIcon />} color="green" />
        <StatCard title="إجمالي الأجهزة" value={stats.totalDevices} icon={<DeviceIcon />} color="purple" />
        <StatCard title="اشتراكات قريبة من الانتهاء" value={stats.expiringSoon} icon={<ExclamationIcon />} color="yellow" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">
          <ExclamationIcon />
          <span className="mr-2">أجهزة قريبة من انتهاء الاشتراك (30 يوم القادمة)</span>
        </h3>
        {expiringDevices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold text-sm text-gray-600">اسم الزبون</th>
                  <th className="p-3 font-semibold text-sm text-gray-600">اسم الجهاز</th>
                  <th className="p-3 font-semibold text-sm text-gray-600">رقم الجهاز</th>
                  <th className="p-3 font-semibold text-sm text-gray-600">تاريخ الانتهاء</th>
                  <th className="p-3 font-semibold text-sm text-gray-600">الأيام المتبقية</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {expiringDevices.map(device => {
                    const endDate = new Date(device.endDate);
                    const now = new Date();
                    const diffTime = endDate.getTime() - now.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return (
                        <tr key={device.id} className="hover:bg-gray-50">
                            <td className="p-3 text-gray-700">{device.customerName}</td>
                            <td className="p-3 text-gray-700">{device.deviceName}</td>
                            <td className="p-3 text-gray-500 font-mono">{device.deviceId}</td>
                            <td className="p-3 text-red-600 font-semibold">{endDate.toLocaleDateString('ar-EG')}</td>
                            <td className={`p-3 font-bold ${diffDays <= 7 ? 'text-red-700' : 'text-yellow-600'}`}>
                                {diffDays} يوم
                            </td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">لا توجد اشتراكات تنتهي قريباً.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
