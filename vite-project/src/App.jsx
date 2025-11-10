import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const dropTargetDivs = [
    { id: "tostart", title: "To Start", color: "purple" },
    { id: "progress", title: "Progress", color: "blue" },
    { id: "review", title: "Review", color: "yellow" },
    { id: "completed", title: "Completed", color: "green" },
  ];
  const [tasklist, setTaskList] = useState([
    {
      id: "header ui",
      title: "header ui",
      status: "tostart",
    },
    {
      id: "api documentation",
      title: "api documentation",
      status: "tostart",
    },
    {
      id: "registeration api development",
      title: "registeration api development",
      status: "tostart",
    },
    {
      id: "stress testing",
      title: "stress testing",
      status: "tostart",
    },
  ]);

  function handleDragStart(e, draggedDiv) {
    e.dataTransfer.setData("application/json", JSON.stringify(draggedDiv));
  }

  function handleDrop(e, divId) {
    e.preventDefault();

    let draggableItem = JSON.parse(e.dataTransfer.getData("application/json"));

    let copyTaskList = [...tasklist];

    //find task index
    let taskIndex = copyTaskList.findIndex((t) => t.id === draggableItem.id);
    if (taskIndex === -1) return;

    copyTaskList[taskIndex] = {
      ...copyTaskList[taskIndex],
      status: divId.id,
    };

    setTaskList(copyTaskList);
  }
  const scrumBoardMap= useMemo(()=> {
    const map = {
      tostart: [],
      progress: [],
      review: [],
      completed: [],
    };
    tasklist.map((task)=>{
      map[task.status].push(task);
    });
    return map;
  }, [tasklist])
 

  return (
    <>
      <h1 className="text-3xl font-bold">Welcome</h1>
      <div className="flex justify-evenly flex-row gap-3">
        {dropTargetDivs.map((divId) => (
          <div
            id={divId.id}
            key={divId.id}
            className=" bg-white gap-2"
            onDrop={(e) => handleDrop(e, divId)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h1 style={{ color: divId.color }}>{divId.title}</h1>
              {
                scrumBoardMap[divId.id].map((taskEle) => (
                <div
                  id={taskEle.id}
                  key={taskEle.id}
                  className="h-[200px] w-[200px] bg-[#fff] text-center m-auto"
                  draggable={taskEle.status === "completed" ? false : true}
                  onDragStart={(e) => handleDragStart(e, taskEle)}
                >
                  <h1 style={{ color: divId.color }}>{taskEle.title}</h1>
                </div>
              ))
              }
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
