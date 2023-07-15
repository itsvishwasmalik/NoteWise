import PropTypes from 'prop-types';
import {createContext} from 'react';
import {handleLogin, handleLogout} from '../store/account';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.account);

  axios.defaults.baseURL = 'http://localhost:5000/';

  console.log(state);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error?.response?.status) {
        dispatch(handleLogout());
      }
      return error;
    },
  );

  if ('user' in state && state.user && 'token' in state.user) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + state.user.token;
  }

  const login = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post('/api/users/login/', {
        email,
        password,
      });
      const {data} = response;
      if (response.status === 200) {
        dispatch(
          handleLogin({
            user: {
              id: data._id,
              name: data.name,
              email: data.email,
              isAdmin: data.isAdmin,
              token: data.token,
            },
          }),
        );
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const logout = () => {
    dispatch(handleLogout());
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post('/api/users/register/', {
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
      });
      const responseData = response.data;
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = () => {};
  const resetPassword = () => {};
  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
