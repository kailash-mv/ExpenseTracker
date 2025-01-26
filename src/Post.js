import React, { useState } from "react";
import { forwardRef } from "react";
import InputOption from "./InputOption";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { removeExpense } from "./features/budgetSlice";

const Post = forwardRef(({ amount, documentId, name }, ref) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);

  async function deleteAction() {
    try {
      const docRef = doc(db, "posts", documentId);
      const docSnap = await getDoc(docRef);
      const amount = parseFloat(docSnap.data().amount) || 0;
      dispatch(removeExpense({ amount }));
      await deleteDoc(doc(db, "posts", documentId));
    } catch (error) {
      console.error(error);
      alert("Unable to delete! Please retry.");
    }
  }

  async function updateNameAction(documentId) {
    try {
      const docRef = doc(db, "posts", documentId);
      await updateDoc(docRef, {
        name: editableName,
      });
    } catch (error) {
      alert("Unable to change! Please try again!");
    }
  }

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
  };

  const handleBlur = () => {
    updateNameAction(documentId);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateNameAction(documentId);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      ref={ref}
      className="bg-[#2E2E3A] text-white p-2 mb-1 rounded-lg shadow-sm border-[#555666] 
      border-2 grid grid-cols-4 items-center mx-[22px]"
    >
      {isEditing ? (
        <input
          type="text"
          value={editableName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-b-2 border-[#4DB8FF] text-white outline-none text-sm"
          autoFocus
        />
      ) : (
        <h1 className="text-sm pl-4">{editableName}</h1>
      )}

      <div className="text-base font-bold justify-center pl-[70px]">
        ₹{amount}
      </div>

      <InputOption
        Icon={DeleteRoundedIcon}
        title="Delete"
        color="#FF6B6B"
        onClick={() => deleteAction()}
      />
      <InputOption
        Icon={EditRoundedIcon}
        title="Edit"
        color="#4DB8FF"
        onClick={handleEditClick}
        className="justify-end"
      />
    </div>
  );
});

export default Post;
