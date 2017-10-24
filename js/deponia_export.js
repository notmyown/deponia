function DeponiaExport(data) {
  var instance = this;
  this.func = { 
	init : function() {
		var out = "";
		var obj = JSON.parse(instance.func.param("export"));
		instance.func.adventures
		switch(obj.func.type) {
			case 0 : {
				instance.func.adventures.reise(obj.func);
				break;
			}
			case 1 : {
				instance.func.adventures.reise(obj.func);
				break;
			}
			case 2 : {
				instance.func.adventures.reise(obj.func);
				break;
			}
			case 2 : {
				instance.func.adventures.reise(obj.func);
				break;
			}
		}
	},
	param : function getUrlParameter(prop) {
		var params = {};
		var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
		var definitions = search.split( '&' );

		definitions.forEach( function( val, key ) {
			var parts = val.split( '=', 2 );
			params[ parts[ 0 ] ] = parts[ 1 ];
		} );

		return ( prop && prop in params ) ? params[ prop ] : params;
	},
	adventures : {
		reise : function(obj) {
			var out = ADV.format[obj.type].table(obj);
			$(".main").html(out);
		},
	}
  };
}