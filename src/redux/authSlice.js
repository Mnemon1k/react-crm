import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {error} from "./notificationSlice";
import AuthService from "../service/authService";

const initialState = {
	isAuth: false,
	isCheckingCredentials: false,
	username: null,
	authError: null,
	initialLoading: true,
}

export const checkCredentials = createAsyncThunk(
	'auth/checkCredentials',
	async function (data, {rejectWithValue, dispatch}) {
		try {
			const authStatus = await AuthService.checkCredentials(data);
			if (authStatus) {
				dispatch(setIsAuth(data.username));
				localStorage.setItem('isAuth', true);
				localStorage.setItem('username', data.username);
			} else {
				return rejectWithValue('Login data is not correct, please try again.');
			}
			return false;
		} catch (e) {
			dispatch(error('Server error. Can`t login.'));
			throw Error('Server error. Can`t login.');
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth(state, action) {
			state.isAuth = true;
			state.username = action.payload;
			state.authError = null;
		},
		logout(state, action) {
			state.isAuth = false;
			state.username = null;
		},
		setInitialLoading(state, action) {
			state.initialLoading = false;
		}
	},
	extraReducers: {
		[checkCredentials.pending]: (state, action) => {
			state.isCheckingCredentials = true;
		},
		[checkCredentials.fulfilled]: (state, action) => {
			state.isCheckingCredentials = false;
		},
		[checkCredentials.rejected]: (state, action) => {
			state.isCheckingCredentials = false;
			state.authError = action.payload;
		}
	}
});

export const {setIsAuth, setInitialLoading, logout} = authSlice.actions;

export default authSlice.reducer;