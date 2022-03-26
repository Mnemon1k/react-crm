import './scss/App.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setInitialLoading, setIsAuth} from "./redux/authSlice";
import {useLocation} from "react-router";
import LoginPage from "./components/pages/Login/LoginPage";
import MainPage from "./components/pages/Main/MainPage";
import Page404 from "./components/pages/Page404/Page404";
import UsersPage from "./components/pages/Users/UsersPage";
import ProductsPage from "./components/pages/Products/ProductsPage";
import ProductPage from "./components/pages/Product/ProductPage";
import CategoriesPage from "./components/pages/Categories/CategoriesPage";
import OrdersPage from "./components/pages/Orders/OrdersPage";
import OrderPage from "./components/pages/Order/OrderPage";


function App() {
	const {isAuth, initialLoading} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();


	/**
	 * In real project here we need to make some auth token check or something like this.
	 * */
	useEffect(() => {
		dispatch(setInitialLoading());

		if (localStorage.getItem('isAuth')) {
			dispatch(setIsAuth(localStorage.getItem('username')));
		}
	}, [dispatch]);

	if (initialLoading) {
		// TODO: Add app loader
		return 'Loading...';
	}

	return (
		!isAuth ? (
			<Routes>
				<Route exact path='/login' element={<LoginPage/>}/>
				<Route path="*" element={<Navigate state={{from: location.pathname}} to="/login"/>}/>
			</Routes>
		) : (
			<Routes>
				<Route exact path='/' element={<MainPage/>}/>
				<Route exact path='/users' element={<UsersPage/>}/>
				<Route exact path='/products' element={<ProductsPage/>}/>
				<Route exact path='/products/category/:categoryId' element={<ProductsPage/>}/>
				<Route exact path='/product/:id' element={<ProductPage/>}/>
				<Route exact path='/categories' element={<CategoriesPage/>}/>
				<Route exact path='/orders' element={<OrdersPage/>}/>
				<Route exact path='/order/:id' element={<OrderPage/>}/>
				<Route exact path='/404' element={<Page404/>}/>
				<Route exact path='/login' element={<Navigate to="/"/>}/>
				<Route exact path='*' element={<Navigate state={{from: location.pathname}} to="/404"/>}/>
			</Routes>
		)
	)
}

export default App;