
import React from 'react';
import { View } from '../types';
import { DashboardIcon, UsersIcon, NewUserIcon } from './Icons';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <DashboardIcon /> },
    { id: 'customers', label: 'الزبائن', icon: <UsersIcon /> },
    { id: 'new-customers', label: 'زبائن جدد', icon: <NewUserIcon /> },
  ];

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">لوحة التحكم</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-200'
            }`}
          >
            <span className="me-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} - إدارة الاشتراكات</p>
      </div>
    </aside>
  );
};

export default Sidebar;
