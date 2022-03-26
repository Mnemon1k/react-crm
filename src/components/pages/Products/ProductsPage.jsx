import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, removeProduct, setProductInEdit} from "../../../redux/productsSlice";
import {fetchCategories, setOpenedCategory} from "../../../redux/categoriesSlice";
import useActivePage from "../../../hooks/useActivePage";
import AppContent from "../../layout/AppContent/AppContent";
import ItemsList from "../../ItemsList/ItemsList";
import SpinElement from "../../UI/SpinElement/SpinElement";
import CreateProductModal from "../../modals/CreateProductModal/CreateProductModal";
import UpdateProductModal from "../../modals/UpdateProductModal/UpdateProductModal";
import ProductFilterPanel from "../../ProductFilterPanel/ProductFilterPanel";

function ProductsPage() {
	const dispatch = useDispatch();
	const {categoryId} = useParams();
	const {products, isProductsLoading} = useSelector(state => state.products);
	const {openedCategory} = useSelector(state => state.categories);
	const [productsFiltered, setProductsFiltered] = useState(products);
	const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setOpenedCategory(categoryId))
	}, [categoryId, dispatch]);

	useEffect(() => {
		setProductsFiltered(products.filter(item => {
			let catFilter = openedCategory ? item.category.id === openedCategory : item.category.id;
			return catFilter ? item.title.toLowerCase().includes(search) : catFilter;
		}))
	}, [search, products, openedCategory]);

	useActivePage({
		title: 'Products',
		title_key: '/products'
	});

	return (
		<AppContent layoutClass={isProductsLoading ? "app-loading" : ""}>
			<ProductFilterPanel setSearch={setSearch}/>
			<Divider/>
			{
				!isProductsLoading ?
					<ItemsList
						popconfirmTitle={"Are you sure to delete this product?"}
						linkPrefix={'/product/'}
						removeItem={(id) => dispatch(removeProduct(id))}
						editItem={(id) => dispatch(setProductInEdit(id))}
						items={productsFiltered}
					/>
					:
					<SpinElement/>
			}
			<CreateProductModal/>
			<UpdateProductModal/>
		</AppContent>
	);
}

export default ProductsPage;