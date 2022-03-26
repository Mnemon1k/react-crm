import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {error, loading, success} from "./notificationSlice";
import CategoryService from "../service/categoryService";

const initialState = {
	categories: [],
	categoryInEdit: null,
	openedCategory: undefined,
	isCategoriesLoading: false,
	isEditModalVisible: false,
	isAddModalVisible: false,
	isCategoryUpdating: false,
	isCategoryAdding: false,
}

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async function (notification = true, {dispatch}) {
		try {
			return await CategoryService.getCategories();
		} catch (e) {
			console.error(e)
			dispatch(error('Server error. Can`t get categories.'));
			throw Error('Server error. Can`t get categories.');
		}
	}
)

export const removeCategory = createAsyncThunk(
	'categories/removeCategory',
	async function (payload, {dispatch}) {
		try {
			await CategoryService.removeCategory(payload);
			dispatch(success('Category deleted'));
			dispatch(fetchCategories());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t remove category.'));
			throw Error('Server error. Can`t remove category.');
		}
	}
)
export const updateCategory = createAsyncThunk(
	'categories/updateCategory',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Updating category...'));
			await CategoryService.updateCategory(payload);
			dispatch(success('Category updated'));
			dispatch(fetchCategories());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t update category.'));
			throw Error('Server error. Can`t update category.');
		}
	}
)
export const createCategory = createAsyncThunk(
	'categories/createCategory',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Creating category...'));
			await CategoryService.createCategory(payload);
			dispatch(success('Category created'));
			dispatch(fetchCategories());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t create category.'));
			throw Error('Server error. Can`t create category.');
		}
	}
)

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategoryInEdit(state, action) {
			if (action.payload === null) {
				state.isEditModalVisible = false;
				state.categoryInEdit = null;
			} else {
				state.isEditModalVisible = true;
				state.categoryInEdit = action.payload;
			}
		},
		setIsAddModalVisible(state, action) {
			state.isAddModalVisible = action.payload;
		},
		setOpenedCategory(state, action) {
			state.openedCategory = action.payload;
		},
	},
	extraReducers: {
		[fetchCategories.pending]: (state, action) => {
			state.isCategoriesLoading = true;
		},
		[fetchCategories.fulfilled]: (state, action) => {
			state.isCategoriesLoading = false;
			state.categories = action.payload;
		},
		[fetchCategories.rejected]: (state, action) => {
			state.isCategoriesLoading = false;
		},
		[updateCategory.pending]: (state, action) => {
			state.isCategoryUpdating = true;
		},
		[updateCategory.fulfilled]: (state, action) => {
			state.isCategoryUpdating = false;
			state.isEditModalVisible = false;
			state.categoryInEdit = null;
		},
		[updateCategory.rejected]: (state, action) => {
			state.isCategoryUpdating = false;
		},
		[createCategory.pending]: (state, action) => {
			state.isCategoryAdding = true;
		},
		[createCategory.fulfilled]: (state, action) => {
			state.isCategoryAdding = false;
			state.isAddModalVisible = false;
		},
		[createCategory.rejected]: (state, action) => {
			state.isCategoryAdding = false;
		}
	}
});

export const {setOpenedCategory, setCategoryInEdit, setIsAddModalVisible} = categoriesSlice.actions;

export default categoriesSlice.reducer;