import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
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

  const handleCheckChange = (id) => {
    dispatch(editCheck(id));
  };
  return (
    <li>
      <Card className={css.taskCard}>
        <Card.Body className={css.taskCardBody}>
          <div>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Виконано"
                defaultChecked={checked}
                onChange={() => handleCheckChange(id)}
              />
            </Form.Group>
          </div>

          <div className={css.cardBtns}>
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
