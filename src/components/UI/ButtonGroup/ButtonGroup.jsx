import './ButtonGroup.scss'

function ButtonGroup(props) {
	return (
		<div className={props.className ? props.className + " btn-group" : " btn-group"}>
			{props.children}
		</div>
	);
}

export default ButtonGroup;