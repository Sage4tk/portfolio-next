import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}-default-rtdb.firebaseio.com/`,
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const adminDb = admin.firestore();
export default admin;
