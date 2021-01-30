import React, { memo, useState } from "react";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { ENDPOINTS } from "../../constants/constants";

interface IRegisterFormProps {
  successCb?: (args?: any) => void
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ successCb }: IRegisterFormProps) => {
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
        ENDPOINTS.registration,
        data,
        {
          headers: { "Content-Type": "application/json" },
          baseURL: "/",
        },
      );
      if (response.status === 200) {
        if (successCb) successCb();
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
    <form className="form" onSubmit={handleFormSubmit}>
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
    </form>
  );
};

export default memo(RegisterForm);
