import PropTypes from 'prop-types'

const SignUpForm = ({
  handleSignUp,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  username,
  email,
  password,
  errors
}) => {

  return (
    <div className="signup-form">
      <form onSubmit={handleSignUp}>
        <h1>Sign up</h1>

        <div className="form-group">
          <label htmlFor="username"> <span className="required">*</span> Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleUsernameChange}
            className={`user-username ${errors.username ? 'error' : ''}`}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email"> <span className="required">*</span> Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleEmailChange}
            className={`user-email ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password"> <span className="required">*</span> Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            className={`user-password ${errors.password ? 'error' : ''}`}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit">Sign up</button>

        <div className="login-section">
          <p>Already have an account?</p>
          <button
            type="button"
            className="login-button"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.object,
}

export default SignUpForm