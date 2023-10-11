import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

import { addTask } from "../../redux/Tasks/TasksSlice";
import { taskCheckValues } from "../../utils/filterValues";

export const AddTaskModal = ({
  handleModal,
  show,
  validated,
  setValidated,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const handleModalChange = (e) => {
    const { value, id } = e.target;
    if (id === "taskName") {
      setName(value);
    } else if (id === "taskDescription") {
      setDescription(value);
    } else if (id === "taskChecked") {
      value === "0" ? setChecked(false) : setChecked(true);
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const newTask = {
        name,
        description,
        checked,
        id: nanoid(),
      };
      dispatch(addTask(newTask));
      handleModal();
      setName("");
      setDescription("");
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
            Назва <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="taskName"
            aria-describedby="taskName"
            defaultValue={name}
            required
          />
          <Form.Label htmlFor="taskDescription">
            Опис <span className="text-danger">*</span>
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
            <option value="0">{taskCheckValues[0]}</option>
            <option value="1">{taskCheckValues[1]}</option>
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

AddTaskModal.propTypes = {
  handleModal: PropTypes.func,
  show: PropTypes.bool,
  validated: PropTypes.bool,
  setValidated: PropTypes.func,
};
