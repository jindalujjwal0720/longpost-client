import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./../config/firebase";
import Loading from "../components/Loading";
import Error from "../components/Error";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const resetPassword = (email) => {
    setLoading(true);
    const data = {
      email,
    };
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    error,
    signup,
    login,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {error && <Error message={error} />}
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
