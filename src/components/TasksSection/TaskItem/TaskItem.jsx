import React from "react";
import { Link } from "react-router-dom";
import InfosTask from "./InfosTask";
import ActionsTaskItem from "./ActionsTaskItem";

const TaskItem = ({ isListInView1, task }) => {
  return (
    <>
      <li key={task.id}>
        <Link
          to={`/dir/${task.dir}`}
          title={task.dir}
          className="ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-[#e4ecef] text-slate-500 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-[#F3F7F8] dark:hover:bg-slate-600"
        > 
          {task.dir}
        </Link>
        <article
          className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
            isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"
          }`}
        >
          <InfosTask task={task} isListInView1={isListInView1} />
          <ActionsTaskItem task={task} isListInView1={isListInView1} />
        </article>
      </li>
    </>
  );
};

export default React.memo(TaskItem);
