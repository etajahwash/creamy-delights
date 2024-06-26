import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
const backendAuthAPI = process.env.REACT_APP_API_URL;


const initialState = {
    token: localStorage.getItem('token'),
    name: '',
    email: '',
    _id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false,
};

// action creator performing http request to backend 
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user, {rejectWithValue}) => {
       try {
        const token = await axios.post(`${backendAuthAPI}/register`, {
            name: user.name,
            email: user.email,
            password: user.password,
        });
        // data stored in localstorage so it doesn't disappear on refresh 
        localStorage.setItem('token', token.data)

        return token.data

       } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
       } 
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user, {rejectWithValue}) => {
       try {
        const token = await axios.post(`${backendAuthAPI}/login`, {
            email: user.email,
            password: user.password,
        });
        // data stored in localstorage so it doesn't disappear on refresh 
        localStorage.setItem('token', token.data)

        return token.data

       } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
       } 
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token
            if(token) {
                const user = jwtDecode(token)
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true
                }
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem('token')
            return {
                ...state,
                token: '',
                name: '',
                email: '',
                _id: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false,
            
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: 'pending'}
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerStatus: 'success'
                }
            } else return state
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: 'rejected',
                registerError: action.payload,
            }
        });

        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: 'pending'}
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: 'success'
                }
            } else return state
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: 'rejected',
                loginError: action.payload,
            }
        });
    }
});

export const { loadUser, logoutUser } = authSlice.actions

export default authSlice.reducer;