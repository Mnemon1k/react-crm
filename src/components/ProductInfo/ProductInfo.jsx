import "./ProductInfo.scss"
import {Breadcrumb, Button, Col, Divider, Image, Popconfirm, Row, Tag} from "antd";
import {Link} from "react-router-dom";
import ButtonGroup from "../UI/ButtonGroup/ButtonGroup";

function ProductInfo({removeProduct, editProduct, product}) {
	const handleEdit = () => editProduct(product.id);
	const handleRemove = () => removeProduct(product.id);

	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to={'/products'}>
						All products
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Link to={'/products/category/' + product.category.id}>
						<span>{product.category.title}</span>
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>{product.title}</Breadcrumb.Item>
			</Breadcrumb>
			<Divider/>
			<Row gutter={[60, 30]}>
				<Col sm={12} lg={12} xl={8}>
					<Image
						src={product.image.url}
					/>
				</Col>
				<Col sm={12} lg={12} xl={16}>
					<h2>
						{product.title}
					</h2>
					<Divider dashed/>
					<p>
						{product.description}
					</p>
					<p>
						SKU: <Tag title={"Product SKU"} color="blue">{product.sku}</Tag>
					</p>
					<p>
						Price: <Tag title={"Product price"} color="success">{product.price}$</Tag>
					</p>
					<p>
						In stock: <Tag color="purple">{product.in_stock} items</Tag>
					</p>
					<p>
						Reserved: <Tag color="orange">{product.stock_reserve} items</Tag>
					</p>

					<ButtonGroup className={'offset-top-15'}>
						<Popconfirm
							placement="top"
							title={'Are you sure?'}
							onConfirm={handleRemove}
							okText="Yes"
							cancelText="No">
							<Button danger>
								Remove
							</Button>
						</Popconfirm>
						<Button onClick={handleEdit} type="primary">
							Edit
						</Button>
					</ButtonGroup>
				</Col>
			</Row>
		</div>
	);
}

export default ProductInfo;