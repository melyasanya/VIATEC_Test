import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import { getTasks } from "../../redux/Tasks/TasksSelectors";
import { editTask } from "../../redux/Tasks/TasksSlice";

export const EditTaskModal = ({
  show,
  handleModal,
  id,
  validated,
  setValidated,
}) => {
  const dispatch = useDispatch();
  const allTasks = useSelector(getTasks);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const currentTask = allTasks.find((task) => task.id === id) || {
      name: "",
      description: "",
    };
    setName(currentTask.name);
    setDescription(currentTask.description);
    setInitialValues({
      name: currentTask.name,
      description: currentTask.description,
    });
  }, [allTasks, id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const editedTask = {
        name,
        description,
        id,
      };
      dispatch(editTask(editedTask));
      handleModal();
    }
  };

  const resetValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setValidated(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleModal();
        resetValues();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Редагувати завдання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="editTaskFrom"
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <Form.Label htmlFor="taskName">Назва</Form.Label>
          <Form.Control
            type="text"
            id="taskName"
            aria-describedby="taskName"
            value={name}
            onChange={handleNameChange}
            required
          />
          <Form.Label htmlFor="taskDescription">Опис</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="taskDescription"
            aria-describedby="taskDescription"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleModal();
            resetValues();
          }}
        >
          Закрити
        </Button>
        <Button variant="primary" type="submit" form="editTaskFrom">
          Змінити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  show: PropTypes.bool,
  handleModal: PropTypes.func,
  id: PropTypes.string,
  validated: PropTypes.bool,
  setValidated: PropTypes.func,
};
