import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import AddCategoryContainer from "../../containers/AddCategoryContainer/AddCategoryContainer";
import {setIsAddModalVisible} from "../../../redux/categoriesSlice";

function CreateCategoryModal() {
	const dispatch = useDispatch();
	const {isAddModalVisible} = useSelector(state => state.categories);
	const hideModal = () => dispatch(setIsAddModalVisible(false));

	return (
		<Modal
			title={"Create category"}
			visible={isAddModalVisible}
			footer={null}
			onCancel={hideModal}
		>
			<AddCategoryContainer/>
		</Modal>
	);
}

export default CreateCategoryModal;