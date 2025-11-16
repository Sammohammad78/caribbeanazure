/**
 * User and authentication types
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: 'nl' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
}
