import AddProductContainer from "../../containers/AddProductContainer/AddProductContainer";
import {Modal} from "antd";
import {setIsAddModalVisible} from "../../../redux/productsSlice";
import {useDispatch, useSelector} from "react-redux";

function CreateProductModal() {
	const dispatch = useDispatch();
	const hideModal = () => dispatch(setIsAddModalVisible(false));
	const {isAddModalVisible} = useSelector(state => state.products);

	return (
		<Modal
			title={"Create product"}
			visible={isAddModalVisible}
			footer={null}
			onCancel={hideModal}
		>
			<AddProductContainer/>
		</Modal>
	);
}

export default CreateProductModal;