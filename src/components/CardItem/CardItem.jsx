import "./CardItem.scss"
import {DeleteOutlined, DropboxOutlined, EditOutlined} from "@ant-design/icons";
import {Popconfirm, Tag} from "antd";
import {Link} from "react-router-dom";
import isNumber from "../../utils/isNumber";

const CardItem = ({
					  removeProduct,
					  editProduct,
					  title,
					  id,
					  image,
					  price,
					  link,
					  description,
					  popconfirmTitle,
					  in_stock,
					  stock_reserve
				  }) => {
	const handleEdit = () => editProduct(id);
	const handleRemove = () => removeProduct(id);

	return (
		<div className={"product-item"}>
			<div className="product-item-header">
				<div className="product-item_title">
					<Link to={link}>{title}</Link>
				</div>
				<div className="product-item-controls">
					{isNumber(in_stock) && <DropboxOutlined title={'Change stock'}/>}
					{editProduct && <EditOutlined onClick={handleEdit}/>}
					{removeProduct && <Popconfirm
						placement="top"
						title={popconfirmTitle}
						onConfirm={handleRemove}
						okText="Yes"
						cancelText="No">
						<DeleteOutlined/>
					</Popconfirm>}
				</div>
			</div>
			<Link to={link}>
				<img
					className={"product-item_img"}
					src={image.url}
					alt="Product title"/>
			</Link>
			<div className="product-item-footer">
				{price && <Tag title={"Product price"} color="blue">{price}$</Tag>}
				<div className="product-item_description">{description}</div>
				{isNumber(in_stock) &&
					<div className={"product-item-stock"}>In stock: <Tag color="default">{in_stock}</Tag></div>}
				{isNumber(stock_reserve) &&
					<div className={"product-item-stock"}>Reserved: <Tag color="default">{stock_reserve}</Tag></div>}
				{(isNumber(in_stock) && isNumber(stock_reserve)) &&
					<div className={"product-item-stock"}>Available: <Tag
						color="success">{in_stock - stock_reserve}</Tag></div>}
			</div>
		</div>
	);
};

export default CardItem;