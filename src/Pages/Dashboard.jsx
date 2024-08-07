import React, { useContext } from "react";
import AccountData from "../components/AccountSection/AccountData";
import Footer from "../components/Footer";
import Menu from "../components/Menu/Menu";
import TasksSection from "../components/TasksSection/TasksSection";
import ModalCreateTask from "../components/Utilities/ModalTask";
import { ModalContext } from "../Context/Modal/ModalContext";
import { TasksContext } from "../Context/Tasks/TasksContext";
import { Client, ID, Databases } from 'appwrite';

// Log environment variables to verify
console.log("Endpoint:", process.env.REACT_APP_ENDPOINT);
console.log("Project ID:", process.env.VITE_PROJECT_ID);
console.log("Database ID:", process.env.VITE_DB_ID);
console.log("Collection ID:", process.env.VITE_COLLECTION_ID);

// Check if the environment variables are defined
if (!process.env.REACT_APP_ENDPOINT || !process.env.VITE_PROJECT_ID || !process.env.VITE_DB_ID || !process.env.VITE_COLLECTION_ID) {
    console.error("One or more environment variables are missing.");
}

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint(process.env.REACT_APP_ENDPOINT) // Your API Endpoint
    .setProject(process.env.VITE_PROJECT_ID); // Your project ID

// Initialize the Databases instance
const databases = new Databases(client);

const Dashboard = () => {
  const { state: modalState, dispatch: modalDispatch } =
    useContext(ModalContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);

  const closeModalCreateTask = () => {
    modalDispatch({ type: "CLOSE_MODAL_CREATE_TASK" });
  };

  const createNewTaskHandler = async (task) => {
    console.log("lklklklkl", task);
    tasksDispatch({ type: "ADD_NEW_TASK", payload: task });

    try {
        console.log("innnnnn");
        await databases.createDocument(
            process.env.VITE_DB_ID,           // Database ID
            process.env.VITE_COLLECTION_ID,   // Collection ID
            ID.unique(),                           // Unique ID for the document
            {
                title: task,
                completed: false,
                // userID, // Uncomment and use if you have a userID
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
