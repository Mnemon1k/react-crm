// Actions
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	title: '',
	title_key: null,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setActivePage(state, action) {
			state.title = action.payload.title;
			state.title_key = action.payload.title_key;
		}
	}
});

export const {setActivePage} = appSlice.actions;

export default appSlice.reducer;