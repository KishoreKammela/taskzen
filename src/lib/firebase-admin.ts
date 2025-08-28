import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Define a global symbol to store the Firebase Admin app instance
const ADMIN_APP_KEY = Symbol.for('firebase-admin-app');

// Define a type for our custom global object
interface CustomGlobal extends NodeJS.Global {
  [ADMIN_APP_KEY]?: admin.app.App;
}
const customGlobal = global as CustomGlobal;

function getAdminApp(): admin.app.App {
  if (customGlobal[ADMIN_APP_KEY]) {
    return customGlobal[ADMIN_APP_KEY]!;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin SDK credentials. Please check your .env.local file.'
    );
  }

  try {
    const newApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      databaseURL: `https://${projectId}.firebaseio.com`,
    });
    customGlobal[ADMIN_APP_KEY] = newApp;
    console.log('Firebase Admin SDK initialized successfully.');
    return newApp;
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
        console.error("Firebase Admin SDK initialization failed: Invalid credentials. Check your .env.local file values.");
    } else {
        console.error('Firebase Admin SDK initialization failed:', error);
    }
    throw new Error('Firebase Admin SDK failed to initialize.');
  }
}

const adminApp = getAdminApp();
const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);

export { adminDb, adminAuth };
