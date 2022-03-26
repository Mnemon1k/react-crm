import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {message} from 'antd';
import {clearTitle} from "../redux/notificationSlice";

function useNotification() {
	const {title, type} = useSelector(state => state.notification);
	const dispatch = useDispatch();


	useEffect(() => {
		if (title === null) return;

		const onClose = () => {
			dispatch(clearTitle());
		}

		switch (type) {
			case 'info':
				message.info({content: title, onClose, key: 'updatable'});
				break;
			case 'success':
				message.success({content: title, onClose, key: 'updatable', duration: 1});
				break;
			case 'error':
				message.error({content: title, onClose, key: 'updatable'});
				break;
			case 'loading':
				message.loading({content: title, onClose, key: 'updatable'});
				break;
			default:
				message.info({content: title, onClose, key: 'updatable'});
		}
	}, [title, dispatch, type])
}

export default useNotification;