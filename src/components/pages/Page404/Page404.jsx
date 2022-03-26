import './Page404.scss'
import useActivePage from "../../../hooks/useActivePage";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import AppContent from "../../layout/AppContent/AppContent";

const Page404 = () => {
	useActivePage({
		title: 'Not found',
		title_key: null
	});

	return (
		<AppContent>
			<div className='page-404'>
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={<Link to={'/'} type="primary"><Button type={"primary"}>Go Home</Button></Link>}
				/>
			</div>
		</AppContent>);
};

export default Page404;