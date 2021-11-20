import React, { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Button from "./UI/Button";

function App() {
  const [taskShown, setTaskShown] = useState(false);

  const showTaskHandler = () => {
    setTaskShown(true);
  };
  const hideTaskHandler = () => {
    setTaskShown(false);
  };

  return (
    <div>
      {taskShown && <AddTask onClose={hideTaskHandler} />}
      <Button onClick={showTaskHandler}>Task Manager</Button>
    </div>
  );
}

export default App;
