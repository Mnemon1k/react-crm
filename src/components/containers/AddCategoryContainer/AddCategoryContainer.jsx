import {useDispatch} from "react-redux";
import {createCategory} from "../../../redux/categoriesSlice";
import CategoryForm from "../../forms/CategoryForm/CategoryForm";

function AddCategoryContainer() {
	const dispatch = useDispatch();
	const formSubmit = async (data) => (dispatch(createCategory(data)));
	const getSelector = state => ({
		isLoading: state.categories.isCategoryAdding,
		isVisible: state.categories.isAddModalVisible,
		categories: state.categories.categories,
	});

	return (
		<CategoryForm
			getSelector={getSelector}
			formSubmit={formSubmit}
		/>
	);
}

export default AddCategoryContainer;