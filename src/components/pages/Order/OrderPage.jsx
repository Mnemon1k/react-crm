import AppContent from "../../layout/AppContent/AppContent";
import useActivePage from "../../../hooks/useActivePage";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {fetchOrders} from "../../../redux/ordersSlice";
import OrderInfo from "../../OrderInfo/OrderInfo";
import SpinElement from "../../UI/SpinElement/SpinElement";
import {error} from "../../../redux/notificationSlice";

function OrderPage() {
	const dispatch = useDispatch();
	const {id} = useParams();
	const navigate = useNavigate();
	const {orders, isOrdersLoading} = useSelector(state => state.orders);
	const [order, setOrder] = useState(null);

	useActivePage({
		title: 'Order',
		title_key: '/orders'
	});

	useEffect(() => {
		if (orders.length === 0) {
			dispatch(fetchOrders());
		}
	}, [orders, dispatch])

	useEffect(() => {
		if (orders.length !== 0) {
			const currentOrder = orders.find((order) => order.id === id);
			if (currentOrder) {
				setOrder(currentOrder);
			} else {
				dispatch(error('Order not found!'));
				navigate('/orders');
			}
		}
	}, [orders, dispatch, navigate, id])

	return (
		<AppContent layoutClass={isOrdersLoading ? "app-loading" : ""}>
			{
				!isOrdersLoading && order ?
					<OrderInfo order={order}/>
					:
					<SpinElement/>
			}
		</AppContent>
	);
}

export default OrderPage;