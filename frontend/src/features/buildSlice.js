import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { url } from './api';

const initialState = {
    token: localStorage.getItem('token'),
    name: '',
    _id: '',
    price: "",
    flavor: "",
    toppings: "",
    description: "",
    imgUrl: "",
    matchId: "",
    createPStatus: '',
    createPError: '',

};

// action creator performing http request to backend 
export const createAProduct = createAsyncThunk(
    'build/createAProduct',
    async (createP, {rejectWithValue}) => {
       try {
        const token = await axios.post(`${url}/products/build`, {
            name: createP.name,
            price: createP.price,
            flavor: createP.flavor,
            toppings:createP.toppings,
            description: createP.description,
            imgUrl: createP.imgUrl,
            matchId: createP.matchId
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

const buildSlice = createSlice({
    name: 'build',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {

        builder.addCase(createAProduct.pending, (state, action) => {
            return { ...state, createPStatus: 'pending'}
        });
        builder.addCase(createAProduct.fulfilled, (state, action) => {
            if (action.payload) {
                const createP = jwtDecode(action.payload)
                return {
                    ...state,
                    // token: action.payload,
                    _id: createP._id,
                    name: createP.name,
                    price: createP.price,
                    flavor: createP.flavor,
                    toppings:createP.toppings,
                    description: createP.description,
                    imgUrl: createP.imgUrl,
                    matchId: createP.matchId,
                    createPStatus: 'success'
                }
            } else return state
        })
        ;
        builder.addCase(createAProduct.rejected, (state, action) => {
            return {
                ...state,
                createPStatus: 'rejected',
                createPError: action.payload,
            }
        });
    }
});

export default buildSlice.reducer;