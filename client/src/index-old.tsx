// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
// } from "react-router-dom";
//
// import "./style/style.scss";
//
// const Home = () => {
//   return <div>Home Page </div>;
// };
//
// const About = () => {
//   const [users, setUsers] = useState<any[]>([]);
//
//   useEffect(() => {
//     console.log("Fetch запрос");
//     fetch("/api/users");
//   }, []);
//
//   return (
//     <div>
//       <h1>About Page</h1>
//       {users?.map((user) => {
//         console.log(user);
//         return (
//           <div key={user._id}>{user.login}</div>
//         );
//       })}
//     </div>
//   );
// };
//
// const Login = () => {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//
//   const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = evt.target;
//
//     name === "login" ? setLogin(value) : setPassword(value);
//   };
//
//   const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
//     evt.preventDefault();
//
//     fetch("/api/authenticate", {
//       method: "POST",
//       body: JSON.stringify({ login, password }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         console.log(res);
//       });
//   };
//
//   return (
//     <form onSubmit={onSubmit}>
//       <h1>Login Below!</h1>
//       <input
//         type="login"
//         name="login"
//         placeholder="Enter login"
//         value={login}
//         onChange={handleInputChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Enter password"
//         value={password}
//         onChange={handleInputChange}
//         required
//       />
//       <button type="submit">Логин</button>
//     </form>
//   );
// };
//
// const App = () => {
//   return (
//     <Router>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>
//       <Switch>
//         <Route path="/about">
//           <About />
//         </Route>
//         <Route path="/login">
//           <Login />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };
//
// ReactDOM.render(
//   <App />,
//   document.getElementById("root"),
// );
