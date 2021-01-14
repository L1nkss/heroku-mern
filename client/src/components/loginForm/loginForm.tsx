import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoginStatus } from "../../redux/reducers/user/reducer";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    message: "",
  });
  // const [error, setError] = useState({});
  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormStatus((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await axios.post(
        "/api/authenticate",
        data,
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.status === 200) {
        dispatch(setLoginStatus(true));
      }
    } catch (e) {
      const { error } = e.response.data;
      setFormStatus({ error: true, loading: false, message: error });
    }
  };
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <p>Авторизация</p>
      <div className="login-form__input-wrapper">
        <input name="login" onChange={handleInputChange} className="login-form__input" type="text" placeholder="Username" />
        <span className="login-form__icon-wrapper">
          <i className="fa fa-user" />
        </span>
      </div>
      <div className="login-form__input-wrapper">
        <input name="password" onChange={handleInputChange} className="login-form__input" type="password" placeholder="Password" />
        <span className="login-form__icon-wrapper">
          <i className="fa fa-key" />
        </span>
      </div>
      <button className="button button--orange" type="submit">
        {!formStatus.loading && "Войти"}
        {formStatus.loading && "Загружается"}
      </button>
      {formStatus.error && <div className="error login-form__error">{formStatus.message}</div>}
    </form>
  );
};

export default LoginForm;
