import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    return (
        <div onClick={() => alert("Heroku")}>Hello</div>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
