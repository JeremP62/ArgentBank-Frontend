import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    setCredentials: (state, action) => {
      state.user = action.payload;
      
      // Récupérer le userName personnalisé s'il existe
      const customUserName = localStorage.getItem('customUserName');
      if (customUserName) {
        state.user.userName = customUserName;
      }
    },
    updateUsername: (state, action) => {
      console.log("🔴 REDUCER updateUsername appelé avec:", action.payload);
      if (state.user) {
        state.user.userName = action.payload;
        // Sauvegarder dans localStorage
        localStorage.setItem('customUserName', action.payload);
        console.log("🔴 Nouveau state.user.userName:", state.user.userName);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('customUserName');
    },
  },
});

export const { loginSuccess, setCredentials, updateUsername, logout } = authSlice.actions;

export default authSlice.reducer;