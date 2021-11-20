import React from "react";
import Card from "../UI/Card";
import classes from "./Panel.module.css";
import { AiOutlineDollarCircle, AiOutlineDelete } from "react-icons/ai";

function Pannel({ projectName, taskName, id, billable }) {
  //Fetching API and consoling the ID that is Deleted when clicked//
  const deleteHandler = () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/tasks/" + id, requestOptions).then(
      (response) => response.text()
    );
  };

  return (
    <Card className={classes.taskCard}>
      <div className={classes.taskRow}>
        <h4>{projectName}</h4>
        {billable ? (
          <p>
            <AiOutlineDollarCircle className={classes.dollar} /> {taskName}
          </p>
        ) : (
          <p>{taskName}</p>
        )}
      </div>
      <button className={classes.btn} onClick={deleteHandler}>
        <AiOutlineDelete className={classes.button} />
      </button>
    </Card>
  );
}

export default Pannel;
