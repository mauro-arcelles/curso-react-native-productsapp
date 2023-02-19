import React, { createContext, useEffect, useReducer } from 'react';
import { LoginDto, LoginResponse, RegisterDto, Usuario } from '../interfaces/appInterface';
import { authReducer, AuthState } from './authReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signIn: (obj: LoginDto) => void;
  signUp: (obj: RegisterDto) => void;
  logOut: () => void;
  removeError: () => void;
}

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();

  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return dispatch({ type: 'notAuthenticated' });
    }

    try {
      const resp = await cafeApi.get<LoginResponse>('/auth/');

      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario
        }
      });

    } catch (error) {
      console.log(error);
      dispatch({ type: 'notAuthenticated' });
    }

  };

  const signIn = async ({ correo, password }: LoginDto) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario
        }
      });

      await AsyncStorage.setItem('token', resp.data.token);

    } catch (error) {
      console.log(error);
      dispatch({
        type: 'addError',
        payload: (error as any).response.data.msg || 'Información incorrecta'
      });
    }

  };
  const signUp = async (obj: RegisterDto) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/usuarios', obj);

      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario
        }
      });

      await AsyncStorage.setItem('token', resp.data.token);

    } catch (error) {
      console.log((error as any).response.data);
      dispatch({
        type: 'addError',
        payload: (error as any).response?.data?.errors[0]?.msg || 'Información incorrecta'
      });
    }

  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({
      type: 'logout'
    });

  };
  const removeError = () => {
    dispatch({
      type: 'removeError'
    });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      logOut,
      removeError
    }}>
      {children}
    </AuthContext.Provider>
  );
};
