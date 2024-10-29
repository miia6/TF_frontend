import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth';

const PrivateRoute = ({ children }) => {
    return isUserLoggedIn() ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;

