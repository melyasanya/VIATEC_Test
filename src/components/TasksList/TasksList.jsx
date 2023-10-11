import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";

import { getTasks } from "../../redux/Tasks/TasksSelectors";

import css from "./TasksList.module.css";
import { deleteTask } from "../../redux/Tasks/TasksSlice";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import { useState } from "react";

export const TasksList = () => {
  const dispatch = useDispatch();
  const { allTasks } = useSelector(getTasks);
  const [show, setShow] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  const handleModal = () => setShow(!show);

  const handleEdit = (id) => {
    setShow(!show);
    setIdToEdit(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      <ul className={css.tasksList}>
        {allTasks.length > 0 &&
          allTasks.map((task) => {
            return (
              <li key={task.id}>
                <Card className={css.taskCard}>
                  <Card.Body className={css.taskCardBody}>
                    <div>
                      <Card.Title>{task.name}</Card.Title>
                      <Card.Text>{task.description}</Card.Text>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Виконано"
                          defaultChecked={task.checked}
                        />
                      </Form.Group>
                    </div>

                    <div className={css.cardBtns}>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(task.id)}
                      >
                        Редагувати
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleDelete(task.id)}
                      >
                        Видалити
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </li>
            );
          })}
        <EditTaskModal handleModal={handleModal} show={show} id={idToEdit} />
      </ul>
    </>
  );
};
