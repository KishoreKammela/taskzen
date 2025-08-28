
'use server';

import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import type { User } from '@/types';

const db = getFirestore(app);

// Default organization ID for now. This could be dynamic in a real app.
const DEFAULT_ORG_ID = 'default-org'; 

export async function createUser(userId: string, data: { email: string; name?: string }) {
  const userRef = doc(db, 'users', userId);
  // Use Timestamp.now() which is server-compatible
  const newUser: Omit<User, 'id' | 'createdAt'> & { createdAt: Timestamp } = {
    email: data.email,
    name: data.name || data.email.split('@')[0],
    role: 'member', // Default role
    organizationId: DEFAULT_ORG_ID,
    createdAt: Timestamp.now(),
  };

  try {
    // The type of newUser is compatible with what setDoc expects
    await setDoc(userRef, newUser);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw new Error('Failed to create user in database.');
  }
}
