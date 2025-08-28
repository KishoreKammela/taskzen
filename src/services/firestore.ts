
'use server';

import * as admin from 'firebase-admin';
import type { User } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization ---
// This is the crucial change. We initialize the app directly in the file that uses it,
// and we ensure it only ever runs once.

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDb = admin.firestore();

// -----------------------------------------


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
