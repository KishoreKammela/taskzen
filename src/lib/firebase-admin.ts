import { initializeApp, getApps, getApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminDb: ReturnType<typeof getFirestore>;
let adminAuth: ReturnType<typeof getAuth>;

function initializeFirebaseAdmin() {
	try {
		// Check if app is already initialized
		if (getApps().length > 0) {
			console.log('Firebase Admin app already exists, using existing app.');
			const existingApp = getApp();
			adminDb = getFirestore(existingApp);
			adminAuth = getAuth(existingApp);
			return;
		}

		console.log('Initializing Firebase Admin SDK...');

		// Use individual environment variables (more reliable than JSON parsing)
		const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
		const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
		const privateKey = process.env.FIREBASE_PRIVATE_KEY;

		if (projectId && clientEmail && privateKey) {
			console.log('Using individual environment variables for Firebase Admin.');
			const cleanPrivateKey = privateKey.replace(/\\n/g, '\n');

			const credential = cert({
				projectId,
				clientEmail,
				privateKey: cleanPrivateKey,
			});

			initializeApp({
				credential,
				projectId,
			});
			console.log('Firebase Admin initialized with individual environment variables.');
		} else {
			// Fallback to application default credentials (useful in some cloud environments)
			console.log('Falling back to application default credentials for Firebase Admin.');
			initializeApp({
				projectId: projectId, // Use project ID if available
			});
			console.log('Firebase Admin initialized with application default credentials.');
		}

		// Initialize services after successful app initialization
		adminDb = getFirestore();
		adminAuth = getAuth();
		console.log('Firebase Admin services initialized successfully.');
	} catch (error: any) {
		console.error('Firebase Admin initialization failed:', error);
		
		// Attempt to get services from existing app as a last resort
		try {
			if (getApps().length > 0) {
				console.warn('Attempting to get services from existing app as a fallback...');
				const existingApp = getApp();
				adminDb = getFirestore(existingApp);
				adminAuth = getAuth(existingApp);
				console.log('Successfully got services from existing app on fallback.');
				return;
			}
		} catch (fallbackError) {
			console.error('Failed to get services from existing app during fallback:', fallbackError);
		}

		throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
	}
}

// Initialize immediately
initializeFirebaseAdmin();

export { adminDb, adminAuth };
