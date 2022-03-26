import {Button, Modal} from "antd";
import UserForm from "./UserForm";
import {useDispatch, useSelector} from "react-redux";
import {createUser, setIsAddModalVisible} from "../redux/usersSlice";

function AddUserContainer() {
	const dispatch = useDispatch();
	const showModal = () => dispatch(setIsAddModalVisible(true));
	const hideModal = () => dispatch(setIsAddModalVisible(false));
	const {isAddModalVisible} = useSelector(state => state.users);

	const getSelector = state => ({
		isLoading: state.users.isUsersAdding,
		isVisible: state.users.isAddModalVisible,
	});

	const createUserSubmit = async (data) => (dispatch(createUser(data)));

	return (
		<>
			<Button
				onClick={showModal}
				type={"primary"}
			>
				Create user
			</Button>
			<Modal
				title={"Create user"}
				visible={isAddModalVisible}
				footer={null}
				onCancel={hideModal}
			>
				<UserForm
					getSelector={getSelector}
					formSubmit={createUserSubmit}
				/>
			</Modal>
		</>
	);
}

export default AddUserContainer;