import React, { useState, useEffect, useDeferredValue } from "react";
import Moon from "./images/icon-moon.svg";
import Sun from "./images/icon-sun.svg";
import Check from "./images/icon-check.svg";
import Cross from "./images/icon-cross.svg";
import "./App.css";
import "./dark.css";

const getLocalItems = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [
      {
        title: "completa",
        id: 1,
        completed: true,
      },
      {
        title: "não completa",
        id: 2,
        completed: false,
      },
    ];
  }
};

function App() {
  const [dados, setDados] = useState(getLocalItems());
  const [dark, setDark] = useState(false);
  const [task, setTask] = useState();
  const [items, setItems] = useState(0);
  const [filter, setfilter] = useState("all");
  var lg = window.screen.width;
  const mode = () => {
    const body = document.querySelector("body");
    if (body.className === "") {
      body.className = "dark";
      setDark(true);
    } else {
      body.className = "";
      setDark(false);
    }
  };

  const handleKey = (e) => {
    if (e.key == "Enter") {
      handleTaskAddition(task);
    }
  };

  const handleTaskAddition = (taskTitle) => {
    if (taskTitle !== "") {
      const newTasks = [
        ...dados,
        {
          title: taskTitle,
          id: Math.random(100),
          completed: false,
        },
      ];
      setDados(newTasks);
    }
  };

  const handleTaskClick = (taskId) => {
    const newTasks = dados.map((c) => {
      if (c.id === taskId) return { ...c, completed: !c.completed };
      return c;
    });

    setDados(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    let newTasks = dados.filter((task) => task.id !== taskId);
    setDados(newTasks);
  };

  const handleDeleteAll = () => {
    let clear = dados.map((todo) => {
      if (todo.completed) {
        todo.completed = false;
        return todo;
      }
      return todo;
    });

    setDados(clear);
  };

  const handleFilter = (e) => {
    setfilter(e);
  };

  const handleItens = () => {
    let j = 0;
    dados.forEach((i) => {
      if (!i.completed) {
        j++;
      }
    });
    setItems(j);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(dados));
    handleItens();
  }, [dados]);
  return (
    <>
      <div className="bg-topo"></div>

      <div className="container">
        <div className="top">
          <div className="title">
            <h1>T O D O</h1>
          </div>
          <label htmlFor="modos" className="icon" onClick={mode}>
            <input onChange={mode} id="modos" type="checkbox" />
            <img src={dark ? Sun : Moon} alt="" />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="task" className="circle"></label>
          <input
            className="input"
            placeholder="Create a new todo..."
            type="text"
            name="task"
            id="task"
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => handleKey(e)}
          />
        </div>
        <div className="tasks">
          {dados.map((c) => (
            <div
              key={c.id}
              style={
                filter == "all"
                  ? { display: "flex" }
                  : filter == "uncompleted" && c.completed
                  ? { display: "none" }
                  : filter == "completed" && c.completed == false
                  ? { display: "none" }
                  : {}
              }
              className={c.completed ? "task completed" : "task"}
            >
              <div className="text-task">
                <button
                  onClick={() => handleTaskClick(c.id)}
                  className="circle"
                >
                  <img src={c.completed ? Check : ""} alt="" />
                </button>
                <p>{c.title}</p>
              </div>
              <button onClick={() => handleTaskDeletion(c.id)}>
                <img src={Cross} alt="" />
              </button>
            </div>
          ))}
        </div>
        <div className="task-clear">
          <p>{items || "0"} items left</p>

          {lg > 375 ? (
            <div className="task-filter">
              <p
                onClick={() => handleFilter("all")}
                className={filter == "all" ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                All
              </p>
              <p
                onClick={() => handleFilter("uncompleted")}
                className={filter == "uncompleted" ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                Active
              </p>
              <p
                onClick={() => handleFilter("completed")}
                className={filter == "completed" ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                Completed
              </p>
            </div>
          ) : (
            ""
          )}
          <p
            onClick={() => handleDeleteAll()}
            style={{
              cursor: "pointer",
            }}
          >
            clear completed
          </p>
        </div>
        {lg <= 375 ? (
          <div className="task-filter">
            <p
              onClick={() => handleFilter("all")}
              className={filter == "all" ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              All
            </p>
            <p
              onClick={() => handleFilter("uncompleted")}
              className={filter == "uncompleted" ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              Active
            </p>
            <p
              onClick={() => handleFilter("completed")}
              className={filter == "completed" ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              Completed
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
