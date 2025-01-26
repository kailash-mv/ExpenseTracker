import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Post from "./Post";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  selectBudget,
  updateBudgetData,
  addExpense,
} from "./features/budgetSlice";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";

function Feed() {
  const dispatch = useDispatch();
  const budgetState = useSelector(selectBudget);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
    return () => unsubscribe();
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    const amount = parseFloat(input) || 0;

    await addDoc(collection(db, "posts"), {
      amount,
      timestamp: serverTimestamp(),
      name: "Miscellaneous",
    });
    dispatch(addExpense({ amount }));
    setInput("");
  };

  useEffect(() => {
    const fetchBudgetData = async () => {
      const budRef = doc(db, "budget", "budgetdoc");
      const budSnap = await getDoc(budRef);

      if (budSnap.exists()) {
        const data = budSnap.data();
        dispatch(
          updateBudgetData({
            totalBudget: data.Budget,
            totalSpent: data.totalSpent,
            safeToSpend: data.safeToSpend,
          })
        );
      }
    };

    fetchBudgetData();
  }, [dispatch]);

  useEffect(() => {
    if (budgetState.totalSpent === 0) return;

    const updateBudget = async () => {
      const budRef = doc(db, "budget", "budgetdoc");
      const totalSpent = budgetState.totalSpent;
      const Budget = budgetState.totalBudget;
      const safeToSpend = Number(budgetState.safeToSpend);
      await updateDoc(budRef, {
        totalSpent,
        Budget,
        safeToSpend,
      });
    };

    updateBudget();
  }, [budgetState]);

  return (
    <div className="flex-[0.9] mx-[20px]">
      <div className="bg-[#3A3A4D] p-[20px] rounded-[10px] mb-[20px]">
        <div className="bg-[#2E2E3A] flex-col p-[10px] text-white pl-[15px] rounded-[30px] mb-10 pb-12 pt-12 border-[#555666] border-2">
          <h2 className="text-2xl font-bold">
            <span className="text-[#4DB8FF]">Total Spent: </span>₹
            {budgetState.totalSpent}
          </h2>
          <h2 className="text-2xl font-bold">
            <span className="text-[#4DB8FF]"> Budget: </span> {" ₹"}
            {budgetState.totalBudget}
          </h2>
          <h2 className="text-2xl font-bold">
            <span className="text-[#4DB8FF]">Safe to Spend:</span> ₹
            {budgetState.safeToSpend} per day
          </h2>
        </div>
        <div className="border-[1px] border-solid border-[#555666] flex p-[10px] text-[#A0A0A0] pl-[15px] rounded-[30px]">
          <CreateIcon className="text-[#4DB8FF]" />
          <form className="flex w-[100%] bg-[#2E2E3A] text-black rounded-[30px] ml-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                const value = e.target.value;
                setInput(value === "" ? "" : parseFloat(value) || "");
              }}
              className="text-white flex-1 ml-[10px] outline-0 font-semibold bg-[#2E2E3A] rounded-[30px]"
            />
            <button onClick={sendPost} type="submit" className="hidden">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ id, data: { amount, name } }) => (
          <Post key={id} amount={amount} documentId={id} name={name} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
