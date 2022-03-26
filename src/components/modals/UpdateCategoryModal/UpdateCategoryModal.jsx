import {setCategoryInEdit} from "../../../redux/categoriesSlice";
import EditCategoryContainer from "../../containers/EditCategoryContainer/EditCategoryContainer";
import {Modal} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

function UpdateCategoryModal() {
	const dispatch = useDispatch();
	const {isEditModalVisible} = useSelector(state => state.categories);

	return (
		<Modal
			title={"Update category"}
			visible={isEditModalVisible}
			footer={null}
			onCancel={() => dispatch(setCategoryInEdit(null))}
		>
			<EditCategoryContainer/>
		</Modal>
	);
}

export default UpdateCategoryModal;