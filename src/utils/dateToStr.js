export default function dateToStr(date) {
	return new Date(date).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2-$1-$3');
}