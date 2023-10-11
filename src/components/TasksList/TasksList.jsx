import { getFilterValue, getTasks } from "../../redux/Tasks/TasksSelectors";

import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import { useState } from "react";
import { Filter } from "../Filter/Filter";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import { useSelector } from "react-redux";
import css from "./TaskList.module.css";

const filterValues = ["Всі", "Виконані", "Не виконані"];

export const TasksList = () => {
  const { allTasks } = useSelector(getTasks);
  const filterValue = useSelector(getFilterValue);
  const [show, setShow] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  const handleModal = () => setShow(!show);

  return (
    <>
      <Filter filterValues={filterValues} />
      <ul className={css.tasksList}>
        {allTasks.length > 0 && filterValue === "0"
          ? allTasks.map((task) => {
              return (
                <TaskListItem
                  key={task.id}
                  name={task.name}
                  description={task.description}
                  checked={task.checked}
                  id={task.id}
                  isModalShown={show}
                  setModal={setShow}
                  setId={setIdToEdit}
                />
              );
            })
          : filterValue === "1"
          ? allTasks
              .filter((task) => task.checked)
              .map((task) => {
                return (
                  <TaskListItem
                    key={task.id}
                    name={task.name}
                    description={task.description}
                    checked={task.checked}
                    id={task.id}
                    isModalShown={show}
                    setModal={setShow}
                    setId={setIdToEdit}
                  />
                );
              })
          : filterValue === "2"
          ? allTasks
              .filter((task) => !task.checked)
              .map((task) => {
                return (
                  <TaskListItem
                    key={task.id}
                    name={task.name}
                    description={task.description}
                    checked={task.checked}
                    id={task.id}
                    isModalShown={show}
                    setModal={setShow}
                    setId={setIdToEdit}
                  />
                );
              })
          : ""}
        <EditTaskModal handleModal={handleModal} show={show} id={idToEdit} />
      </ul>
    </>
  );
};
