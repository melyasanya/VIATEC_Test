import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getFilterValue } from "../../redux/Tasks/TasksSelectors";
import { filter } from "../../redux/Tasks/TasksSlice";
import { filterValues } from "../../utils/filterValues";

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const handleFilter = (e) => {
    dispatch(filter(e.target.value));
  };

  return (
    <div className="d-flex justify-content-center">
      <Form.Select
        aria-label="Default select example"
        className="mb-4 w-50"
        onChange={handleFilter}
        defaultValue={filterValue}
      >
        <option value="0">{filterValues[0]}</option>
        <option value="1">{filterValues[1]}</option>
        <option value="2">{filterValues[2]}</option>
      </Form.Select>
    </div>
  );
};
