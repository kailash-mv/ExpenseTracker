import React, { useState, forwardRef } from "react";
import InputOption from "./InputOption";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectBudget, removeExpense } from "./features/budgetSlice";

const API_URL = "http://localhost:3001/api";
const categories = ["Food", "Dress", "Medicine", "Miscellaneous"];

const Post = forwardRef(({ amount, documentId, name }, ref) => {
  const dispatch = useDispatch();
  const budgetState = useSelector(selectBudget);
  const [editableName, setEditableName] = useState(name);

  async function deleteAction() {
    try {
      const updatedTotalSpent = budgetState.totalSpent - amount;
      const updatedSafeToSpend = (
        (budgetState.totalBudget - updatedTotalSpent) /
        30
      ).toFixed(2);

      dispatch(removeExpense({ amount }));

      await axios.post(`${API_URL}/data/${documentId}`, {
        amount,
        name: editableName,
      });
      await axios.delete(`${API_URL}/expenses/${documentId}`);

      await axios.post(`${API_URL}/budget`, {
        totalSpent: updatedTotalSpent,
        totalBudget: budgetState.totalBudget,
        safeToSpend: updatedSafeToSpend,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateNameAction(newName, prevName) {
    try {
      await axios.put(`${API_URL}/expenses/${documentId}`, {
        name: newName,
      });
      console.log(prevName, newName);
      await axios.post(`${API_URL}/data/edit`, {
        amount,
        prevname: prevName,
        name: newName,
      });
      setEditableName(newName);
    } catch (error) {
      alert("Unable to change! Please try again!");
    }
  }

  const handleCategoryChange = (e) => {
    const newName = e.target.value;
    const prevName = editableName;
    if (newName !== prevName) {
      updateNameAction(newName, prevName);
      setEditableName(newName);
    }
  };

  return (
    <div
      ref={ref}
      className="p-2 mb-1 rounded-lg shadow-sm border-[gray] 
      border-[1px] grid grid-cols-4 items-center mx-[22px] justify-evenly"
    >
      <select
        value={editableName}
        onChange={handleCategoryChange}
        className="bg-transparent border-b-2 border-[#4DB8FF] outline-none text-sm"
      >
        {categories.map((category) => (
          <option key={category} value={category} className="text-black">
            {category}
          </option>
        ))}
      </select>

      <div className="text-base font-bold justify-center pl-[70px]">
        ₹{amount}
      </div>

      <InputOption
        Icon={DeleteRoundedIcon}
        title="Delete"
        color="#FF6B6B"
        onClick={deleteAction}
      />
    </div>
  );
});

export default Post;
