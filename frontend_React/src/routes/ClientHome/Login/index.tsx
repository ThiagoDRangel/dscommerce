import React, { useState } from 'react';
import { CredentialsDTO } from '../../../models/auth';
import * as authService from '../../../services/auth-service';
import './styles.css';

function Login() {

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: '',
    password: ''
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    authService.loginRequest(formData)
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.log('Erro no login', error);
      });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  className="dsc-form-control"
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  value={formData.username}
                  placeholder="Email"
                />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  className="dsc-form-control"
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  value={formData.password}
                  placeholder="Senha"
                  />
              </div>
            </div>

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
