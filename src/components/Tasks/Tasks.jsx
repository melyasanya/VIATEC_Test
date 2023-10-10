import { TasksList } from "../TasksList/TasksList";

import css from "./Tasks.module.css";

export const Tasks = () => {
  return (
    <div>
      <h1 className={css.tasksHeader}>Завдання</h1>
      <TasksList />
    </div>
  );
};
