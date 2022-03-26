import {setProductInEdit} from "../../../redux/productsSlice";
import EditProductContainer from "../../containers/EditProductContainer/EditProductContainer";
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";

function UpdateProductModal() {
	const dispatch = useDispatch();
	const {isEditModalVisible} = useSelector(state => state.products);

	return (
		<Modal
			title={"Update product"}
			visible={isEditModalVisible}
			footer={null}
			onCancel={() => dispatch(setProductInEdit(null))}
		>
			<EditProductContainer/>
		</Modal>
	);
}

export default UpdateProductModal;