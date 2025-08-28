'use server';

import { adminDb } from '@/lib/firebase-admin';
import type { User } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';

const DEFAULT_ORG_ID = 'default-org';

export async function createUser(userId: string, data: { email: string; name?: string }) {
  const userRef = adminDb.collection('users').doc(userId);
  
  // Ensure the user doesn't already exist to avoid overwriting
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    console.log(`User document for ${userId} already exists.`);
    return;
  }

  const newUser: Omit<User, 'id' | 'createdAt'> & { createdAt: FieldValue } = {
    email: data.email,
    name: data.name || data.email.split('@')[0],
    role: 'member', // Default role
    organizationId: DEFAULT_ORG_ID,
    createdAt: FieldValue.serverTimestamp(),
  };

  try {
    await userRef.set(newUser);
    console.log(`Successfully created Firestore user document for ${userId}`);
  } catch (error) {
    console.error(`Error creating user document for ${userId}:`, error);
    throw new Error('Failed to create user in database.');
  }
}
