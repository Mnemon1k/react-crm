import useActivePage from "../../../hooks/useActivePage";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, removeUser, setUserInEdit} from "../../../redux/usersSlice";
import {Button, Divider, Input, Popconfirm, Space, Table, Tag} from "antd";
import EditUserContainer from "../../EditUserContainer";
import AddUserContainer from "../../AddUserContainer";
import AppContent from "../../layout/AppContent/AppContent";

const UsersPage = () => {
	const dispatch = useDispatch();
	const {users, isUsersLoading} = useSelector(state => state.users);
	const [search, setSearch] = useState('');
	const [usersFiltered, setUsersFiltered] = useState(users);
	const showModal = (id) => (() => (dispatch(setUserInEdit(id))));
	const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
	const deleteUserConfirm = (id) => dispatch(removeUser(id));
	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			filters: [
				{text: 'Admin', value: 'admin'},
				{text: 'Manager', value: 'manager'},
			],
			onFilter: (value, record) => record.role.includes(value),
			render: (role, user) => {
				return (<Tag key={user.id} color={role === 'admin' ? 'red' : 'green'}>
					{role.toUpperCase()}
				</Tag>);
			}
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: (text, record) => {
				return (<Space size="middle">
					<Button onClick={showModal(record.id)} type="primary">
						Edit
					</Button>
					<Popconfirm placement="right" title='Ary you sure you want to delete?'
								onConfirm={() => deleteUserConfirm(record.id)}
								okText="Yes" cancelText="No">
						<Button danger>
							Remove
						</Button>
					</Popconfirm>
				</Space>)
			},
		},
	];

	useActivePage({
		title: 'Users',
		title_key: '/users'
	});

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		setUsersFiltered(users.filter(item => item.username.toLowerCase().includes(search)))
	}, [search, users]);

	return (
		<AppContent layoutClass={isUsersLoading ? "app-loading" : ""}>
			<Input
				value={search}
				onChange={handleSearch}
				placeholder="Search by name"
			/>
			<Divider/>
			<Table
				loading={isUsersLoading}
				rowKey={'id'}
				columns={columns}
				scroll={{x: 500}}
				footer={() => <AddUserContainer/>}
				dataSource={usersFiltered}
			/>
			<EditUserContainer/>
		</AppContent>
	);
};

export default UsersPage;