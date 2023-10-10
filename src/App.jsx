import "bootstrap/dist/css/bootstrap.min.css";

import { AddButton } from "./components/AddButton/AddButton";
import { Tasks } from "./components/Tasks/Tasks";

const App = () => {
  return (
    <div className="container">
      <AddButton />
      <Tasks />
    </div>
  );
};

export default App;
