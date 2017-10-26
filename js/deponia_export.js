function DeponiaExport(data) {
  var instance = this;
  var order = [
    "reise",
    "ubersee",
    "stadt",
    "wildnis",
  ]
  this.func = {
    init : function() {
      var out = "";
      var obj = JSON.parse(instance.func.param("export"));
      instance.func.adventures.table(obj);

    },
    param : function getUrlParameter(prop) {
      var params = {};
      var search = decodeURIComponent(window.location.href
          .slice(window.location.href.indexOf('?') + 1));
      var definitions = search.split('&');

      definitions.forEach(function(val, key) {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
      });

      return (prop && prop in params) ? params[prop] : params;
    },
    adventures : {
      table : function(obj) {
        var adventure = new Formatter(obj);
        var out = adventure[order[obj.type]].table();
        var dynamics = adventure.dynamics;
        if (dynamics.length > 0) {
          var tmp = "<table>";
          tmp += "<tr><th colspan=2>Das Abenteuer enth&auml;lt dynamische Werte.</br> Bitte trage zuerst die Werte ein um die &Uuml;bersicht zu generieren!</th></tr>";
          $(dynamics).each(function() {
            tmp += "<tr><td>" + this.dynamic + "</td><td><input id='" + this.name.replace(/%/g,"") + "'/></td></tr>";
          });
          tmp += "<tr><td colspan=2><div class='okdynamics'>OK</div></td></tr>";
          tmp += "</table>";
          $(".main").html(tmp);
          $(".main .okdynamics").click(function() {
            $(dynamics).each(function() {
              var val = $(".main #" + this.name.replace(/%/g,"")).val();
              if (!val || val.length == 0) {
                val = "Droggelbecher";
              }
              out = out.replace(this.name, val);
            });
            $(".main").html(out);
          });
        } else {
          $(".main").html(out);
        }
      }
    }
  };
}