import { useMemo, useState } from "react";
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

  const scrumMap = useMemo(() => {
    const map = {
      tostart: [],
      progress: [],
      review: [],
      completed: [],
    };
    tasklist.map((task) => {
      map[task.status].push(task);
    });

    return map;
  }, [tasklist]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("application/json", JSON.stringify(task));
  };

  const handleDrop = (e, scrumDivId) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));

    setTaskList((prev) =>
      prev.map((t) =>
        t.id === draggedItem.id ? { ...t, status: scrumDivId } : t
      )
    );
  };

  return (
    <div className="bg-white h-[100%] flex flex-col gap-5">
      <h1 className="text-black">Scrum Board</h1>
      <div className="border border-black flex flex-row justify-evenly">
        {dropTargetDivs.map((scrumDiv) => (
          <div
            className="flex flex-col flex-1 border h-screen"
            key={scrumDiv.id}
            id={scrumDiv.id}
            onDrop={(e) => handleDrop(e, scrumDiv.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h1 style={{ color: scrumDiv.color, border: '1px solid black', w: '100%', marginBottom:'10px' }}>{scrumDiv.title}</h1>
            <div className="flex flex-col gap-5">
              {scrumMap[scrumDiv.id].map((task) => (
                <div
                  key={task.id}
                  id={task.id}
                  draggable={task.status !== "completed"}
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <h1 style={{ color: scrumDiv.color }}>{task.title}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
