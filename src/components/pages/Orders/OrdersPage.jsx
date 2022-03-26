import AppContent from "../../layout/AppContent/AppContent";
import {useDispatch, useSelector} from "react-redux";
import useActivePage from "../../../hooks/useActivePage";
import {useEffect, useState} from "react";
import {fetchOrders} from "../../../redux/ordersSlice";
import {fetchProducts} from "../../../redux/productsSlice";
import {fetchUsers} from "../../../redux/usersSlice";
import {Button, Divider, Input, Table} from "antd";
import {Link} from "react-router-dom";
import dateToStr from "../../../utils/dateToStr";

function OrdersPage() {
	const dispatch = useDispatch();
	const {orders, isOrdersLoading} = useSelector(state => state.orders);
	const {products, isProductsLoading} = useSelector(state => state.products);
	const {users, isUsersLoading} = useSelector(state => state.users);
	const [search, setSearch] = useState('');
	const [ordersFiltered, setOrdersFiltered] = useState(orders);
	const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
	const columns = [
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (date) => dateToStr(date)
		},
		{
			title: 'Created by',
			dataIndex: 'createdBy',
			key: 'profile',
			render: (profile, obj) => obj.profile.username
		},
		{
			title: 'Client name',
			dataIndex: 'clientName',
			key: 'clientName'
		},
		{
			title: 'Client surname',
			dataIndex: 'clientSurname',
			key: 'clientSurname'
		},
		{
			title: 'Address',
			dataIndex: 'deliveryAddress',
			key: 'deliveryAddress'
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price) => {
				return price + '$';
			}
		},
		{
			title: 'Comment',
			dataIndex: 'comment',
			key: 'comment'
		},
		{
			title: 'Delivery method',
			dataIndex: 'deliveryType',
			key: 'deliveryType'
		},
		{
			title: '',
			dataIndex: 'actions',
			key: 'actions',
			render: (role, order) => {
				return (
					<Link to={'/order/' + order.id}>
						<Button type={'primary'}>Open</Button>
					</Link>
				);
			}
		}
	];

	useActivePage({
		title: 'Orders',
		title_key: '/orders'
	});

	useEffect(() => {
		setOrdersFiltered(orders.filter(order => {
			return order.clientName.toLowerCase().includes(search)
				|| order.clientSurname.toLowerCase().includes(search)
				|| (order.comment && order.comment.toLowerCase().includes(search));
		}))
	}, [search, orders]);

	useEffect(() => {
		dispatch(fetchOrders());

		if (!products.length) {
			dispatch(fetchProducts());
		}
		if (!users.length) {
			dispatch(fetchUsers());
		}
	}, [products, users, dispatch]);

	return (
		<AppContent layoutClass={isOrdersLoading || isProductsLoading || isUsersLoading ? "app-loading" : ""}>
			<Input
				value={search}
				size={"large"}
				onChange={handleSearch}
				placeholder="Search by client and comment"
			/>
			<Divider/>
			<Table
				loading={isOrdersLoading || isProductsLoading || isUsersLoading}
				rowKey={'id'}
				columns={columns}
				scroll={{x: 500}}
				dataSource={ordersFiltered}
			/>
		</AppContent>
	);
}

export default OrdersPage;