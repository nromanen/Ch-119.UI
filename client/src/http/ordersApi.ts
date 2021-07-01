import axios from 'axios';

export const fetchOrders = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}order`, {
        params: {
            'status': 'active',
        },
    });
    return data.data.rows;
};
