import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AppContent from "../../layout/AppContent/AppContent";
import {fetchCategories, removeCategory, setCategoryInEdit, setIsAddModalVisible} from "../../../redux/categoriesSlice";
import FilterPanel from "../../FilterPanel/FilterPanel";
import ItemsList from "../../ItemsList/ItemsList";
import useActivePage from "../../../hooks/useActivePage";
import CreateCategoryModal from "../../modals/CreateCategoryModal/CreateCategoryModal";
import UpdateCategoryModal from "../../modals/UpdateCategoryModal/UpdateCategoryModal";
import SpinElement from "../../UI/SpinElement/SpinElement";

function CategoriesPage() {
	const dispatch = useDispatch();
	const {categories, isCategoriesLoading} = useSelector(state => state.categories);
	const [search, setSearch] = useState('');
	const [filteredCategories, setFilteredCategories] = useState(categories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch])

	useActivePage({
		title: 'Categories',
		title_key: '/categories'
	});

	useEffect(() => {
		setFilteredCategories(categories.filter(item => item.title.toLowerCase().includes(search)));
	}, [search, categories]);

	return (
		<AppContent layoutClass={isCategoriesLoading ? "app-loading" : ""}>
			<FilterPanel
				btnText={'Create category'}
				setSearch={setSearch}
				createItemHandler={() => dispatch(setIsAddModalVisible(true))}
			/>
			<Divider/>
			{
				!isCategoriesLoading ?
					<ItemsList
						popconfirmTitle={"Are you sure to delete this category?"}
						linkPrefix={'/products/category/'}
						removeItem={(id) => dispatch(removeCategory(id))}
						editItem={(id) => dispatch(setCategoryInEdit(id))}
						items={filteredCategories}
					/>
					:
					<SpinElement/>
			}
			<CreateCategoryModal/>
			<UpdateCategoryModal/>
		</AppContent>
	);
}

export default CategoriesPage;