import React from "react";
import { ReactComponent as Calendar } from "../../../assets/date.svg";
import { useMemo } from 'react';

// Custom hook to format the date
const useDate = (dateString) => {
  return useMemo(() => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [dateString]);
};

const InfosTask = ({ task, isListInView1 }) => {
  const dateFormatted = useDate(task.date);

  return (
    <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
      <div
        className={`flex items-center justify-between ${
          isListInView1 ? "mb-1" : "mb-2"
        }`}
      >
        <span className="block font-medium dark:text-slate-200">
          {task.title}
        </span>
      </div>
      <p
        title={task.description}
        className={`description mb-2 text-slate-500 dark:text-slate-500 ${
          isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
        }`}
      >
        {task.description}
      </p>
      <time className="mt-auto flex w-full">
        <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormatted}
      </time>
    </div>
  );
};

export default InfosTask;
