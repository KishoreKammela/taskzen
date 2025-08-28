
'use server';

import { adminDb } from '@/lib/firebase-admin';
import type { User } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';

// Default organization ID for now. This could be dynamic in a real app.
const DEFAULT_ORG_ID = 'default-org';

export async function createUser(userId: string, data: { email: string; name?: string }) {
  const userRef = adminDb.collection('users').doc(userId);
  const newUser: Omit<User, 'id' | 'createdAt'> & { createdAt: FieldValue } = {
    email: data.email,
    name: data.name || data.email.split('@')[0],
    role: 'member', // Default role
    organizationId: DEFAULT_ORG_ID,
    createdAt: FieldValue.serverTimestamp(),
  };

  try {
    await userRef.set(newUser);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw new Error('Failed to create user in database.');
  }
}
