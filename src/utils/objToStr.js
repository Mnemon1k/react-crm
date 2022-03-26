export default function objToStr(obj) {
	var string = [];

	if (typeof (obj) == "object" && (obj.join == undefined)) {
		string.push("{");
		for (let prop in obj) {
			string.push(prop, ": ", objToStr(obj[prop]), ",");
		}
		;
		string.push("}");

		//is array
	} else if (typeof (obj) == "object" && !(obj.join == undefined)) {
		string.push("[")
		for (let prop in obj) {
			string.push(objToStr(obj[prop]), ",");
		}
		string.push("]")

		//is function
	} else if (typeof (obj) == "function") {
		string.push(obj.toString())

		//all other values can be done with JSON.stringify
	} else {
		string.push(JSON.stringify(obj))
	}

	return string.join("")
}