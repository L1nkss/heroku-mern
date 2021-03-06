import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import { IFormComponentProps } from "../types/types";

import { ENDPOINTS } from "../../../constants/constants";
import { setUserData } from "../../../redux/reducers/user/reducer";

const Login: React.FC<IFormComponentProps> = ({ successCallback, className = "" }: IFormComponentProps) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    message: "",
  });

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormStatus((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await axios.post(
        ENDPOINTS.login,
        data,
        {
          headers: { "Content-Type": "application/json" },
          baseURL: "/",
        },
      );
      if (response.status === 200) {
        dispatch(setUserData(response.data));
        // Если был передан callback, вызываем его
        if (successCallback) successCallback();
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
    <form className={`form ${className}`} onSubmit={handleFormSubmit}>
      <p>Авторизация</p>
      <div className="form__input-wrapper">
        <input name="email" onChange={handleInputChange} className="form__input" type="email" placeholder="Email" />
        <span className="form__icon-wrapper">
          <AiOutlineMail />
        </span>
      </div>
      <div className="form__input-wrapper">
        <input name="password" onChange={handleInputChange} className="form__input" type="password" placeholder="Password" />
        <span className="form__icon-wrapper">
          <RiLockPasswordLine />
        </span>
      </div>
      <button className="button button--orange" type="submit">
        {!formStatus.loading && "Войти"}
        {formStatus.loading && "Загружается"}
      </button>
      {formStatus.error && <div className="error form__error">{formStatus.message}</div>}
    </form>
  );
};

export default memo(Login);
