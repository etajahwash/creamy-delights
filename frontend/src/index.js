import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/productsApi'
import { productIdApi } from './features/productIdApi';
import cartReducer, { getTotals } from './features/cartSlice';
import './styling/Index.css'
import './styling/App.css'
import 'bootstrap/dist/css/bootstrap.css';
import authReducer, { loadUser } from './features/authSlice';
import buildReducer from './features/buildSlice';
import updateReducer from './features/updateSlice';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
// // require("dotenv").config();
// const express = require('express');
// const path = require('path');
// const app = express();
// let NODE_ENV=development

if (process.env.NODE_ENV === 'production') disableReactDevTools()

//   app.use(express.static('frontend/build'));
//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
// }

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [productIdApi.reducerPath]: productIdApi.reducer,
        cart: cartReducer,
        auth: authReducer,
        build: buildReducer,
        update: updateReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(productsApi.middleware).concat(productIdApi.middleware)
    }
  });

  store.dispatch(getTotals());
  store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
