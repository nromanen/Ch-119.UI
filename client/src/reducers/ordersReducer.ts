const defaultState = {
    orders: [],
};

export const SET_ORDERS = 'SET_ORDERS';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export default function ordersReducer(state = defaultState, action: any) {
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.payload };
    }
    return state;
}

export const setOrders = (payload: any) => ({ type: SET_ORDERS, payload });
export const fetchOrders = () => ({ type: FETCH_ORDERS });
