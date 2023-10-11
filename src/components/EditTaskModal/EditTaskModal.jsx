import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/Tasks/TasksSelectors";
import { editTask } from "../../redux/Tasks/TasksSlice";

export const EditTaskModal = ({ show, handleModal, id }) => {
  const { allTasks } = useSelector(getTasks);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const currentTask = allTasks.find((task) => task.id === id) || {
      name: "",
      description: "",
    };
    setName(currentTask.name);
    setDescription(currentTask.description);
  }, [allTasks, id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedTask = {
      name,
      description,
      id,
    };
    dispatch(editTask(editedTask));
    handleModal();
  };

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Додати завдання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="editTaskFrom" onSubmit={handleSubmit}>
          <Form.Label htmlFor="taskName">Назва</Form.Label>
          <Form.Control
            type="text"
            id="taskName"
            aria-describedby="taskName"
            value={name}
            onChange={handleNameChange}
          />
          <Form.Label htmlFor="taskDescription">Опис</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="taskDescription"
            aria-describedby="taskDescription"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Закрити
        </Button>
        <Button variant="primary" type="submit" form="editTaskFrom">
          Змінити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
