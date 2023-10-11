import { useState } from "react";
import { useSelector } from "react-redux";

import { getFilterValue, getTasks } from "../../redux/Tasks/TasksSelectors";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import { TaskListItem } from "../TaskListItem/TaskListItem";

export const TasksList = () => {
  const allTasks = useSelector(getTasks);
  const filterValue = useSelector(getFilterValue);
  const [show, setShow] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const [validated, setValidated] = useState(false);

  const handleModal = () => {
    setShow(!show);
    setValidated(false);
  };

  return (
    <ul className="d-flex flex-wrap gap-5">
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
      <EditTaskModal
        handleModal={handleModal}
        show={show}
        id={idToEdit}
        validated={validated}
        setValidated={setValidated}
      />
    </ul>
  );
};
