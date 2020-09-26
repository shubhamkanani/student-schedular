import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LayoutOfApp from './components/Layout'
// Pages
const TeacherList = React.lazy(() => import('./container/TeacherList'));
const StudentList = React.lazy(() => import('./container/StudentList'));
const StudentsOfTeacher = React.lazy(() => import('./container/TeacherList/StudentListOfTeacher'))
function App() {
  return (

         <BrowserRouter>
               <LayoutOfApp>
              <React.Suspense fallback={<div>Loading... </div>}>
            
            <Switch>
              <Route exact path="/studentlist/teacher/:id" name="StudentOfTeacher Page" render={props => <StudentsOfTeacher {...props}/>} />
              <Route exact path="/teacherlist" name="Teacher Page" render={props => <TeacherList {...props}/>} />
              <Route exact path="/studentlist" name="Student Page" render={props => <StudentList {...props}/>} />
              <Redirect from="/" to="/teacherlist" />
            </Switch>
          </React.Suspense>
          </LayoutOfApp>
        </BrowserRouter>
  );
}

export default App;
