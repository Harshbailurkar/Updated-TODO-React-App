import { useState, useEffect } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

function App() {
  const [allTask, setAllTask] = useState(
    () => JSON.parse(localStorage.getItem("Tasks")) || []
  );
  const [isChecked, setIsChecked] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [task, setTask] = useState(allTask ? true : false);
  const [searchtask, setSearchTask] = useState([]);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(allTask));
  }, [allTask]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const closeAddTask = () => {
    setAddTask((prev) => !prev);
  };

  function deleteTask(event, TaskId) {
    event.stopPropagation();
    setAllTask((oldTask) => oldTask.filter((newtask) => newtask.id !== TaskId));
  }
  const clearAllTask = () => {
    Swal.fire({
      title: "Delete All !!",
      text: "You will Lose All the Task Details. and you can never recover. Click ok to Delete All Task.",
      icon: "warning",
      confirmButtonText: "OK",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setAllTask([]);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };
  function search(e) {
    let inputsearchTask = e.target.value.toLowerCase();
    setSearchTask(inputsearchTask);
  }
  const filteredData = allTask.filter((task) => {
    if (searchtask === "") {
      return true;
    }
    return task.title.toLowerCase().includes(searchtask);
  });
  const TaskComp = filteredData.map((items) => {
    return (
      <Task
        key={items.id}
        id={items.id}
        title={items.title}
        date={items.dueDate}
        reminder={items.reminder}
        desciption={items.description}
        deleteTask={deleteTask}
      />
    );
  });
  return (
    <div>
      <h1 className="mobileview">
        We are Working with Mobile device view. for now open in desktop Mode
      </h1>
      <div className="mx-6 App">
        <div className="flex flex-row justify-between flex-wrap ">
          <div className="w-28 h-11 flex justify-center items-center bg-amber-200 text-black text-lg rounded-lg m-4">
            TO-DO List
          </div>
          <div>
            <input
              placeholder="Search Task"
              type="search"
              className="w-52 h-8 rounded-l-lg m-4 text-center px-3 mr-0 card outline-none text-ehitr shrink=0 search"
              onChange={search}
            />
            <button className="outline-none rounded-r-lg bg-blue-700 text-ehitr px-3 m-4 ml-0 h-8 shrink=0">
              Search
            </button>
          </div>
          <div className="">
            <label className="flex cursor-pointer select-none items-center  bg-blue-700 w-14 m-4 rounded-xl mr-8">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`box block h-8 w-14 rounded-full ${
                    isChecked ? "bg-primary" : "bg-dark"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                    isChecked ? "translate-x-full" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-row ml-7 mt-6 ">
          <div className="Text Center p-3 bg-blue-300 w-24 text-black rounded-l-lg">
            Add Task
          </div>
          <button
            className="text-center p-3 bg-blue-500 w-14 text-xl rounded-r-sm"
            onClick={() => setAddTask((prev) => !prev)}
          >
            +
          </button>
          <button
            className="ml-24 bg-violet-700 rounded  px-2 h-7 w-auto flex flex-nowrap mt-3 text-center py-1 shrink=0"
            onClick={clearAllTask}
          >
            Clear All
          </button>
        </div>

        <div>
          {addTask && (
            <AddTask
              close={closeAddTask}
              allTask={allTask}
              addingTask={setAllTask}
            />
          )}
        </div>
        <div className="flex align-center justify-center py-2  flex-wrap">
          {task && TaskComp}
        </div>
      </div>
    </div>
  );
}

export default App;
