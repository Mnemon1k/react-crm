import FilterPanel from "../FilterPanel/FilterPanel";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setIsAddModalVisible} from "../../redux/productsSlice";

function ProductFilterPanel({setSearch}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {categories} = useSelector(state => state.categories);
	const showModal = () => dispatch(setIsAddModalVisible(true));

	const setCategoryFilter = (id) => {
		if (id) {
			navigate('/products/category/' + id);
		} else {
			navigate('/products');
		}
	}

	return (
		<FilterPanel
			btnText={'Create product'}
			setCategoryFilter={setCategoryFilter}
			categories={categories}
			setSearch={setSearch}
			createItemHandler={showModal}
		/>
	);
}

export default ProductFilterPanel;