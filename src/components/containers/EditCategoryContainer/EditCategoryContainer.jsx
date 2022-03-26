import {useDispatch, useSelector} from "react-redux";
import {updateCategory} from "../../../redux/categoriesSlice";
import CategoryForm from "../../forms/CategoryForm/CategoryForm";

function EditCategoryContainer() {
	const dispatch = useDispatch();
	const {categoryInEdit, categories} = useSelector(state => state.categories);
	const currentProductData = categories.filter((item) => (item.id === categoryInEdit));
	const formSubmit = async (data) => (dispatch(updateCategory(data)));
	const getSelector = state => ({
		isLoading: state.categories.isProductUpdating,
		isVisible: state.categories.isEditModalVisible,
		categories: state.categories.categories,
	});

	return (
		<CategoryForm
			initialData={currentProductData[0]}
			getSelector={getSelector}
			formSubmit={formSubmit}
		/>
	);
}

export default EditCategoryContainer;