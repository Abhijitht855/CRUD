
import React from "react";

const Modal = ({ isOpen, currentExercise, onChange, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Exercise</h2>
        <input
          type="text"
          name="title"
          value={currentExercise.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="load"
          value={currentExercise.load}
          onChange={onChange}
          placeholder="Load (kg)"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="reps"
          value={currentExercise.reps}
          onChange={onChange}
          placeholder="Reps"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


