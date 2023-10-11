import { Filter } from "../Filter/Filter";
import { TasksList } from "../TasksList/TasksList";

export const Tasks = () => {
  return (
    <div>
      <h1 className="my-4 text-center">Завдання</h1>
      <Filter />
      <TasksList />
    </div>
  );
};
