import ProductForm from "../../forms/ProductForm/ProductForm";
import {useDispatch} from "react-redux";
import {createProduct} from "../../../redux/productsSlice";

function AddProductContainer() {
	const dispatch = useDispatch();
	const formSubmit = async (data) => (dispatch(createProduct(data)));
	const getSelector = state => ({
		isLoading: state.products.isProductAdding,
		isVisible: state.products.isAddModalVisible,
		categories: state.categories.categories,
	});

	return (
		<ProductForm
			getSelector={getSelector}
			formSubmit={formSubmit}
		/>
	);
}

export default AddProductContainer;