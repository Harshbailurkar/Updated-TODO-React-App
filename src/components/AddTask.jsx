import React from "react";

export default function AddTask(props) {
  const [reminder, setReminder] = React.useState(false);
  const [taskInfo, setTaskInfo] = React.useState({
    id: props.allTask.length + 1,
    title: "",
    dueDate: "",
    reminder: reminder,
    description: "",
  });

  const dateInput = (e) => {
    e.preventDefault();
    setTaskInfo({
      ...taskInfo,
      dueDate: e.target.value,
    });
  };

  const titleInput = (e) => {
    e.preventDefault();
    setTaskInfo({
      ...taskInfo,
      title: e.target.value,
    });
  };

  const checkboxInput = (e) => {
    e.preventDefault();
    setTaskInfo({
      ...taskInfo,
      reminder: !taskInfo.reminder,
    });
  };

  const descriptionInput = (e) => {
    e.preventDefault();
    setTaskInfo({
      ...taskInfo,
      description: e.target.value,
    });
  };

  const submitTaskInfo = () => {
    const { title } = taskInfo;
    if (title) {
      props.addingTask((prevTask) => [taskInfo, ...prevTask]);
    } else {
      alert("Title is Required");
    }
  };

  return (
    <div className="card w-80 h-auto rounded m-4 block absolute shadow-2xl">
      <div className="Header flex flex-row p-2 justify-between">
        <h1 className="text-xl p-2">
          <b>Add Task</b>
        </h1>
        <button
          className="bg-red-500 pt-1 text w-4 h-4 rounded-sm flex items-center justify-center text-lg justify-items-end mt-1 mr-2 space-x-8 ml-7 px-3 pb-2 "
          onClick={props.close}
        >
          x
        </button>
      </div>
      <div className="date py-2">
        <label className="px-3 ">Due Date :</label>
        <input
          type="date"
          className="rounded bg-slate-800 outline-none title-inp"
          onChange={dateInput}
          placeholder="Select Date"
        />
      </div>
      <div className=" title flex flex-row pb-2">
        <label className="px-3 ">Title :</label>
        <input
          required
          type="text"
          className="rounded bg-slate-800 outline-none title-inp"
          onChange={titleInput}
        />
      </div>
      <div className="checkbox px-3 pt-3">
        <input
          type="checkbox"
          onChange={checkboxInput}
          id="reminderState"
          className="hidden"
        />
        <label htmlFor="reminderState" className="px-3 flex flex-row">
          {taskInfo.reminder ? (
            <img src="./bell-solid-24.png" alt="" className="w-6 h-auto" />
          ) : (
            <img src="./bell-off-solid-24.png" alt="" className="w-6 h-auto" />
          )}
          <span className="px-3">Set Reminder</span>
        </label>
      </div>
      <div className=" TextArea flex flex-col">
        <label className="px-3 text-slate-300 pt-3">Description :</label>
        <textarea
          className="w-5/6 m-5 bg-slate-800 h-24 outline-none p-3 mt-2 rounded"
          onChange={descriptionInput}
        ></textarea>
      </div>
      <span className="submit-btn flex justify-center">
        <a onClick={props.close}>
          <button
            className="outline-none rounded bg-blue-700 text-ehitr px-3 m-4 ml-0 h-8 shrink=0"
            onClick={submitTaskInfo}
          >
            Add
          </button>
        </a>
      </span>
    </div>
  );
}
