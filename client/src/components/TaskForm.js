import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import classes from "./TaskForm.module.css";

function TaskForm(props) {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [billable, setBillable] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // validating the form and Add activity will be//
  useEffect(() => {
    setFormIsValid(
      projectName.trim().length >= 3 && taskName.trim().length >= 3
    );
  }, [projectName, taskName]);
  // End of validating the form//

  //Sending the data to Pusher//
  const addActivityHandler = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName,
        projectName,
        billable,
      }),
    });
    //Setting the Inputs to it's Initial state//
    setProjectName("");
    setTaskName("");
    setBillable(false);
    setFormIsValid(false);
  };

  return (
    <div>
      <form onSubmit={addActivityHandler}>
        <div className={classes.control}>
          <label htmlFor="taskname">Task Name</label>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(event) => {
              setTaskName(event.target.value);
            }}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="taskname">Project Name</label>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            required
          />
        </div>
        <div className={classes.billable}>
          <div>
            <input
              type="checkbox"
              onChange={(event) => {
                setBillable(event.target.checked);
              }}
              checked={billable}
            />
            <label>Billable</label>
          </div>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Add Activity
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
