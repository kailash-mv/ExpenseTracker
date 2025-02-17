import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Post from "./Post";
import {
  selectBudget,
  updateBudgetData,
  addExpense,
} from "./features/budgetSlice";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import axios from "axios";
import Widgets from "./Widgets";

const API_URL = "http://localhost:3001/api";

function Feed() {
  const dispatch = useDispatch();
  const budgetState = useSelector(selectBudget);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const budgetResponse = await axios.get(`${API_URL}/budget`);
        dispatch(
          updateBudgetData({
            totalBudget: budgetResponse.data.totalBudget,
            totalSpent: budgetResponse.data.totalSpent,
            safeToSpend: budgetResponse.data.safeToSpend,
          })
        );
      } catch (error) {
        console.error("Unable to dispatch:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${API_URL}/expenses`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchBudget();
    fetchExpenses();
  }, [budgetState]);

  const expenseFilter = async (name) => {
    try {
      const filterResponse =
        name === "All"
          ? await axios.get(`${API_URL}/expenses`)
          : await axios.get(`${API_URL}/expenses/${name}`);
      setPosts(filterResponse.data);
    } catch (error) {
      console.error("Error filtering responses: ", error);
    }
  };

  const sendPost = async (e) => {
    e.preventDefault();
    const amount = parseFloat(input) || 0;
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    try {
      const expenseResponse = await axios.post(`${API_URL}/expenses`, {
        amount,
        name: "Miscellaneous",
      });
      dispatch(addExpense({ amount }));
      const updatedTotalSpent = budgetState.totalSpent + amount;
      const updatedSafeToSpend = (
        (budgetState.totalBudget - updatedTotalSpent) /
        30
      ).toFixed(2);

      await axios.post(`${API_URL}/budget`, {
        totalSpent: updatedTotalSpent,
        totalBudget: budgetState.totalBudget,
        safeToSpend: updatedSafeToSpend,
      });

      await axios.post(`${API_URL}/data`, { amount, name: "Miscellaneous" });
      setPosts((prevPosts) => [expenseResponse.data, ...prevPosts]);
      setInput("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col pt-16 p-6 rounded-lg shadow-md bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            <span className="text-blue-500">Total Spent:</span> ₹
            {budgetState.totalSpent}
          </h2>
          <h2 className="text-xl font-semibold text-gray-700">
            <span className="text-blue-500">Budget:</span> ₹
            {budgetState.totalBudget}
          </h2>
          <h2 className="text-xl font-semibold text-gray-700">
            <span className="text-blue-500">Safe to Spend:</span> ₹
            {budgetState.safeToSpend} per day
          </h2>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-80">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Filter Expenses
          </h2>
          <ul className="space-y-2">
            {["All", "Miscellaneous", "Medicine", "Food", "Dress"].map(
              (category) => (
                <li
                  key={category}
                  className="cursor-pointer px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-blue-100 transition-all"
                  onClick={() => expenseFilter(category)}
                >
                  {category}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="w-80 flex-shrink-0">
          <Widgets />
        </div>
      </div>

      <div className="flex items-center bg-white p-4 rounded-lg shadow-md border border-gray-300 mt-6">
        <CreateIcon className="text-blue-500" />
        <form className="flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter amount"
          />
          <button
            onClick={sendPost}
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Add
          </button>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200 min-w-fit">
        {posts.map(({ _id, amount, name }) => (
          <Post key={_id} amount={amount} documentId={_id} name={name} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
