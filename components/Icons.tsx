import React from 'react';

export const LoadingIcon: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

export const ErrorIcon: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center text-red-500 gap-2">
    <i className="fas fa-exclamation-circle text-2xl"></i>
    <span>{message}</span>
  </div>
);