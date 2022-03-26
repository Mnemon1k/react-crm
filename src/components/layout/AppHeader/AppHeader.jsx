import {Layout} from "antd";
import {useSelector} from "react-redux";

const AppHeader = () => {
	const {title} = useSelector(state => state.app);

	return (
		<Layout.Header className="app-header">
			<h3>{title}</h3>
		</Layout.Header>
	);
};

export default AppHeader;