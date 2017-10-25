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
		{ 
      id : 1,
      name : "&Uuml;berseeabenteuer",
      table : function(input) {
        var reiseabenteuer = new Uberseeabenteuer(input);
        return reiseabenteuer.format("table");
      },
    },
    { 
      id : 2,
      name : "Stadtabenteuer",
      table : function(input) {
        var reiseabenteuer = new Stadtabenteuer(input);
        return reiseabenteuer.format("table");
      },
    },
    { 
      id : 3,
      name : "Wildnisabenteuer",
      table : function(input) {
        var reiseabenteuer = new Wildnisabenteuer(input);
        return reiseabenteuer.format("table");
      },
    },
	];
}

var ADV = new Abenteuer();