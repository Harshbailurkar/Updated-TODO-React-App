import React from "react";

export default function TaskDes(props) {
  const [reminderState, setReminderState] = React.useState(props.reminder);

  return (
    <div className="card rounded-lg grid w-80 h-auto p-1 m-6 ">
      <div className=" header flex flex-row justify-evenly align-items-center pt-5 pb-4">
        <h1 className="text-white text-lg pl-7">{props.title}</h1>
        <button
          className="bg-indigo-500 pt-1 text-black w-4 h-4 rounded-sm flex items-center justify-center text-lg justify-items-end mt-1 space-x-8 ml-7 px-3"
          onClick={props.close}
        >
          ^
        </button>
      </div>
      <div className=" flex flex-col  justify-items-center pl-3 pt-1 space-y-2 mt-4">
        <span className=" flex flex-row justify-between">
          <p className=" text-slate-300">Due Date : {props.date}</p>
          <button onClick={(event) => props.deleteTask(event, props.id)}>
            {" "}
            <img
              src="../trash-regular-24.png"
              alt="Delete Task"
              className="pr-4"
            />
          </button>
        </span>
        <div>
          <input
            type="checkbox"
            checked={reminderState}
            onChange={() => setReminderState((prev) => !prev)}
            id="ReminderState"
            className="hidden"
          />

          <label
            htmlFor="ReminderState"
            className="px-3 flex flex-rowtext-slate-300"
          >
            {reminderState ? (
              <img src="./bell-solid-24.png" alt="" className="w-6 h-auto" />
            ) : (
              <img
                src="./bell-off-solid-24.png"
                alt=""
                className="w-6 h-auto"
              />
            )}
            <span className="px-3"> Reminder</span>
          </label>
          <br />
          <label className="text-slate-400 mb-4">Description: </label>
          <div className=" w-60 h-auto des ml-6 mb-6 text-white p-2 mt-3 text-center flex justify-center">
            <p>{props.desciption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
