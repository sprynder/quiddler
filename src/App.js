import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { db, app, auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { UserContext, SettingsContext } from "./context";

function App() {
  const [reg, setReg] = useState(0);
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setAuthUser({ ...user });
      } else {
        // User is signed out.
        const d = new Date();
        // Timer to deal with double listener issue
        if (d.getTime() - reg >= 300) {
          setReg(d.getTime());
          setAuthUser(null);
          signInAnonymously(auth).catch((error) => {
            alert("Unable to connect to the server. Please try again later.");
          });
        }
        // User is signed out.
      }
    });
  }, []);

  useEffect(() => {
    if (!authUser) {
      // No valid user yet
      setUser(null);
      return;
    }
    const userRef = doc(db, "users", authUser.uid);
    const fetchData = async () => {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUser({
          ...docSnap.data(),
          id: authUser.uid,
          authUser,
          setAuthUser,
        });
        console.log("Found user!");
        console.log(authUser.uid);
      } else {
        await setDoc(doc(db, "users", authUser.uid), {
          color: "TempColor",
          name: "TempName",
        });
        console.log("No such document!");
        console.log(authUser.uid);
      }
    };
    const unsubscribe = onSnapshot(userRef, fetchData);
    return () => {
      unsubscribe();
    };
  }, [authUser]);

  return (
    <BrowserRouter>
      <div className="App">
      <UserContext.Provider value={user}>
        {//insert routes here
        }
      </UserContext.Provider>
        {/* <Routes>
            <Route
              path='/login'
              element={
                <Form
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction()}
                />}
            />
            <Route
              path='/register'
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction()}
                />}
            />
          </Routes> */}
      </div>
    </BrowserRouter>
  );
}
export default App;
