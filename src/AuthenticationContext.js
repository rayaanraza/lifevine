import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setInitializing(false);
    });
    return unsub;
  }, []);

  //Create account & profile
  const register = async (email, password, extra = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    if (extra.displayName) {
      await updateProfile(cred.user, { displayName: extra.displayName });
    }

    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      displayName: extra.displayName || null,
      createdAt: serverTimestamp(),
    });

    return cred.user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const value = { user, initializing, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
