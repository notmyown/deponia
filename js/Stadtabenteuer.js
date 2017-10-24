function Stadtabenteuer() {

	this.format = function(type, input) {
		if ("table" == type) {
			return this.table(input);
		}
	};
	this.table = function(input) {
		return "table" + input;
	};
}