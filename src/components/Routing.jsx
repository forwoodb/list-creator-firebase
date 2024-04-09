import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import ListItems from "./pages/ListItems";

import SignUp from "./auth/SignUp";
import AuthForm from "./auth/SignIn";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import PrivateRoutes from "./PrivateRoutes";

export default function Routing() {
  const [authUserId, setAuthUserId] = useState(null);
  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUserId(user.uid);
        setAuthUserEmail(user.email);
        setIsFetching(false);
        console.log("Logged In");
      } else {
        console.log("Not logged in");
        setIsFetching(false);
      }
    });
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
    // https://www.youtube.com/watch?v=PngrpszT3aY&t=328s
  }

  // // Doesn't work
  // // useEffect(() => {
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setAuthUserId(user.uid);
  //     // setAuthUserId((logUser) => logUser + user.uid);
  //     setAuthUserEmail(user.email);
  //     // setAuthUserEmail((logUser) => logUser + user.email);
  //     console.log("Logged In");
  //   } else {
  //     console.log("Not logged in");
  //   }
  // });
  // // }, []);

  console.log(authUserId);
  return (
    <>
      {/* <p>{authUser.email}</p> */}
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PrivateRoutes user={authUserId} userEmail={authUserEmail} />
            }
          >
            <Route
              path="/"
              element={<Main user={authUserId} userEmail={authUserEmail} />}
            />
            <Route
              path="/view/:id"
              element={
                <ListItems user={authUserId} userEmail={authUserEmail} />
              }
            />
          </Route>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
