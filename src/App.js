
import {Route, Routes} from "react-router-dom"
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";


function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<EmployeeList/>}/>
        <Route path="/add-employee" element={<AddEmployee/>}/>
        <Route path="/employee-details/:id" element={<EmployeeDetails/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
