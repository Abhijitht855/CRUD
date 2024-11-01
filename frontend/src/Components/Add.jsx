import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const AddExercise = () => {
    const data = {
      title,
      load,
      reps,
    };

    axios
    .post("http://localhost:5000/new/", data)
    .then(() => {
      setTitle("");
      setLoad("");
      setReps("");
      toast.success("Exercise added successfully!");
    })
    .catch((error) => {
      console.error("Error adding exercise:", error);
      toast.error("Failed to add exercise. Please try again.");
    });
    
  };

  return (
    <div className="mx-auto mt-60">
      <h1 className="text-green-700 text-xl font-bold">Add a New Workout</h1>
      <div className="mt-2">
        <label htmlFor="" className="ml-2">
          Exercise Title:
        </label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none shadow-md px-2 py-1"
          placeholder="Title"
        />
        <br />
        <br />

        <label htmlFor="" className="ml-2">
          Load (in Kg):
        </label>
        <br />
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="outline-none shadow-md px-2 py-1"
          placeholder="Load"
        />
        <br />
        <br />

        <label htmlFor="" className="ml-2">
          Reps:
        </label>
        <br />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="outline-none shadow-md px-2 py-1"
          placeholder="Reps"
        />
        <br />

        <button
          className="bg-green-700 text-white px-1 py-2 rounded-md shadow-md ml-5 mt-3"
          onClick={AddExercise}
        >
          Add Workout
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Add;
