export default function sortArrayByDate(array, field) {
	return [...array].sort(function (a, b) {
		return new Date(b[field]) - new Date(a[field]);
	})
}