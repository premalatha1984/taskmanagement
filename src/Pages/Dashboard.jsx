import React, { useContext, useEffect, useState } from "react";
import AccountData from "../components/AccountSection/AccountData";
import Footer from "../components/Footer";
import Menu from "../components/Menu/Menu";
import TasksSection from "../components/TasksSection/TasksSection";
import ModalCreateTask from "../components/Utilities/ModalTask";
import { ModalContext } from "../Context/Modal/ModalContext";
import { TasksContext } from "../Context/Tasks/TasksContext";
import { Client, ID, Databases, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66b2fdf6002701068fd1'); // Your project ID

// Initialize the Databases instance
const databases = new Databases(client);
const account = new Account(client);

const Dashboard = () => {
  const { state: modalState, dispatch: modalDispatch } = useContext(ModalContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const user = await account.get();
        setUserID(user.$id);
      } catch (error) {
        console.error("Failed to fetch user ID", error);
      }
    };

    fetchUserID();
  }, []);

  const closeModalCreateTask = () => {
    modalDispatch({ type: "CLOSE_MODAL_CREATE_TASK" });
  };

  const createNewTaskHandler = async (task) => {
    if (!userID) {
      alert("User ID not available");
      return;
    }

    console.log("lklklklkl", task);
    tasksDispatch({ type: "ADD_NEW_TASK", payload: task });

    try {
      await databases.createDocument(
        '0123456789',           // Database ID
        '66b3022a002781997f95',   // Collection ID
        ID.unique(),                           // Unique ID for the document
        {
          title: task.title,
          // dir: task.dir,
          description: task.description,
          date: task.date,          // Ensure date is a top-level attribute
          completed: task.completed,
          // important: task.important,
          // id: task.id,
          userID: userID,           // Use the fetched user ID
        }
      );
      alert("Task created 🎉");
    } catch (error) {
      console.error("DB ERROR >>", error);
      alert("Encountered an error ❌");
    }
  };

  return (
    <div className="bg-[#c4d1e1] min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-lg sm:text-base text-base">
      {modalState.modalCreateTaskOpen && (
        <ModalCreateTask
          onClose={closeModalCreateTask}
          nameForm="Add a task"
          onConfirm={createNewTaskHandler}
        />
      )}
      <Menu />
      <TasksSection />
      <Footer />
      <AccountData />
    </div>
  );
};

export default Dashboard;
