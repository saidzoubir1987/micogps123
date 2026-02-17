
export enum SubscriptionStatus {
  Active = 'نشط',
  Expired = 'منتهي',
}

export enum DeviceStatus {
  New = 'جديد',
  Active = 'مفعل',
  Expired = 'منتهي',
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  address?: string;
  joinDate: string; // ISO string format
  status: SubscriptionStatus;
}

export interface Device {
  id: string;
  customerId: string;
  deviceId: string;
  deviceName: string;
  startDate: string; // ISO string format
  endDate: string; // ISO string format
  status: DeviceStatus;
}

export interface DeviceWithCustomer extends Device {
  customerName: string;
}

export type View = 'dashboard' | 'customers' | 'new-customers';
