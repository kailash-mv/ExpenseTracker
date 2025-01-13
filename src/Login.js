import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = () => {
    if (!name) {
      return alert("Please enter a full name");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        });
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoURL: profilePic,
          })
        );
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  };

  return (
    <div className="grid place-items-center mx-auto py-[100px]">
      <img
        src="
      https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
        className="object-contain h-[70px] my-[20px]"
      />
      <form className="flex flex-col ">
        <input
          className="w-[350px] h-[50px] text-[20px] pl-[10px] mb-[10px] rounded-[5px]"
          placeholder="Full name (required if registering)"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[350px] h-[50px] text-[20px] pl-[10px] mb-[10px] rounded-[5px]"
          placeholder="Porfile pic URL (optional)"
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input
          className="w-[350px] h-[50px] text-[20px] pl-[10px] mb-[10px] rounded-[5px]"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-[350px] h-[50px] text-[20px] pl-[10px] mb-[10px] rounded-[5px]"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-[350px] h-[50px] text-[large] bg-[#0074b1] text-white rounded-[5px]"
          type="submit"
          onClick={loginToApp}
        >
          Sign in
        </button>
      </form>

      <p className="mt-[20px]">
        not a member?{" "}
        <span className="text-[#0177b7] cursor-pointer" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
