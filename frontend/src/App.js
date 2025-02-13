import { React, useEffect } from "react";
import Header from "./Header";
import Feed from "./Feed";
import Widgets from "./Widgets";

function App() {
  return (
    <div className="bg-white min-h-screen w-screen h-screen ">
      <Header />
      <div className="flex-grow flex mt-16 px-20">
        <div className="w-full">
          <Feed className="" />
        </div>
      </div>
    </div>
  );
}

export default App;

// const user = useSelector(selectUser);
// const dispatch = useDispatch();
// const auth = getAuth();

// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged((userAuth) => {
//     if (userAuth) {
//       dispatch(
//         login({
//           email: userAuth.email,
//           uid: userAuth.uid,
//           displayName: userAuth.displayName,
//           photoUrl: userAuth.photoURL,
//           amt: userAuth.amt,
//         })
//       );
//     } else {
//       dispatch(
//         logout({
//           email: "",
//           uid: "",
//           displayName: "",
//           amt: userAuth.amt,
//           photoUrl: "",
//         })
//       );
//     }
//   });
//   return () => {
//     unsubscribe();
//   };
// }, [dispatch]);
