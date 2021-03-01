import React, {
  useMemo, useState, memo,
} from "react";
import { AiOutlineCheckCircle, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

import { IFormComponentProps } from "../types/types";

import { ENDPOINTS } from "../../../constants/constants";

const Registration: React.FC<IFormComponentProps> = ({ successCallback, className = "" }: IFormComponentProps) => {
  const [data, setData] = useState({});
  const [state, setStage] = useState<number>(1);
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
        ENDPOINTS.registration,
        data,
        {
          headers: { "Content-Type": "application/json" },
          baseURL: "/",
        },
      );
      console.log("form response", response);
      if (response.status === 200) {
        setStage((prevState) => prevState + 1);
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

  const stageRegistration = useMemo(() => {
    return (
      <>
        <p>Регистрация</p>
        <div className="form__input-wrapper">
          <input required onChange={handleInputChange} name="username" className="form__input" type="text" placeholder="Username" />
          <span className="form__icon-wrapper">
            <FiUser />
          </span>
        </div>
        <div className="form__input-wrapper">
          <input required onChange={handleInputChange} name="email" className="form__input" type="email" placeholder="Email" />
          <span className="form__icon-wrapper">
            <AiOutlineMail />
          </span>
        </div>
        <div className="form__input-wrapper">
          <input required onChange={handleInputChange} name="password" className="form__input" type="text" placeholder="Password" />
          <span className="form__icon-wrapper">
            <RiLockPasswordLine />
          </span>
        </div>
        <div className="form__input-wrapper">
          <input required onChange={handleInputChange} name="confirm_password" className="form__input" type="text" placeholder="Repeat password" />
          <span className="form__icon-wrapper">
            <RiLockPasswordLine />
          </span>
        </div>
        <button className="button button--orange" type="submit">
          {!formStatus.loading && "Войти"}
          {formStatus.loading && "Загружается"}
        </button>
        {formStatus.error && <div className="error form__error">{formStatus.message}</div>}
      </>
    );
  }, [formStatus]);

  const successfulRegistration = useMemo(() => {
    return (
      <div className="form__success">
        <AiOutlineCheckCircle className="form__success-icon" />
        <p className="form__success-text">Congratulations, your account has been successfully created.</p>
        <button type="button" onClick={successCallback} className="button">Continue</button>
      </div>
    );
  }, []);

  return (
    <form className={`form ${className}`} onSubmit={handleFormSubmit}>
      {state === 1 && stageRegistration}
      {state === 2 && successfulRegistration}
    </form>
  );
};

export default memo(Registration);
