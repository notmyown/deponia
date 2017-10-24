function Abenteuer() {
	this.func = {
		type : 0,
		startpunkt : [],
		auftraggeber : [],
		auftraggeberanort : 0,
		auftraggebersollen : [],
		zielpunkt : [],
		undesdort : [],
		abschliessend : [],
		transportmittel : 0,
		gegenspieler : [],
		komplikationen : [],
		belohnung : [],
		ortlichkeit : [],
		besonderheiten : [],
		andiesemort : [],
	},
	this.format = [ 
		{ 
			id : 0,
			name : "Reiseabenteuer",
			table : function(input) {
				var reiseabenteuer = new Reiseabenteuer(input);
				return reiseabenteuer.format("table");
			},
		},
	];
}

var ADV = new Abenteuer();