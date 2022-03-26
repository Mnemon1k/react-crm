import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ProductService from "../service/productService";
import {error, loading, success} from "./notificationSlice";

const initialState = {
	products: [],
	productInEdit: null,
	isProductsLoading: false,
	isEditModalVisible: false,
	isAddModalVisible: false,
	isProductUpdating: false,
	isProductAdding: false,
}

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function (notification = true, {dispatch}) {
		try {
			return await ProductService.getProducts();
		} catch (e) {
			console.error(e)
			dispatch(error('Server error. Can`t get products.'));
			throw Error('Server error. Can`t get products.');
		}
	}
)

export const removeProduct = createAsyncThunk(
	'products/removeProduct',
	async function (payload, {dispatch}) {
		try {
			await ProductService.removeProduct(payload);
			dispatch(success('Product deleted'));
			dispatch(fetchProducts());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t remove product.'));
			throw Error('Server error. Can`t remove product.');
		}
	}
)
export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Updating product...'));
			await ProductService.updateProduct(payload);
			dispatch(success('Product updated'));
			dispatch(fetchProducts());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t update product.'));
			throw Error('Server error. Can`t update product.');
		}
	}
)
export const createProduct = createAsyncThunk(
	'products/createProduct',
	async function (payload, {dispatch}) {
		try {
			dispatch(loading('Creating product...'));
			await ProductService.createProduct(payload);
			dispatch(success('Product created'));
			dispatch(fetchProducts());
		} catch (e) {
			console.error(e);
			dispatch(error('Server error. Can`t create product.'));
			throw Error('Server error. Can`t create product.');
		}
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProductInEdit(state, action) {
			if (action.payload === null) {
				state.isEditModalVisible = false;
				state.productInEdit = null;
			} else {
				state.isEditModalVisible = true;
				state.productInEdit = action.payload;
			}
		},
		setIsAddModalVisible(state, action) {
			state.isAddModalVisible = action.payload;
		},
	},
	extraReducers: {
		[fetchProducts.pending]: (state, action) => {
			state.isProductsLoading = true;
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.isProductsLoading = false;
			state.products = action.payload;
		},
		[fetchProducts.rejected]: (state, action) => {
			state.isProductsLoading = false;
		},
		[updateProduct.pending]: (state, action) => {
			state.isProductUpdating = true;
		},
		[updateProduct.fulfilled]: (state, action) => {
			state.isProductUpdating = false;
			state.isEditModalVisible = false;
			state.productInEdit = null;
		},
		[updateProduct.rejected]: (state, action) => {
			state.isProductUpdating = false;
		},
		[createProduct.pending]: (state, action) => {
			state.isProductAdding = true;
		},
		[createProduct.fulfilled]: (state, action) => {
			state.isProductAdding = false;
			state.isAddModalVisible = false;
		},
		[createProduct.rejected]: (state, action) => {
			state.isProductAdding = false;
		}
	}
});

export const {setProductInEdit, setIsAddModalVisible} = productsSlice.actions;

export default productsSlice.reducer;