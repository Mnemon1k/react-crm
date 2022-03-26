// Actions
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	title: null,
	type: 'info'
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		loading(state, action) {
			state.type = 'loading';
			state.title = action.payload;
		},
		success(state, action) {
			state.type = 'success';
			state.title = action.payload;
		},
		info(state, action) {
			state.type = 'info';
			state.title = action.payload;
		},
		error(state, action) {
			state.type = 'error';
			state.title = action.payload;
		},
		clearTitle(state, action) {
			state.title = null;
		},
	}
});

export const {loading, info, error, success, clearTitle} = notificationSlice.actions;

export default notificationSlice.reducer;