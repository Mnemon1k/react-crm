import {Layout} from "antd";
import Sidebar from "../AppSidebar/AppSidebar";
import AppHeader from "../AppHeader/AppHeader";
import useNotification from "../../../hooks/useNotification";

const AppContent = (props) => {
	useNotification();

	return (
		<Layout className={'app-container'}>
			<Sidebar/>
			<Layout>
				<AppHeader/>
				<Layout.Content className={"app-content " + props.layoutClass && props.layoutClass + " app-content"}>
					{props.children}
				</Layout.Content>
				<Layout.Footer className={'app-footer'}>Aleksei Patsurkovskyi ©2022</Layout.Footer>
			</Layout>
		</Layout>
	);
};

export default AppContent;