import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [exercise, setExercise] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    id: "",
    title: "",
    load: "",
    reps: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/new/")
      .then((res) => {
        setExercise(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/new/${id}`)
      .then(() => {
        setExercise(exercise.filter((exe) => exe.id !== id));
        toast.error("Exercise deleted successfully!", {
          className: "toast-error",
        });
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatCreatedAt = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const editExercise = (exe) => {
    setIsModalOpen(true);
    setCurrentExercise({
      id: exe._id,
      title: exe.title,
      load: exe.load,
      reps: exe.reps,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise((prev) => ({ ...prev, [name]: value }));
  };

  const saveExercise = () => {
    axios
      .put(`http://localhost:5000/new/${currentExercise.id}`, currentExercise)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.data) {
          setExercise(
            exercise.map((exe) =>
              exe._id === currentExercise.id ? res.data.data : exe
            )
          );
        } else {
          console.log("Unexpected response structure:", res.data);
        }
        setIsModalOpen(false);
        setCurrentExercise({ id: "", title: "", load: "", reps: "" });
      })
      .catch((error) => {
        console.log("Error saving exercise:", error);
      });
  };

  return (
    <div className="">
      <div className="w-[1000px] p-2 space-y-5">
        {exercise.map((exe, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 flex justify-between items-center "
          >
            <div>
              <h1 className="text-green-600 text-xl font-bold">{exe.title}</h1>
              <h3>
                <span className="font-bold">Load(kg):</span>
                {exe.load}
              </h3>
              <h3>
                <span className="font-bold">Reps:</span>
                {exe.reps}
              </h3>
              <p className="text-gray-500">{formatCreatedAt(exe.createdAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => editExercise(exe)}>
                <CiEdit className="text-2xl" />
              </button>
              <button onClick={() => deleteExercise(exe._id)}>
                <RiDeleteBin5Line className="text-xl" />
              </button>
            </div>
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          currentExercise={currentExercise}
          onChange={handleEditChange}
          onSave={saveExercise}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default List;
