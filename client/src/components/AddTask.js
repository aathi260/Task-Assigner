import React, { useState, useEffect, useCallback } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import TaskForm from "./TaskForm";
import Panel from "./Panel";
import classes from "./AddTask.module.css";
import Card from "../UI/Card";
import AddTaskModalOverlay from "../UI/AddTaskModalOverlay";
import Pusher from "pusher-js";

function AddTask(props) {
  const [taskList, setTaskList] = useState([]);

  // Fetching events from baseUrl//
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://my-json-server.typicode.com/karthick03/json-db-data/tasks",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setTaskList(result));
  }, []);
  //End of Fetching events from baseUrl//

  // Fetching events from pusher//
  const fetchHanler = useCallback(() => {
    const pusher = new Pusher("7f23f5e83ed98dd456fe", {
      cluster: "ap2",
    });

    //Binding the channel to pusher//
    const channel = pusher.subscribe("task");
    channel.bind("newTask", function (data) {
      // Adding prevousState to the current State //
      setTaskList((prevTasks) => {
        return [data, ...prevTasks];
      });
    });

    channel.bind("deleteTask", function (data) {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    fetchHanler();
  }, [fetchHanler]);
  //End of Fetching events from pusher//

  return (
    <AddTaskModalOverlay onClose={props.onClose}>
      {/* <--Task Assigner Card--> */}
      <Card className={classes.tasks}>
        <div className={classes.taskHeader}>
          <h2>Activites</h2>
          <button className={classes.taskClose} onClick={props.onClose}>
            <AiFillCloseCircle />
          </button>
        </div>
        {/* <--Task Assigner Card--> */}

        {/* Task input form */}
        <TaskForm />
        {/* Task input form */}

        {/* Task Panel  */}
        <h4 className={classes.title}>Team Tasks</h4>
        <div className={classes.pannel}>
          {taskList.map((task) => (
            <Panel
              key={task.id}
              id={task.id}
              projectName={task.projectName}
              taskName={task.taskName}
              billable={task.billable}
            />
          ))}
        </div>
        {/* Task Panel  */}
      </Card>
      {/* <--Task Assigner Card--> */}
    </AddTaskModalOverlay>
  );
}

export default AddTask;
