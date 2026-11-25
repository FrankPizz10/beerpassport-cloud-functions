# Firebase Functions deployment

Pull requests run the functions lint check on Node 22. A push to master or
manual dispatch deploys only `addAdminRole` after checks pass when the
repository variable `FIREBASE_AUTO_DEPLOY_ENABLED` is exactly `true`.
Leave it unset until setup and a deliberate first release are approved.

Authentication uses GitHub OIDC and Google Workload Identity Federation;
no service-account key is stored in GitHub. Configure repository variables
`GCP_WORKLOAD_IDENTITY_PROVIDER` and `GCP_FIREBASE_DEPLOY_SERVICE_ACCOUNT`.
Restrict the provider's trust to this repository and the master branch,
and grant the deploy identity only the permissions needed for the existing
function, build resources, and its runtime service account. Validate actual
permissions and the first deploy before enabling automatic deployment.
The workflow does not deploy Firestore rules, indexes, or helloWorld.

The target is project `beerpassport-b31d8`. Node 22 is explicitly supported
by the Firebase Functions guide. The legacy grant remains active until this
change is deployed; merging while auto-deploy is disabled does not close it.
