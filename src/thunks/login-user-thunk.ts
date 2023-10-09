import { batch } from 'react-redux';
import { authUser } from '../api/api';
import {
  onLogin, closeModal, isLoadingOn, isLoadingOff,
  clearAuthErr, setEmailAuthErr, setPasswordAuthErr,
  setGeneralAuthErr, 

} from '../store';
import { AppThunk } from '../types/store.types';
/* eslint-disable @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-argument */

type TUserSignIn = {
  id: number;
  username: string;
  profile_photo: string;
  role: string;
};

const loginUserThunk : AppThunk = (data) => async (dispatch) => {
  const authErrors = (errors) => {
    if ('password' in errors) {
      dispatch(setPasswordAuthErr(errors.password[0]));
    } else if ('email' in errors) {
      dispatch(setEmailAuthErr(errors.email));
    } else {
      dispatch(setGeneralAuthErr('Ошибка авторизации'));
    }
  };

  try {
    dispatch(clearAuthErr());
    dispatch(isLoadingOn());

    const res: TUserSignIn = await authUser(data);

    batch(() => {
      dispatch(onLogin());
      dispatch(closeModal());
    });

    localStorage.setItem('userId', res.id.toString());
  } catch (error:any) {
    // eslint-disable-next-line
   authErrors(error)
  } finally {
    dispatch(isLoadingOff());
  }
};
export default loginUserThunk;