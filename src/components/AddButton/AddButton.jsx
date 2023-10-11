import { useState } from "react";
import Button from "react-bootstrap/Button";

import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const AddButton = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleModal = () => {
    setShow(!show);
    setValidated(false);
  };

  return (
    <div className="d-flex justify-content-center pt-5">
      <Button variant="primary" size="lg" onClick={handleModal}>
        Додати завдання
      </Button>
      <AddTaskModal
        handleModal={handleModal}
        show={show}
        validated={validated}
        setValidated={setValidated}
      />
    </div>
  );
};
