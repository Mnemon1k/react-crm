import {Button, Card, Col, Divider, Form, Input, Row, Select} from "antd";
import {formRules} from "../../utils/formRules";
import dateToStr from "../../utils/dateToStr";
import ItemsList from "../ItemsList/ItemsList";
import React from "react";

function OrderInfo({order}) {
	const colParams = {
		xs: 24,
		sm: 24,
		md: 12,
		lg: 12,
		xl: 8,
	};

	const colInfoParams = {
		xs: 24,
		xl: 8,
	};

	return (
		<>
			<Row gutter={[15, 15]}>
				<Col {...colParams}>
					<Card title="Client info" extra={<Button type={'default'}>Edit</Button>}>
						<Form autoComplete="off">
							<Form.Item
								name="clientName"
								initialValue={order.clientName}
								rules={[formRules.required()]}
							>
								<Input disabled addonBefore={'Name'}/>
							</Form.Item>
							<Form.Item
								name="clientSurname"
								initialValue={order.clientSurname}
								rules={[formRules.required()]}
							>
								<Input disabled addonBefore={'Surname'}/>
							</Form.Item>
							<div>Comment:</div>
							<Form.Item
								name="comment"
								initialValue={order.comment}
								rules={[formRules.required()]}
							>
								<Input.TextArea disabled autoSize={{minRows: 3, maxRows: 5}}/>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col {...colParams}>
					<Card title="Delivery" extra={<Button type={'default'}>Edit</Button>}>
						<Form autoComplete="off">
							<Form.Item
								name="deliveryAddress"
								initialValue={order.deliveryAddress}
								rules={[formRules.required()]}
							>
								<Input disabled addonBefore={'Address'}/>
							</Form.Item>
							Delivery type:
							<Form.Item
								name="deliveryType"
								initialValue={order.deliveryType}
								rules={[formRules.required()]}
							>
								<Select disabled>
									<Select.Option value="lucy">Lucy</Select.Option>
									<Select.Option value="lucy">Lucy</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="price"
								initialValue={order.price}
								rules={[formRules.required()]}
							>
								<Input
									disabled
									addonBefore={'Price'}
									addonAfter={'$'}
									rules={[formRules.required()]}
								/>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col {...colInfoParams}>
					<Card title="Order info">
						<div>Created at: {dateToStr(order.createdAt)}</div>
						<div>Updated at: {dateToStr(order.updatedAt)}</div>
						<div>Created by: {order.profile && order.profile.username}</div>
					</Card>
				</Col>
			</Row>
			<Divider/>
			<h3>Products:</h3>
			<ItemsList
				hidePagination={true}
				linkPrefix={'/product/'}
				items={order.products}
			/>
		</>
	);
}

export default OrderInfo;