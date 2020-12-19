import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    const handleClick = () => alert("Тестируем")
    return (
        <>
            <div onClick={handleClick}>Hello There 2</div>
            <button onClick={handleClick}>Hello</button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))