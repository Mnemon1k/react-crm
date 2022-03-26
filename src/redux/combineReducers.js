import {configureStore} from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import usersSlice from "./usersSlice";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";
import productsSlice from "./productsSlice";
import categoriesSlice from "./categoriesSlice";
import ordersSlice from "./ordersSlice";

export default configureStore({
	reducer: {
		app: appSlice,
		auth: authSlice,
		users: usersSlice,
		categories: categoriesSlice,
		products: productsSlice,
		orders: ordersSlice,
		notification: notificationSlice,
	}
});