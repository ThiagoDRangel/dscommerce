import React, { useContext, useState } from 'react';
import * as authService from '../../../services/auth-service';
import * as forms from '../../../utils/forms';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';
import IFormData from '../../../interfaces/IFormData';
import FormInput from '../../../components/FormInput';
import './styles.css';

function Login() {

  const [submitResponseFail, setSubmitResponseFail] = useState(false);
  const { setContextTokenPayload } = useContext(ContextToken);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
    }
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitResponseFail(false);

    const formDataValidated = forms.dirtyAndValidateAll(formData);
    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    authService.loginRequest(forms.toValues(formData))
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/cart");
      })
      .catch(() => {
        setSubmitResponseFail(true);
      });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const result = forms.updateAndValidate(formData, name, value);
    setFormData(result);
  }

  function handleTurnDirty(name: string) {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  { ...formData.username}
                  className="dsc-form-control"
                  onChange={handleInputChange}
                  onTurnDirty={handleTurnDirty}
                />
                <div className="dsc-form-error">{formData.username.message}</div>
              </div>
              <div>
                <FormInput
                  { ...formData.password}
                  className="dsc-form-control"
                  onChange={handleInputChange}
                  onTurnDirty={handleTurnDirty}
                />
              </div>
            </div>
            {
              submitResponseFail &&
              <div className="dsc-form-global-error">
                Usuário ou senha inválidos
              </div>
            }

            <div className="dsc-login-form-buttons dsc-mt20">
              <button
                type="submit"
                className="dsc-btn dsc-btn-blue"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
