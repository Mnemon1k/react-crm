import AppContent from "../../layout/AppContent/AppContent";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchProducts, removeProduct, setProductInEdit} from "../../../redux/productsSlice";
import ProductInfo from "../../ProductInfo/ProductInfo";
import SpinElement from "../../UI/SpinElement/SpinElement";
import useActivePage from "../../../hooks/useActivePage";
import {Modal} from "antd";
import EditProductContainer from "../../containers/EditProductContainer/EditProductContainer";

function ProductPage() {
	const dispatch = useDispatch();
	const {id} = useParams();
	const navigate = useNavigate();
	const {products, isProductsLoading, isEditModalVisible} = useSelector(state => state.products);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		if (products.length === 0) {
			dispatch(fetchProducts());
		}
	}, [products, dispatch])

	useActivePage({
		title: 'Product',
		title_key: '/products'
	});

	useEffect(() => {
		if (products.length !== 0) {
			const currentProduct = products.find((product) => product.id === id);
			if (currentProduct) {
				setProduct(currentProduct);
			} else {
				navigate('/products');
			}
		}
	}, [products, navigate, id])

	return (
		<AppContent layoutClass={isProductsLoading ? "app-loading" : ""}>
			{
				product ?
					<ProductInfo
						removeProduct={(id) => (dispatch(removeProduct(id)))}
						editProduct={(id) => (dispatch(setProductInEdit(id)))}
						product={product}/>
					:
					<SpinElement/>
			}
			<Modal
				title={"Update product"}
				visible={isEditModalVisible}
				footer={null}
				onCancel={() => dispatch(setProductInEdit(null))}
			>
				<EditProductContainer/>
			</Modal>
		</AppContent>
	);
}

export default ProductPage;