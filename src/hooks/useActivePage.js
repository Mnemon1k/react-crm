import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setActivePage} from "../redux/appSlice";

export default function useActivePage(payload) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setActivePage(payload));
	}, [dispatch, payload])
}