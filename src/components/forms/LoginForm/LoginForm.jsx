import {Button, Form, Input} from "antd";
import {formRules} from "../../../utils/formRules";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import "./LoginForm.scss"
import {useDispatch, useSelector} from "react-redux";
import {checkCredentials} from "../../../redux/authSlice";

function LoginForm() {
	const {isCheckingCredentials} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onFinish = (values) => {
		dispatch(checkCredentials(values));
	};

	return (
		<Form
			name="normal_login"
			className="form-login"
			autoComplete='off'
			initialValues={{remember: true}}
			onFinish={onFinish}>
			<Form.Item
				name="username"
				rules={[formRules.required("Please enter username")]}>
				<Input
					size={'large'}
					prefix={<UserOutlined className="site-form-item-icon"/>}
					placeholder="Username"/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[formRules.required("Please enter password")]}>
				<Input
					size={'large'}
					prefix={<LockOutlined className="site-form-item-icon"/>}
					type="password"
					placeholder="Password"/>
			</Form.Item>
			<Button
				loading={isCheckingCredentials}
				type="primary"
				size={"large"}
				htmlType="submit"
				className="login-form-button">Log in</Button>
		</Form>
	);
}

export default LoginForm;