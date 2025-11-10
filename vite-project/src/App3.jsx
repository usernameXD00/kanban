import { useMemo, useState } from 'react';
import './App.css';

function App() {
  // const mayur = 'unused var';
  const dropTargetDivs = [
    { id: 'tostart', title: 'To Start', color: 'purple' },
    { id: 'progress', title: 'Progress', color: 'blue' },
    { id: 'review', title: 'Review', color: '#cece0a' },
    { id: 'completed', title: 'Completed', color: 'green' },
  ];
  const [tasklist, setTaskList] = useState([
    {
      id: 'header ui',
      title: 'header ui',
      status: 'tostart',
    },
    {
      id: 'api documentation',
      title: 'api documentation',
      status: 'tostart',
    },
    {
      id: 'registeration api development',
      title: 'registeration api development',
      status: 'tostart',
    },
    {
      id: 'stress testing',
      title: 'stress testing',
      status: 'tostart',
    },
    {
      id: 'Bug resolving',
      title: 'Bug resolving',
      status: 'tostart',
    },
  ]);

  const kanbanMap = useMemo(() => {
    const map = {
      tostart: [],
      progress: [],
      review: [],
      completed: [],
    };
    tasklist.forEach((task) => {
      map[task.status].push(task);
    });
    return map;
  }, [tasklist]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  };

  const handleDrop = (e, divId) => {
    let task = JSON.parse(e.dataTransfer.getData('application/json'));
    setTaskList((prev) => {
      //explicit return when curly bracket used
      return prev.map(
        (t) => (t.id === task.id ? { ...t, status: divId } : t) //implicit return when no curly bracket used
      );
    });
  };

  return (
    <div className="flex flex-row bg-black gap-5">
      {dropTargetDivs.map((divEle) => (
        <div
          key={divEle.id}
          id={divEle.id}
          className="flex flex-col gap-5 h-screen flex-1 my-[4rem] bg-white text-black"
          onDrop={(e) => handleDrop(e, divEle.id)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h1 style={{ color: divEle.color }}>{divEle.title}</h1>
          <div className="flex flex-col gap-5">
            {kanbanMap[divEle.id].map((task) => (
              <div
                draggable={divEle.id !== 'completed'}
                onDragStart={(e) => handleDragStart(e, task)}
                className="border border-black w-[90%] m-auto"
                style={{
                  background: divEle.id === 'completed' ? '#d2d2d2' : 'white',
                  border: `1px solid ${divEle.color}`,
                }}
                key={task.id}
                id={task.id}
              >
                <h4>{task.title}</h4>
                <h6>{task.status}</h6>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
