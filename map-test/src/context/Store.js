import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

const initialState = {
    darkMode: false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
    },
    apt_track_User: Cookies.get('apt_track_User') ? JSON.parse(Cookies.get('apt_track_User')) : null,
    search_query: '',
    walking_road_coords: null,
    bus_route_coords: null,
    selected_road_id: ''
}

export const Store = createContext();

function reducer(state={search_category:''}, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id)
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        case 'CHANGE_CURRENCY':
            Cookies.set('trolliey_currency', action.payload)
            return {...state, currency: action.payload}
        case 'REMOVE_FROM_CART':
            const NewcartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id)
            Cookies.set('cartItems', JSON.stringify(NewcartItems))
            return { ...state, cart: { ...state.cart, NewcartItems } }
        case 'CLEAR_CART':
            return {...state, cart: {cartItems: []}}
        case 'USER_LOGIN':
            return { ...state, apt_track_User: action.payload }
        case 'USER_LOGOUT':
            return { ...state, apt_track_User: null, cart: { cartItems: [] } }
        case 'SET_SEARCH_QUERY':
            return { ...state, search_query: action.payload }
        case 'SET_SEARCH_CATEGORY':
            return { ...state, search_category: action.payload }
        case 'SET_SORT_VALUE':
            return { ...state, sort_value: action.payload }
        case 'SET_SORT_ORDER':
            return { ...state, sort_order: action.payload }
        case 'SET_POLL_URL':
            return {...state, poll_url: action.payload}
        case 'SET_COORDS':
            return {...state, walking_road_coords: action.payload}
        case 'SET_BUS_ROUTE':
            return {...state, bus_route_coords: action.payload}
        case 'SET_SELECTED_ROAD_ID':
            return {...state, selected_road_id: action.payload}
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}