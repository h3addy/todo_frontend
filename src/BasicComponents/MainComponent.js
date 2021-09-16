import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ErrorsPage from './ErrorsPageComponent';
import UserSignUp from '../UsersComponents/UserSignUp';
import UserLogin from '../UsersComponents/UserLogin';
// import Users from './UsersComponents/Users';
import UserDetails from '../UsersComponents/UserDetails';
import Home from './HomeComponent';
import ToDoList from '../ToDoComponents/ToDoList';
import ToDoAdd from '../ToDoComponents/ToDoAdd';
import ToDoTaskDetail from '../ToDoComponents/ToDoDetail';
import UserLogout from '../UsersComponents/UserLogout';
import Navbar from './NavbarComponent';
import Footer from './FooterComponent';


const MainComponent = () => {
    return (
        <>
        <Navbar>ToDo</Navbar>
        <Router>
            <Switch>
                {/* User Routes */}
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/users" component={Users} /> */}
                <Route exact path="/signup" component={UserSignUp} />
                <Route exact path="/login" component={UserLogin} />
                <Route exact path="/profile" component={UserDetails} />
                <Route exact path="/logout" component={UserLogout} />
                {/* TODO ROUTES */}
                <Route exact path="/user-tasks" component={ToDoList} />
                <Route exact path="/user-tasks/add" component={ToDoAdd} />
                <Route exact path="/task" component={ToDoTaskDetail} />
                <Route path="*" component={ErrorsPage} />
            </Switch>
        </Router>
        <Footer></Footer>
        </>
    )
}

export default MainComponent
