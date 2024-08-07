import React, { useState, useContext, useEffect } from "react";
import ModalCreateTask from "../../Utilities/ModalTask";
import { ReactComponent as OptionsSvg } from "../../../assets/options.svg";
import { TasksContext } from "../../../Context/Tasks/TasksContext";
import { Client, Databases, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66b2fdf6002701068fd1'); // Your project ID

// Initialize the Databases and Account instances
const databases = new Databases(client);
const account = new Account(client);

const BtnEditTask = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // Fetch the user ID on component mount
    const fetchUserID = async () => {
      try {
        const user = await account.get();
        setUserID(user.$id);
      } catch (error) {
        console.error("Error fetching user ID", error);
      }
    };

    fetchUserID();
  }, []);

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };
  const fetchDocument = async (id) => {
    try {
      const response = await databases.getDocument('0123456789', '66b3022a002781997f95', id);
      console.log('Document fetched:', response);
      return response;
    } catch (error) {
      console.error('Error fetching document:', error);
      return null;
    }
  };
  const editTaskHandler = async (task) => {
    if (!userID) {
      alert("User ID not available");
      return;
    }
    console.log('task:', task);
    if (!task.id) {
      alert("Task ID not provided");
      return;
    }
  
    console.log("Attempting to update task with ID:", task.$id);
  
    // Fetch the document first to confirm it exists
    const document = await fetchDocument(task.id);
    if (!document) {
      alert("Document not found");
      return;
    }
  
    try {
      const response = await databases.updateDocument(
        '0123456789',          // Database ID
        '66b3022a002781997f95',  // Collection ID
        task.id,              // Unique ID for the document to update
        {
          title: task.title,
          description: task.description,
          date: task.date,   // Ensure date is a top-level attribute
          completed: task.completed,
          userID: userID,    // Use the fetched user ID
        }
      );
      console.log("Document updated successfully:", response);
      alert("Task updated successfully 🎉");
    } catch (error) {
      console.error("DB ERROR >>", error);
      alert("Encountered an error while updating ❌");
    }
  };

  return (
    <>
      <button
        title="edit task"
        className="grid h-6 transition w-7 sm:w-8 sm:h-8 place-items-center dark:hover:text-slate-200 hover:text-slate-700"
        onClick={openModalEditTask}
      >
        <OptionsSvg className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      {modalEditTaskOpen && (
        <ModalCreateTask
          onClose={closeModalEditTask}
          task={task}
          nameForm="Edit task"
          onConfirm={editTaskHandler}
        />
      )}
    </>
  );
};

export default BtnEditTask;
