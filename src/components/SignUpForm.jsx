//import PropTypes from 'prop-types'

const SignUpForm = ({
  handleSignUp,
  handleUsernameChange,
  handleEmailChange,
  handlePhoneNumberChange,
  handlePasswordChange,
  username,
  email,
  phoneNumber,
  password
}) => {

  return (
    <div className="signup-form">
      <form onSubmit={handleSignUp}>
        <h1>Sign up</h1>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleUsernameChange}
            />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={handleEmailChange}
            />
        </div>

        <div className="form-group">
          <label htmlFor="email">Mobile phone number:</label>
            <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                onChange={handlePhoneNumberChange}
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

/*SignUpForm.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePhoneNumberChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}*/

export default SignUpForm
