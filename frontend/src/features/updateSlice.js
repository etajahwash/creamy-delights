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
    updatePStatus: '',
    updatePError: '',

};

// action creator performing http request to backend 
export const updateAProduct = createAsyncThunk(
    'update/updateAProduct',
    async (updateP, {rejectWithValue}) => {
       try {
        const token = await axios.put(`${url}/products/update/:id`, {
            name: updateP.name,
            price: updateP.price,
            flavor: updateP.flavor,
            toppings:updateP.toppings,
            description: updateP.description,
            imgUrl: updateP.imgUrl,
            matchId: updateP.matchId
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

const updateSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {

        builder.addCase(updateAProduct.pending, (state, action) => {
            return { ...state, updatePStatus: 'pending'}
        });
        builder.addCase(updateAProduct.fulfilled, (state, action) => {
            if (action.payload) {
                const updateP = jwtDecode(action.payload)
                return {
                    ...state,
                    _id: updateP._id,
                    name: updateP.name,
                    price: updateP.price,
                    flavor: updateP.flavor,
                    toppings:updateP.toppings,
                    description: updateP.description,
                    imgUrl: updateP.imgUrl,
                    matchId: updateP.matchId,
                    updatePStatus: 'success'
                }
            } else return state
        })
        ;
        builder.addCase(updateAProduct.rejected, (state, action) => {
            return {
                ...state,
                updatePStatus: 'rejected',
                updatePError: action.payload,
            }
        });
    }
});

export default updateSlice.reducer;