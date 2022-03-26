import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../service/userService";
import {error, loading, success} from "./notificationSlice";

const initialState = {
	users: [],
	userInEdit: null,
	isUsersLoading: false,
	isEditModalVisible: false,
	isAddModalVisible: false,
	isUsersUpdating: false,
	isUsersAdding: false,
}

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async function (notification, {dispatch}) {
		try {
			return await UserService.getUsers();
		} catch (e) {
			console.error(e)
			dispatch(error('Server error. Can`t get users.'));
			throw Error('Server error. Can`t get users.');
		}
	}
)

export const removeUser = createAsyncThunk(
	'users/removeUser',
	async function (payload, {dispatch}) {
		try {
			// Do not delete admin account
			if (payload === 'cl0vahrrceal50axovjiiv76m') {
				dispatch(error('Can`t remove admin.'));
				return false;
			}

			dispatch(loading('Removing user...'));
			await UserService.removeUser(payload);
			dispatch(success('Removed successfully'));
			dispatch(fetchUsers());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t remove user.'));
			throw Error('Server error. Can`t remove user.');
		}
	}
)
export const updateUser = createAsyncThunk(
	'users/updateUser',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Updating user...'));
			await UserService.updateUser(payload);
			dispatch(success('User updated'));
			dispatch(fetchUsers());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t update user.'));
			throw Error('Server error. Can`t update user.');
		}
	}
)
export const createUser = createAsyncThunk(
	'users/createUser',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Creating user...'));
			await UserService.createUser(payload);
			dispatch(success('User created'));
			dispatch(fetchUsers());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t create user.'));
			throw Error('Server error. Can`t create user.');
		}
	}
)

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserInEdit(state, action) {
			if (action.payload === null) {
				state.isEditModalVisible = false;
				state.userInEdit = null;
			} else {
				state.isEditModalVisible = true;
				state.userInEdit = action.payload;
			}
		},
		setIsAddModalVisible(state, action) {
			state.isAddModalVisible = action.payload;
		},
	},
	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.isUsersLoading = true;
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.isUsersLoading = false;
			state.users = action.payload;
		},
		[fetchUsers.rejected]: (state, action) => {
			state.isUsersLoading = false;
		},
		[updateUser.pending]: (state, action) => {
			state.isUsersUpdating = true;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.isUsersUpdating = false;
			state.isEditModalVisible = false;
			state.userInEdit = null;
		},
		[updateUser.rejected]: (state, action) => {
			state.isUsersUpdating = false;
		},
		[createUser.pending]: (state, action) => {
			state.isUsersAdding = true;
		},
		[createUser.fulfilled]: (state, action) => {
			state.isUsersAdding = false;
			state.isAddModalVisible = false;
		},
		[createUser.rejected]: (state, action) => {
			state.isUsersAdding = false;
		}
	}
});

export const {setUserInEdit, setIsAddModalVisible} = usersSlice.actions;

export default usersSlice.reducer;