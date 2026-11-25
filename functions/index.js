/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();
// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
  origin: true,
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  cors(request, response, () => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
  });
});

// Legacy admin-claim grants are disabled until owner-only access management
// is deployed. Keep the callable name so old clients fail closed.
exports.addAdminRole = onCall(() => {
  throw new HttpsError(
    "permission-denied",
    "Legacy admin grants are disabled.",
  );
});
