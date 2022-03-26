import useActivePage from "../../../hooks/useActivePage";
import AppContent from "../../layout/AppContent/AppContent";
import React, {useEffect, useState} from "react";
import StatisticService from "../../../service/statisticService";
import {Card, Col, Divider, Row} from "antd";
import ItemsList from "../../ItemsList/ItemsList";
import {error} from "../../../redux/notificationSlice";
import {useDispatch} from "react-redux";
import SpinElement from "../../UI/SpinElement/SpinElement";

const MainPage = () => {
	const dispatch = useDispatch();
	const [statistics, setStatistics] = useState({});
	const [lastProducts, setLastProducts] = useState([]);
	const [loading, setLloading] = useState(true);
	const colParams = {
		xs: 24,
		sm: 24,
		md: 12,
		lg: 12,
		xl: 8,
	};

	const colThirdParams = {
		xs: 24,
		xl: 8,
	};

	useActivePage({
		title: 'Main page',
		title_key: '/'
	});

	useEffect(() => {
		async function asyncFn() {
			const statistics = await StatisticService.getCounts();
			const products = await StatisticService.getLastProducts();

			setStatistics(statistics);
			setLastProducts(products);
			setLloading(false);
		}

		try {
			asyncFn();
		} catch (e) {
			console.error(e)
			dispatch(error('Server error. Can`t get statistic.'));
		}
	}, [dispatch])

	return (
		<AppContent>
			<h1>CRM statistics</h1>
			<Divider/>
			<Row className={'text-center'} gutter={[100, 15]}>
				<Col {...colParams}>
					<Card type="inner" title="Products">
						<h2>{statistics ? statistics.products : '0'}</h2>
					</Card>
				</Col>
				<Col {...colParams}>
					<Card type="inner" title="Users in system">
						<h2>{statistics ? statistics.profiles : '0'}</h2>
					</Card>
				</Col>
				<Col {...colThirdParams}>
					<Card type="inner" title="Orders">
						<h2>{statistics ? statistics.orders : '0'}</h2>
					</Card>
				</Col>
			</Row>
			<Divider/>
			<h3>Newest products ({lastProducts.length})</h3>
			<div>
				{
					loading ?
						<SpinElement/>
						:
						<ItemsList
							hidePagination={true}
							linkPrefix={'/product/'}
							items={lastProducts}
						/>
				}
			</div>
		</AppContent>
	);
};

export default MainPage;