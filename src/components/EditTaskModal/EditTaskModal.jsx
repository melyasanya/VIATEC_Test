import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getTasks } from "../../redux/Tasks/TasksSelectors";

export const EditTaskModal = ({ show, handleModal, id }) => {
  const { allTasks } = useSelector(getTasks);

  console.log(id);
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

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Додати завдання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          //   onChange={handleModalChange}
          id="addTaskFrom"
          //   onSubmit={handleSubmit}
        >
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
        <Button variant="primary" type="submit" form="addTaskFrom">
          Додати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
