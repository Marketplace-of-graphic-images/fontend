import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from 'types/types';

type TSystemState = {
  isLoggedIn: boolean,
  userRole: Role,
  isLoading: boolean,
  imageSearchField: string
  isLocalLoading,
};

const initialState: TSystemState = {
  isLoggedIn: false,
  userRole: 'User' as Role,
  isLoading: true,
  imageSearchField: '',
  isLocalLoading: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setImageSearchField: (
      state: TSystemState,
      action: PayloadAction<string>,
    ) => ({ ...state, imageSearchField: action.payload }),
    clearSearchField: (
      state: TSystemState,
    ) => ({ ...state, imageSearchField: '' }),
    isLoadingOn: (state:TSystemState) => ({ ...state, isLoading: true }),
    isLoadingOff: (state:TSystemState) => ({ ...state, isLoading: false }),
    onLogin: (state: TSystemState) => ({ ...state, isLoggedIn: true }),
    onLogout: (state: TSystemState) => ({ ...state, isLoggedIn: false }),
    isLocalLoadingOn: (state:TSystemState) => ({ ...state, isLocalLoading: true }),
    isLocalLoadingOff: (state:TSystemState) => ({ ...state, isLocalLoading: false }),
    // временная логика
    setUserRole: (state: TSystemState) => ({ ...state, userRole: 'User' as Role }),
    setAuthorRole: (state: TSystemState) => ({ ...state, userRole: 'Author' as Role }),
  },
});

const systemReducer = systemSlice.reducer;
export const {
  onLogin,
  isLoadingOn,
  isLoadingOff,
  onLogout,
  setUserRole,
  setAuthorRole,
  setImageSearchField,
  clearSearchField,
  isLocalLoadingOn,
  isLocalLoadingOff,
} = systemSlice.actions;
export default systemReducer;
