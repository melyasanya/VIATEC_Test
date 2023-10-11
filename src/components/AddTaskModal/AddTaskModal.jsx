import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { addTask } from "../../redux/Tasks/TasksSlice";

import css from "./AddTaskModal.module.css";

export const AddTaskModal = ({ handleModal, show }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleModalChange = (e) => {
    if (e.target.id === "taskName") {
      setName(e.target.value);
    } else if (e.target.id === "taskDescription") {
      setDescription(e.target.value);
    } else if (e.target.id === "taskChecked") {
      e.target.value === "1" ? setChecked(false) : setChecked(true);
    }
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log(form);
    } else {
      const newTask = {
        name,
        description,
        checked,
        id: nanoid(),
      };
      dispatch(addTask(newTask));
      handleModal();
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Додати завдання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onChange={handleModalChange}
          id="addTaskFrom"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Label htmlFor="taskName">
            Назва <span className={css.requiredStar}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="taskName"
            aria-describedby="taskName"
            defaultValue={name}
            required
          />
          <Form.Label htmlFor="taskDescription">
            Опис <span className={css.requiredStar}>*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="taskDescription"
            aria-describedby="taskDescription"
            defaultValue={description}
            required
          />
          <Form.Select id="taskChecked" aria-label="Task check selection">
            <option value="1">Не виконано</option>
            <option value="2">Виконано</option>
          </Form.Select>
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
