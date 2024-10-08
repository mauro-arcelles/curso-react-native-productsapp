import { Usuario } from '../interfaces/appInterface';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | { type: 'signUp', payload: { token: string, user: Usuario } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        token: null,
        status: 'not-authenticated',
        errorMessage: action.payload
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: ''
      };
    case 'signUp':
      return {
        ...state,
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
        errorMessage: ''
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null
      };
    default:
      return state;
  }
};
