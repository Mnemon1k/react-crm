import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setUserInEdit, updateUser} from "../redux/usersSlice";
import UserForm from "./UserForm";

function EditUserContainer() {
	const dispatch = useDispatch();
	const {userInEdit, users, isEditModalVisible} = useSelector(state => state.users);
	const currentUserData = users.filter((item) => (item.id === userInEdit));
	const getSelector = state => ({
		isLoading: state.users.isUsersUpdating,
		isVisible: state.users.isEditModalVisible,
	});

	const formSubmit = (data) => dispatch(updateUser({...data, id: userInEdit}));
	const handleCancel = () => dispatch(setUserInEdit(null));

	return (
		<Modal
			title={"Edit user"}
			visible={isEditModalVisible}
			footer={null}
			onCancel={handleCancel}
		>
			<UserForm
				initialData={currentUserData}
				getSelector={getSelector}
				formSubmit={formSubmit}
			/>
		</Modal>
	);
}

export default EditUserContainer;