import  { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [],
    nums: 1,
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += state.nums
                toast(`🍦 ${state.cartItems[itemIndex].name} quantity increased`, {
                   position: 'bottom-left',
                   theme: 'light',
                   autoClose: 3500
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: state.nums};
                state.cartItems.push(tempProduct);
                toast(`🍦 ${action.payload.name} added to cart`, {
                    position: 'bottom-left',
                    theme: 'light',
                    autoClose: 3500
                 })               
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.error(`${action.payload.name} removed from cart`, {
                position: 'bottom-left',
                theme: 'light',
                autoClose: 3500
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );
            if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast(`🍦 ${action.payload.name} quantity decreased`, {
                   position: 'bottom-left',
                   theme: 'light',
                   autoClose: 3500
                })
            } else if(state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
                );
    
                state.cartItems = nextCartItems;
                toast(`🍦 ${action.payload.name} removed from cart`, {
                    position: 'bottom-left',
                    theme: 'light',
                    autoClose: 3500
                 })               
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart(state, action) {
            state.cartItems = []
            toast.error(`Cart Cleared`, {
                position: 'bottom-left',
                theme: 'light',
                autoClose: 3500
             })               
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            }, {
                total: 0,
                quantity: 0
            });

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        increaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );
            if(state.cartItems[itemIndex].cartQuantity >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast(`🍦 ${action.payload.name} quantity increased`, {
                   position: 'bottom-left',
                   theme: 'light',
                   autoClose: 3500
                })            
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        numIncrease(state, action) {
            if(state.nums >= 1) {
                state.nums += 1;
                toast(`quantity increased`, {
                   position: 'bottom-left',
                   theme: 'light',
                   autoClose: 3500
                })            
            }
        },
        numDecrease(state, action) {
            if(state.nums >= 2) {
                state.nums -= 1;
                toast(`quantity decreased`, {
                   position: 'bottom-left',
                   theme: 'light',
                   autoClose: 3500
                })            
            }
        }
    }
})

export const { addToCart, removeFromCart, decreaseCart, increaseCart, numIncrease, numDecrease, cartQuantity, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer