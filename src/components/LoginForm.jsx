import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    handleEmailOrPhoneNumberChange,
    handlePasswordChange,
    emailOrPhoneNumber,
    password
}) => {

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <div className="form-group">
                    <label htmlFor="emailOrPhoneNumber">Email or mobile phone number:</label>
                        <input
                            type="text"
                            id="emailOrPhoneNumber"
                            value={emailOrPhoneNumber}
                            name="emailOrPhoneNumber"
                            onChange={handleEmailOrPhoneNumberChange}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            name="Password"
                            onChange={handlePasswordChange}
                        />
                </div>

                <button type="submit">Login</button>
          
                <div className="signup-section">
                    <p>Don't have an account yet?</p>
                      <button
                          type="button"
                          className="signup-button"
                          onClick={() => window.location.href = '/register'}
                      >
                          Sign up
                      </button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  emailOrPhoneNumber: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
