import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';
import ManagerLogin from './components/ManagerLogin';
import Admin_Home from './components/Admin_Home';
import Admin_Employee from './components/Admin_Employee';
import Admin_AddManager from './components/Admin_AddManager';
import Admin_AddEmployee from './components/Admin_AddEmployee';
import Manager_Home from './components/Manager_Home';
import Manager_AddEmployee from './components/Manager_AddEmployee';
import Employee_Home from './components/Employee_Home';
import Admin_EditManager from './components/Admin_EditManager';
export const url ='http://localhost:8000' //'https://pradeepak5-crm.onrender.com'



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<AdminLogin />} />
      <Route path='/admindashboard' element={<Admin_Home />} />
      <Route path='/adminemployee' element={<Admin_Employee />} />
      <Route path='/admin/add_manager' element={<Admin_AddManager />} />
      <Route path='/admin/add_employee' element={<Admin_AddEmployee />} />
      <Route path='/employee' element={<EmployeeLogin />}/>
      <Route path='/employeedashboard' element={<Employee_Home />}/>
      <Route path='/manager' element={<ManagerLogin />}/>
      <Route path='/manager/dashboard' element={<Manager_Home />}/>
      <Route path='/manager/add_employee' element={<Manager_AddEmployee />}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </>
  );
}

export default App;
