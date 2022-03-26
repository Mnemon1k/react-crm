import React, {useEffect} from 'react';
import {Button, Form, Input, Select, Space, Upload} from "antd";
import {useSelector} from "react-redux";
import {UploadOutlined} from "@ant-design/icons";
import AssetsService from "../../../service/assetsService";

function ProductForm({formSubmit, getSelector, initialData}) {
	const [form] = Form.useForm();
	const state = useSelector(getSelector);

	const productImages = initialData ? [{
		uid: '-1',
		name: initialData ? initialData.image.id + '.jpg' : '',
		status: 'done',
		url: initialData && initialData.image ? initialData.image.url : process.env.REACT_APP_IMG_PLACEHOLDER_URL,
		thumbUrl: initialData && initialData.image ? initialData.image.url : process.env.REACT_APP_IMG_PLACEHOLDER_URL,
	}] : [];

	useEffect(() => {
		form.resetFields();
	}, [state.isVisible, form]);

	const onFinish = async (data) => {
		let img = undefined;

		if (data.image) {
			if (data.image.split('id:').length > 1) {
				img = {id: data.image.split('id:')[1]}
			} else {
				img = await AssetsService.getAssetLinkByTitle(data.image.split('\\').pop());
			}
		}

		formSubmit({
			...data,
			image: img ? img.id : undefined,
			id: initialData ? initialData.id : undefined,
		});
	}

	return (
		<Form
			labelCol={{span: 5}}
			onFinish={onFinish}
			layout='horizontal'
			form={form}
			autoComplete='off'
		>
			<Form.Item initialValue={initialData && initialData.title} label="Title" name="title"
					   rules={[{required: true}]}>
				<Input/>
			</Form.Item>
			<Form.Item initialValue={initialData && initialData.description} label="Description" name="description"
					   rules={[{required: true}]}>
				<Input.TextArea rows={4}/>
			</Form.Item>
			<Form.Item initialValue={initialData && initialData.price} label="Price" name="price"
					   rules={[{
						   required: true,
						   message: "A value must be number",
						   pattern: new RegExp(/^[0-9]+$/)
					   }]}>
				<Input/>
			</Form.Item>
			<Form.Item initialValue={initialData && initialData.sku} label="SKU" name="sku"
					   rules={[{required: true}]}>
				<Input/>
			</Form.Item>
			<Form.Item initialValue={initialData && initialData.category.id} label="Category" name='category'
					   rules={[{required: true}]}>
				<Select
					showSearch
					placeholder="Select category"
					optionFilterProp="children"
				>
					{state.categories.map((category, index) => (
						<Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item initialValue={initialData && "id:" + initialData.image.id} label="Image" name={'image'}>
				<Space direction="vertical" style={{width: '100%'}} size="large">
					<Upload
						action={process.env.REACT_APP_ASSETS_ENDPOINT}
						customRequest={AssetsService.uploadImage}
						listType="picture"
						defaultFileList={productImages}
						maxCount={1}
					>
						<Button icon={<UploadOutlined/>}>Upload (Max: 1 image)</Button>
					</Upload>
				</Space>
			</Form.Item>
			<Form.Item wrapperCol={{sm: {offset: 4}}}>
				<Button
					type="primary"
					loading={state.isLoading}
					size={"large"}
					htmlType="submit"
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

export default ProductForm;