
import React from 'react';

export const DashboardIcon = () => <i className="fa-solid fa-tachometer-alt"></i>;
export const UsersIcon = () => <i className="fa-solid fa-users"></i>;
export const NewUserIcon = () => <i className="fa-solid fa-user-plus"></i>;
export const DeviceIcon = () => <i className="fa-solid fa-satellite-dish"></i>;
export const CalendarIcon = () => <i className="fa-solid fa-calendar-alt"></i>;
export const ExclamationIcon = () => <i className="fa-solid fa-exclamation-triangle text-yellow-500"></i>;
export const PlusIcon = () => <i className="fa-solid fa-plus"></i>;
export const EditIcon = () => <i className="fa-solid fa-pencil-alt"></i>;
export const DeleteIcon = () => <i className="fa-solid fa-trash-alt"></i>;
export const SearchIcon = () => <i className="fa-solid fa-search"></i>;
export const CloseIcon = () => <i className="fa-solid fa-times"></i>;

export const LoadingIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
