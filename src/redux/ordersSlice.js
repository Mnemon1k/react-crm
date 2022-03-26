import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import OrderService from "../service/orderService";
import {error, loading, success} from "./notificationSlice";

const initialState = {
	orders: [],
	isOrdersLoading: false,
	isOrderAdding: false,
}

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async function (notification = true, {dispatch}) {
		try {
			return await OrderService.getOrders();
		} catch (e) {
			console.error(e)
			dispatch(error('Server error. Can`t get orders.'));
			throw Error('Server error. Can`t get orders.');
		}
	}
)

export const removeOrder = createAsyncThunk(
	'orders/removeOrder',
	async function (payload, {dispatch}) {
		try {
			await OrderService.removeOrder(payload);
			dispatch(success('Order deleted'));
			dispatch(fetchOrders());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t remove order.'));
			throw Error('Server error. Can`t remove order.');
		}
	}
)

export const createOrder = createAsyncThunk(
	'orders/createOrder',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Creating order...'));
			await OrderService.createOrder(payload);
			dispatch(success('Order created'));
			dispatch(fetchOrders());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t create order.'));
			throw Error('Server error. Can`t create order.');
		}
	}
)

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setIsAddModalVisible(state, action) {

		},
	},
	extraReducers: {
		[fetchOrders.pending]: (state, action) => {
			state.isOrdersLoading = true;
		},
		[fetchOrders.fulfilled]: (state, action) => {
			state.isOrdersLoading = false;
			state.orders = action.payload;
		},
		[fetchOrders.rejected]: (state, action) => {
			state.isOrdersLoading = false;
		},
		[createOrder.pending]: (state, action) => {
			state.isOrderAdding = true;
		},
		[createOrder.fulfilled]: (state, action) => {
			state.isOrderAdding = false;
		},
		[createOrder.rejected]: (state, action) => {
			state.isOrderAdding = false;
		}
	}
});

export const {setIsAddModalVisible} = ordersSlice.actions;

export default ordersSlice.reducer;