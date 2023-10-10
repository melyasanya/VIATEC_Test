import { useState } from "react";
import Button from "react-bootstrap/Button";

import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

import css from "./AddButton.module.css";

export const AddButton = () => {
  const [show, setShow] = useState(false);

  const handleModal = () => setShow(!show);

  return (
    <div className={css.btnContainer}>
      <Button variant="primary" size="lg" onClick={handleModal}>
        Додати завдання
      </Button>
      <AddTaskModal handleModal={handleModal} show={show} />
    </div>
  );
};
