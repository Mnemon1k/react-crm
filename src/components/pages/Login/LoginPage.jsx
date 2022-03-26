import React from 'react';
import {Alert, Card, Divider, Layout, Row, Typography} from "antd";
import LoginForm from "../../forms/LoginForm/LoginForm";
import {useSelector} from "react-redux";

function LoginPage() {
	const {authError} = useSelector((state) => state.auth);

	return (
		<Layout>
			<Row justify={"center"} align={"middle"} className={'app-container'}>
				<Card className={'card-login'}>
					<h1>Please login</h1>
					<LoginForm/>
					{authError && <Alert className={'offset-top-15'} message={authError} type="error" showIcon/>}
					<Divider/>
					<Alert
						message="Hi, this is an educational project of Aleksey Patsurkovskyi, source code: here."
						type="info" showIcon/>
					<div style={{textAlign: 'center', marginTop: '10px'}}>
						<Typography.Text mark>Login: admin</Typography.Text>
						<br/>
						<Typography.Text mark>Password: 123456</Typography.Text>
					</div>
				</Card>
			</Row>
		</Layout>
	);
}

export default LoginPage;