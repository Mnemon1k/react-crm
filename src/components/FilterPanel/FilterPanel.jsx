import "./FilterPanel.scss"
import {Button, Input, Select} from "antd";
import {useSelector} from "react-redux";

function FilterPanel({categories, setSearch, setCategoryFilter, btnText, createItemHandler}) {
	const handleSearch = (e) => (setSearch(e.target.value.toLowerCase()));
	const {openedCategory} = useSelector(state => state.categories);

	return (
		<div className={'product-filter-panel'}>
			{
				btnText &&
				<Button
					onClick={createItemHandler}
					type={"primary"}
				>
					{btnText}
				</Button>
			}
			{
				categories &&
				<Select
					showSearch
					value={categories.length ? openedCategory : ""}
					onChange={setCategoryFilter}
					placeholder="All categories"
					optionFilterProp="children"
				>
					<Select.Option key={null} value={null}>All categories</Select.Option>

					{categories.map((category, index) => (
						<Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
					))}
				</Select>
			}

			<Input
				className={'product-filter-panel_search'}
				onChange={handleSearch}
				placeholder="Search by title"
			/>
		</div>
	);
}

export default FilterPanel;