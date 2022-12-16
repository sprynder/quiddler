import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// type TransactionResult = {
//     committed: boolean;
//     //swap this out with firestore equivalent
//     //snapshot: functions.database.DataSnapshot;
//   };

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// Create game uses generated gameID, creates database entry for the game,
export const createGame = functions.https.onCall(async (data, context) => {
  const gameId = data.gameId;
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }
  // let uid = context.auth.uid;
  let stat = "yuh";
  const db = admin.firestore();
  const newGame = {
    id: gameId,
    players: 0,
  };
  db.collection("games")
    .doc(gameId)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        stat = "fail";
      } else {
        await db.collection("games").doc(gameId).set(newGame);
        stat = "success";
      }
    })
    .catch((reason) => {
      console.log(reason);
      stat = "fail";
    });
  return {status: stat}
});
