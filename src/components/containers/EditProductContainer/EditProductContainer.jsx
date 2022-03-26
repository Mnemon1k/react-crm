import {useDispatch, useSelector} from "react-redux";
import {updateProduct} from "../../../redux/productsSlice";
import ProductForm from "../../forms/ProductForm/ProductForm";

function EditProductContainer() {
	const dispatch = useDispatch();
	const {productInEdit, products} = useSelector(state => state.products);
	const currentProductData = products.filter((item) => (item.id === productInEdit));
	const formSubmit = async (data) => (dispatch(updateProduct(data)));
	const getSelector = state => ({
		isLoading: state.products.isProductUpdating,
		isVisible: state.products.isEditModalVisible,
		categories: state.categories.categories,
	});

	return (
		<ProductForm
			initialData={currentProductData[0]}
			getSelector={getSelector}
			formSubmit={formSubmit}
		/>
	);
}

export default EditProductContainer;