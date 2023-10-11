import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/Tasks/TasksSlice";

export const Filter = ({ filterValues }) => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(filter(e.target.value));
  };

  return (
    <div className="d-flex justify-content-center">
      <Form.Select
        aria-label="Default select example"
        className="mb-4 w-50"
        onChange={handleFilter}
      >
        <option value="0">{filterValues[0]}</option>
        <option value="1">{filterValues[1]}</option>
        <option value="2">{filterValues[2]}</option>
      </Form.Select>
    </div>
  );
};
