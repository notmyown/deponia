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
      if (obj.img) {
        instance.func.chars.table(obj);
      } else {
        instance.func.adventures.table(obj);
      }

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
    chars : {
      table : function(obj) {
        var out = "<div class='table'><div class='tr'><div class='td'>";
        out += "<div class='charcontainer'>";
        out += "  <div class='charimage'>";
        out += "    <span class='input' >" + decodeURIComponent(obj.name) + "</span>";
        out += "    <div class='charimageimg'>";
        out += "      <img src='" + decodeURIComponent(obj.img) + "' width=100%/>";
        out += "    </div>";
        out += "  </div>";
        out += " <div class='charvalues'>";
        out += " <div class='table'>";
        out += "  <div class='tr'><div class='td label'>Beschreibung:</div></div>";
        out += "  <div class='tr'><div class='td'><textarea class='description' readonly=true>" + decodeURIComponent(obj.beschreibung) + "</textarea></div></div>";
        out += "  <div class='tr'><div class='td'><label for='konzept'>Konzept:</label><input name='konzept' type='text' readonly value='" + obj.konzept + "'/></div></div>";
        out += "  <div class='tr'><div class='td'><label for='dilemma'>Dilemma:</label><input name='dilemma' type='text' readonly value='" + obj.dilemma + "'/></div></div>";
        out += "  <div class='tr'><div class='td label'>Weitere Aspekte:</div></div>";
        out += "  <div class='tr'><div class='td'><textarea class='aspekte' readonly=true>" + decodeURIComponent(obj.aspekte) + "</textarea></div></div>";
        out += "  <div class='tr'><div class='td label'>Methoden:</div></div>";
        out += "  <div class='tr'><div class='td small'><label for='flink'>Flink:</label><input name='flink' type='text' readonly  value='" + decodeURIComponent(obj.methoden.flink) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='scharfsinnig'>Scharfsinnig:</label><input name='scharfsinnig' type='text' readonly value='" + decodeURIComponent(obj.methoden.scharfsinnig) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='tollkuhn'>Tollk&uuml;hn:</label><input name='tollkuhn' type='text' readonly value='" + decodeURIComponent(obj.methoden.tollkuhn) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='tuckisch'>T&uuml;ckisch:</label><input name='tuckisch' type='text' readonly value='" + decodeURIComponent(obj.methoden.tuckisch) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='kraftvoll'>Kraftvoll:</label><input name='kraftvoll' type='text' readonly value='" + decodeURIComponent(obj.methoden.kraftvoll) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='sorgfaltig'>Sorgf&auml;ltig:</label><input name='sorgfaltig' type='text' readonly value='" + decodeURIComponent(obj.methoden.sorgfaltig) + "'/></div></div>";
        out += "  <div class='tr'><div class='td label'>Stunts:</div></div>";
        out += "  <div class='tr'><div class='td'><textarea class='stunts' readonly=true>" + decodeURIComponent(obj.stunts)+ "</textarea></div></div>";
        out += "  <div class='tr'><div class='td label'>Konsequenzen:</div></div>";
        out += "  <div class='tr'><div class='td small'><label for='leicht'>Leicht(2):</label><input name='leicht' type='text' readonly value='" + decodeURIComponent(obj.konsequenzen.leicht) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='mittel'>Mittel(4):</label><input name='mittel' type='text' readonly value='" + decodeURIComponent(obj.konsequenzen.mittel) + "'/></div></div>";
        out += "  <div class='tr'><div class='td small'><label for='schwer'>Schwer(6):</label><input name='schwer' type='text' readonly value='" + decodeURIComponent(obj.konsequenzen.schwer) + "'/></div></div>";
        out += "  <div class='tr'><div class='td label'>Erholungsrate: " + decodeURIComponent(obj.erholungsrate) + "</div></div>";
        out += "  <div class='tr'><div class='td'><div class='stress'><span>Stress:</span><div class='stressbar'>";
        var count = obj.stress;
        var i = 0;
        for (i = 0; i < count; i++) {
          out += "<span class='clicked'/>";
        }
        for (i = i; i < 3; i++) {
          out += "<span/>";
        }
        out += "</div></div></div></div>";
        out += "  </div>";
        out += " </div>";
        out += "</div>";
        out += "</div></div></div>";
        $(".main .maincontent").html(out);
        return out;
      }
    },
    adventures : {
      table : function(obj) {
        var adventure = new Formatter(obj);
        var out = adventure[order[obj.type]].table();
        var dynamics = adventure.dynamics;
        if (dynamics.length > 0) {
          var tmp = "<table>";
          tmp += "<tr><th class='label'>Das Abenteuer enth&auml;lt dynamische Werte.</br> Bitte trage zuerst die Werte ein um die &Uuml;bersicht zu generieren!</th></tr>";
          $(dynamics).each(function() {
            tmp += "<tr><td  class='label'>" + this.dynamic + "</td></tr><tr><td><input id='" + this.name.replace(/%/g,"") + "'/></td></tr>";
          });
          tmp += "<tr><td colspan=2><div class='button okdynamics'>OK</div></td></tr>";
          tmp += "</table>";
          $(".main .maincontent").html(tmp);
          $(".main .okdynamics").click(function() {
            $(dynamics).each(function() {
              var val = $(".main #" + this.name.replace(/%/g,"")).val();
              if (!val || val.length == 0) {
                val = "Droggelbecher";
              }
              out = out.replace(this.name, val);
            });
            out += "<table width=100%><tr><td colspan=2><div class='button print'>Drucken</div></td></tr></table>";
            $(".main .maincontent").html(out);
            $(".main .maincontent .print").click(function() {
              $("body").addClass("print");
            });
          });
        } else {
          $(".main .maincontent").html(out);
        }
      }
    }
  };
}