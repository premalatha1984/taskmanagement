import React, { useState, useContext } from "react";
import ModalConfirm from "../Utilities/ModalConfirm";
import { TasksContext } from "../../Context/Tasks/TasksContext";
import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('66b2fdf6002701068fd1'); // Your project ID

const databases = new Databases(client);

const DeleteTask = ({ taskId }) => {
  const { dispatch } = useContext(TasksContext);
  const [showModal, setIsModalShown] = useState(false);

  const deleteTaskHandler = async () => {
    try {
      await databases.deleteDocument(
        '0123456789', // Database ID
        '66b3022a002781997f95', // Collection ID
        taskId // Document ID
      );
      dispatch({ type: "REMOVE_TASK", payload: taskId });
      setIsModalShown(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}
          text="This task will be deleted permanently."
          onConfirm={deleteTaskHandler}
        />
      )}
      <button
        className="mt-auto text-left pt-4 hover:text-[#154dba] dark:hover:text-slate-200 transition"
        onClick={() => setIsModalShown(true)}
      >
        Delete Task
      </button>
    </>
  );
};

export default React.memo(DeleteTask);
