import React, {useEffect} from 'react';
import {Button, Form, Input, Select} from "antd";
import {useSelector} from "react-redux";

function UserForm({formSubmit, getSelector, initialData}) {
	const [form] = Form.useForm();
	const state = useSelector(getSelector);

	useEffect(() => {
		form.resetFields();
	}, [state.isVisible, form]);

	return (
		<Form
			labelCol={{span: 4}}
			onFinish={formSubmit}
			layout='horizontal'
			form={form}
			autoComplete='off'
		>
			<Form.Item initialValue={initialData && initialData[0].username} label="Username" name="username"
					   rules={[{required: true}]}>
				<Input/>
			</Form.Item>
			<Form.Item initialValue={initialData && initialData[0].password} label="Password" name="password"
					   rules={[{required: true}]}>
				<Input/>
			</Form.Item>
			<Form.Item label="Role" name='role' rules={[{required: true}]}>
				<Select>
					<Select.Option value="manager">manager</Select.Option>
					<Select.Option value="admin">admin</Select.Option>
				</Select>
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


export default UserForm;