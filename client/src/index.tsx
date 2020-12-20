import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home = () => {
    return <div>Home Page</div>
}

const About = () => {
    return <div>About Page</div>
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
                    <Home />
                </Route>
                <Route path="/">
                    <About />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
