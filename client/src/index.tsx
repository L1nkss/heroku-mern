import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home = () => {
    return <div>Home Page </div>
}

const About = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        console.log("Fetch запрос");
        fetch('/user')
            .then((response) => response.json())
            .then((body) => setUsers(body.data))
    }, []);

    return (
    <div>
        <h1>About Page</h1>
        {users?.map((user) => {
            console.log(user);
            return (
                <div key={user._id}>{user.login}</div>
            )
        })}
    </div>
    )
}


const App = () => {
    return (
        <Router>
            <nav>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </nav>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
