import { useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { deleteTask, editCheck } from "../../redux/Tasks/TasksSlice";
import css from "./TasksListItem.module.css";

export const TaskListItem = ({
  name,
  description,
  checked,
  id,
  isModalShown,
  setModal,
  setId,
}) => {
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    setModal(!isModalShown);
    setId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCheckChange = (e) => {
    dispatch(editCheck(e.target.id));
  };

  return (
    <li>
      <Card className={css.taskCard}>
        <Card.Body className="d-flex flex-column justify-content-between gap-2">
          <div>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Виконано"
                defaultChecked={checked}
                id={id}
                onChange={handleCheckChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => handleEdit(id)}>
              Редагувати
            </Button>
            <Button variant="primary" onClick={() => handleDelete(id)}>
              Видалити
            </Button>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
};

TaskListItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.string,
  isModalShown: PropTypes.bool,
  setModal: PropTypes.func,
  setId: PropTypes.func,
};
