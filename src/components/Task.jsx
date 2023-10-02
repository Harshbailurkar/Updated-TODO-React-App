import React from "react";
import TaskDes from "./TaskDes";

export default function Task(props) {
  const [showdes, setShowDes] = React.useState(false);
  const changeShowdes = () => {
    setShowDes((prev) => !prev);
  };
  const TodaysDate = new Date();
  const TaskDueDate = new Date(props.date);
  const DateDifference = TaskDueDate - TodaysDate;
  const daysDifference = Math.floor(DateDifference / (1000 * 60 * 60 * 24)) + 1;
  const showWarning = daysDifference < 6 ? true : false;
  return (
    <>
      {!showdes && (
        <div className="w-72 h-20 card rounded-lg flex flex-row justify-evenly items-center flex-wrap m-6 ">
          {showWarning && (
            <span className="bg-red-600 rounded-full w-6 h-auto text-center">
              {daysDifference}
            </span>
          )}
          <h1 className="text-white">{props.title}</h1>
          <button
            className="bg-indigo-500 pb-1 text-black w-4 h-4 rounded-sm flex items-center justify-center px-3"
            onClick={changeShowdes}
          >
            v
          </button>
        </div>
      )}
      {showdes && (
        <TaskDes
          close={changeShowdes}
          title={props.title}
          date={props.date}
          reminder={props.reminder}
          desciption={props.desciption}
          id={props.id}
          deleteTask={props.deleteTask}
        />
      )}
    </>
  );
}
