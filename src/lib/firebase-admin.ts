import { initializeApp, getApps, getApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminDb: ReturnType<typeof getFirestore>;
let adminAuth: ReturnType<typeof getAuth>;

function initializeFirebaseAdmin() {
	try {
		// Check if app is already initialized
		if (getApps().length > 0) {
			console.log('Firebase Admin app already exists, using existing app');
			adminDb = getFirestore();
			adminAuth = getAuth();
			return;
		}

		console.log('Initializing Firebase Admin SDK...');

		// Use individual environment variables (more reliable than JSON parsing)
		const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
		const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
		const privateKey = process.env.FIREBASE_PRIVATE_KEY;

		console.log('Environment variables check:');
		console.log('- FIREBASE_PROJECT_ID:', projectId ? 'Set' : 'Not set');
		console.log('- FIREBASE_CLIENT_EMAIL:', clientEmail ? 'Set' : 'Not set');
		console.log('- FIREBASE_PRIVATE_KEY:', privateKey ? 'Set' : 'Not set');

		if (projectId && clientEmail && privateKey) {
			console.log('Using individual environment variables');
			const cleanPrivateKey = privateKey.replace(/\\n/g, '\n');

			// Create the credential first
			const credential = cert({
				projectId,
				clientEmail,
				privateKey: cleanPrivateKey,
			});

			// Initialize the app with the credential
			initializeApp({
				credential,
				projectId,
			});
			console.log('Firebase Admin initialized with individual environment variables');
		} else {
			// Fallback to application default credentials
			console.log('Falling back to application default credentials');
			initializeApp({
				projectId: projectId || 'taskzen-5gpu6',
			});
			console.log('Firebase Admin initialized with application default credentials');
		}

		// Initialize services after successful app initialization
		adminDb = getFirestore();
		adminAuth = getAuth();
		console.log('Firebase Admin services initialized successfully');
	} catch (error: any) {
		console.error('Firebase Admin initialization failed:', error);
		console.error('Error details:', {
			message: error.message,
			stack: error.stack,
			code: error.code,
		});

		// Try to get services from existing app as last resort
		try {
			if (getApps().length > 0) {
				console.log('Attempting to get services from existing app...');
				adminDb = getFirestore();
				adminAuth = getAuth();
				console.log('Successfully got services from existing app');
				return;
			}
		} catch (fallbackError) {
			console.error('Failed to get services from existing app:', fallbackError);
		}

		throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
	}
}

// Initialize immediately
initializeFirebaseAdmin();

export { adminDb, adminAuth };
