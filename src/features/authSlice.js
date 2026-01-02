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
  const userFromApi = action.payload;
  
  const userId = userFromApi.id || userFromApi._id;
  const savedPseudo = localStorage.getItem(`pseudo_${userId}`);
  
  // On fusionne pour ne rien perdre
  state.user = { 
    ...userFromApi, 
    userName: savedPseudo || userFromApi.userName || userFromApi.firstName 
  };
},

    updateUsername: (state, action) => {
      if (state.user) {
        const newPseudo = action.payload;
        state.user.userName = newPseudo;
        
        
        localStorage.setItem(`pseudo_${state.user.id}`, newPseudo);
        
        
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