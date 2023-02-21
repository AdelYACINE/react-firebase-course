import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRef, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const emailRef = useRef("");
  const passWordRef = useRef("");

  console.log(auth?.currentUser?.uid);

  const signIn = async () => {
    try {
      emailRef.current.value = "";
      passWordRef.current.value = "";
      return await createUserWithEmailAndPassword(auth, email, passWord);
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      emailRef.current.value = "";
      passWordRef.current.value = "";
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = async () => {
    try {
      emailRef.current.value = "";
      passWordRef.current.value = "";
      return await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-auth">
        <div className="cont">
          <div className="inputcontainer">
            <label className="form-label mt-4 label" htmlFor="Email">
              Email
            </label>
            <input
              ref={emailRef}
              onChange={() => {
                setEmail(emailRef.current.value);
              }}
              className="form-control input"
              id="Email"
              type="text"
              placeholder="Email..."
            />
          </div>
          <div className="inputcontainer">
            <label className="form-label mt-4 label" htmlFor="Password">
              Password
            </label>
            <input
              ref={passWordRef}
              onChange={() => {
                setPassWord(passWordRef.current.value);
              }}
              className="form-control input"
              id="Password"
              type="password"
              placeholder="Password..."
            />
          </div>
          <div className="btn-container">
            <button onClick={signIn} type="button" className="btn btn-primary">
              Sign In
            </button>
            <button
              onClick={signInWithGoogle}
              type="button"
              className="btn btn-outline-dark"
            >
              Sign In With Google
            </button>
            <button
              onClick={logOut}
              type="button"
              className="btn btn-secondary"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
