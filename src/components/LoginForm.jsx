import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
    email,
    password
}) => {

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleEmailChange}
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

/* @binh: I just commented these functions out to make the console log happy when developing.
Please feel free to uncomment them if needed. */
LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    //handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    //handleChange: PropTypes.func.isRequired
}

export default LoginForm
