import {Link, NavLink} from "react-router-dom";
import {
	ApiTwoTone,
	DollarOutlined,
	HomeOutlined,
	QuestionCircleOutlined,
	ShoppingOutlined,
	UserOutlined
} from "@ant-design/icons";
import {Button, Layout, Menu} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './AppSidebar.scss'
import {logout} from "../../../redux/authSlice";

const AppSidebar = () => {
	const [activeMenu, setActiveMenu] = useState(null);
	const {title_key} = useSelector(state => state.app);
	const dispatch = useDispatch();

	useEffect(() => {
		setActiveMenu(title_key);
	}, [title_key])

	const menuClick = (e) => {
		setActiveMenu(e.key);
	}
	const logoutHandler = () => {
		localStorage.removeItem('isAuth');
		localStorage.removeItem('username');
		dispatch(logout());
	}

	return (
		<Layout.Sider
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={broken => {
			}}
			onCollapse={(collapsed, type) => {
			}}
		>
			<div className="app-logo">
				<Link to='/'>
					<ApiTwoTone className={'app-logo-icon'}/>
					CRM
				</Link>
			</div>
			<Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} onSelect={menuClick}>
				<Menu.Item key="/" icon={<HomeOutlined/>}>
					<NavLink to='/'>Main</NavLink>
				</Menu.Item>
				<Menu.Item key="/users" icon={<UserOutlined/>}>
					<NavLink to='/users'>Users</NavLink>
				</Menu.Item>
				<Menu.Item key="/products" icon={<ShoppingOutlined/>}>
					<NavLink to='/products'>Products</NavLink>
				</Menu.Item>
				<Menu.Item key="/categories" icon={<ShoppingOutlined/>}>
					<NavLink to='/categories'>Categories</NavLink>
				</Menu.Item>
				<Menu.Item key="/orders" icon={<DollarOutlined/>}>
					<NavLink to='/orders'>Orders</NavLink>
				</Menu.Item>
				<Menu.Item key="6" icon={<QuestionCircleOutlined/>}>
					<NavLink to='/qwe'>Unknown rout</NavLink>
				</Menu.Item>
				<Menu.Item disabled={true} key="7">
					<Button onClick={logoutHandler} style={{width: '100%'}} type={'primary'}>Logout</Button>
				</Menu.Item>
			</Menu>
		</Layout.Sider>
	);
};

export default AppSidebar;