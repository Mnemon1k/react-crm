import CardItem from "../CardItem/CardItem";
import './ItemsList.scss'
import {Col, Empty, Pagination, Row} from "antd";

const ItemsList = ({hidePagination = false, removeItem, editItem, items, popconfirmTitle, linkPrefix}) => {
	const colParams = {
		xs: 24,
		sm: 12,
		md: 6,
		xl: 4
	};

	const paginationElem = !hidePagination && <Pagination showSizeChanger={false}/>;

	return (
		<div className={'product-list'}>
			{
				items.length ?
					(<>
						<Row gutter={[15, 15]}>
							{items.map((item, index) => (
								<Col key={index} {...colParams}>
									<CardItem
										{...item}
										popconfirmTitle={popconfirmTitle}
										link={linkPrefix + item.id}
										removeProduct={removeItem}
										editProduct={editItem}
									/>
								</Col>
							))}
						</Row>
						{paginationElem}
					</>)
					:
					<Empty/>
			}
		</div>
	);
};

export default ItemsList;