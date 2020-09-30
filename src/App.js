import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LayoutOfApp from './components/Layout'
// Pages
const TeacherList = React.lazy(() => import('./container/TeacherList'));
const StudentList = React.lazy(() => import('./container/StudentList'));
const StudentsOfTeacher = React.lazy(() => import('./container/TeacherList/StudentListOfTeacher'));
const StudentDetail = React.lazy(()=>import('./container/StudentList/StudentDetail'))
function App() {
  return (

         <BrowserRouter>
               
              <React.Suspense fallback={<div>Loading... </div>}>
            
            <Switch>
            <LayoutOfApp>
              <Route exact path="/studentlist/teacher/:id" name="StudentOfTeacher Page" render={props => <StudentsOfTeacher {...props}/>} />
              <Route exact path="/teacherlist" name="Teacher Page" render={props => <TeacherList {...props}/>} />
              <Route exact path="/studentlist" name="Student Page" render={props => <StudentList {...props}/>} />
              <Route exact path="/studentlist/studentDetail/:id" name="Student Page" render={props => <StudentDetail {...props}/>} />
              <Redirect from="/" to="/teacherlist" />
              </LayoutOfApp>
            </Switch>
          </React.Suspense>
          
        </BrowserRouter>
  );
}

export default App;
