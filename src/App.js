import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Login from "./Login";
import { getAuth } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // If the user is logged in, dispatch login with user data
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        // If no user is logged in, dispatch logout with empty data
        dispatch(
          logout({
            email: "",
            uid: "",
            displayName: "",
            photoUrl: "",
          })
        );
      }
    });

    // Cleanup the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="bg-[#f3f2ef] flex flex-col ">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="flex mt-[35px] max-w-[1200px] mx-[20px]">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
