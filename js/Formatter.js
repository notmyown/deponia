function Formatter(input) {
  var obj = input;
  var that = this;

  this.dynamics = [];

  this.grep = function(table, value) {
    try {
    var obj = $.grep(table, function(e) {
      return e.id == value;
    })[0];
    var tmp = $.extend({}, obj);
    var name = tmp.name;
    if (tmp.dynamic) {
      tmp.name = "%replace_" + this.dynamics.length + "%";
      tmp.dynamic = name;
      this.dynamics.push(tmp);
    }
    } catch(e) {
      return {};
    }
    return tmp;
  }
  this.row = {
    row : function(table, attribute, caption, water) {
      var out = "";
      if (caption) {
        out += "<tr class='label'><td>" + caption + "</td></tr>";
      }
      var val = {};
      if (table) { 
        val = that.grep(table.options, obj[attribute][0]);
      }
      if (val.sub) {
        out += "<tr class='value'><td>" + val.name + "</td></tr>";
        val = that.grep(val.sub.options, obj[attribute][1]);
        out += "<tr class='value sub'><td>" + val.name + "</td></tr>";
      } else if (obj[attribute].length == 1) {
        out += "<tr class='value'><td>" + val.name + "</td></tr>";
      } else if (obj[attribute].length > 1) {
        var dat = data.adventures.tables;
        if (obj[attribute].length == 7) { // Nur ein NSC z.B Auftragggeber
          val = that.grep(dat.t2.options, obj[attribute][0]);
          out += "<tr class='value'><td>";
          out += "<table>";
          out += "<tr class='value sub'><td>Name:</td><td>" + val.name + " ";
          val = that.grep(dat.t3.options,  obj[attribute][1]).name;
          val += that.grep(dat.t4.options,  obj[attribute][2]).name;
          val = val.replace(/\./g, "");
          out += val;
          out += "</td></tr>";
          val = that.grep(dat.t5.options,  obj[attribute][3]).name;
          val += " " + that.grep(dat.t6.options,  obj[attribute][4]).name;
          val = val.replace(/\./g, "");
          out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val
              + "</td></tr>";
          val = " " + that.grep(dat.t7.options,  obj[attribute][5]).name;
          out += "<tr class='value sub'><td>Hobby:</td><td>" + val
              + "</td></tr>";
          val = " " + that.grep(dat.t8.options,  obj[attribute][6]).name;
          out += "<tr class='value sub'><td>Tick:</td><td>" + val
              + "</td></tr>";
          out += "</table>";
          out += "</td></tr>";
        } else if (obj[attribute].length == 3 && attribute == "name") { // hotel/shop name
          val = that.grep(table.t1.options, obj[attribute][0]).name;
          val += " " +  that.grep(table.t2.options, obj[attribute][1]).name;
          val += " " + that.grep(table.t3.options, obj[attribute][2]).name;
          val = val.replace(/\./g, "");
          if (val) {
            out += "<tr class='value'><td>" + val + "</td></tr>";
          }
       } else if (obj[attribute].length == 3) { // item
         if (val.name) {
           out += "<tr class='value'><td>" + val.name + "</td></tr>";
         }
         out += "<tr class='value'><td>";
         out += "<table>";
         if (val.name) {
           out += "<tr class='label sub'><td colspan=2>Gegenstand:</td></tr>";
         }
         val = that.grep(dat.t10.options, obj[attribute][1]).name;
         val += " " + that.grep(dat.t11.options, obj[attribute][2]).name;
         val = val.replace(/\./g, "");
         out += "<tr class='value sub'><td>" + val + "</td></tr>";
         out += "</table></td></tr>";
      } else if (obj[attribute].length == 8) { // Weiterer NSC
         out += "<tr class='value'><td>" + val.name + "</td></tr>";
         out += "<tr class='value'><td>";
         out += "<table>";
         out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
         val = that.grep(dat.t2.options, obj[attribute][1]).name;
         out += "<tr class='value sub'><td>Name:</td><td>" + val + " ";
         val = that.grep(dat.t3.options, obj[attribute][2]).name;
         val += that.grep(dat.t4.options, obj[attribute][3]).name;
         val = val.replace(/\./g, "");
         out += val;
         out += "</td></tr>";
         val = that.grep(dat.t5.options, obj[attribute][4]).name;
         val += " " + that.grep(dat.t6.options, obj[attribute][5]).name;
         val = val.replace(/\./g, "");
         out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val
             + "</td></tr>";
         val = " " + that.grep(dat.t7.options, obj[attribute][6]).name;
         out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
         val = " " + that.grep(dat.t8.options, obj[attribute][7]).name;
         out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
         out += "</table></td></tr>";
       } // Gruppe
       else if (obj[attribute].length == 10 || obj[attribute].length == 9) {
         var first = dat.t12;
         var last = dat.t13;
         if (water) {
           first = dat.t14;
           last = dat.t15;
         }
         var idx = 0;
         if(obj[attribute].length == 10) {
          out += "<tr class='value'><td>" + val.name + "</td></tr>";
          idx = 1;
         }
         out += "<tr class='value'><td>";
         out += "<table>";
         out += "<tr class='label sub'><td colspan=2>Gruppierung:</td></tr>";
         val = that.grep(first.options, obj[attribute][idx++]).name;
         val += " " + that.grep(last.options, obj[attribute][idx++]).name;
         val = val.replace(/\./g, "");
         out += "<tr class='value'><td colspan=2>" + val + "</td></tr>";
         out += "<tr class='label sub'><td colspan=2>Deren Boss:</td></tr>";
         val = that.grep(dat.t2.options, obj[attribute][idx++]).name;
         out += "<tr class='value sub'><td>Name:</td><td>" + val + " ";
         val = that.grep(dat.t3.options, obj[attribute][idx++]).name;
         val += that.grep(dat.t4.options, obj[attribute][idx++]).name;
         val = val.replace(/\./g, "");
         out += val;
         out += "</td></tr>";
         val = that.grep(dat.t5.options, obj[attribute][idx++]).name;
         val += " " + that.grep(dat.t6.options, obj[attribute][idx++]).name;
         val = val.replace(/\./g, "");
         out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val
             + "</td></tr>";
         val = " " + that.grep(dat.t7.options, obj[attribute][idx++]).name;
         out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
         val = " " + that.grep(dat.t8.options, obj[attribute][idx++]).name;
         out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
         out += "</table></td></tr>";

       } else if(obj[attribute].length == 11) {
         out += "<tr class='value'><td>" + val.name + "</td></tr>";
         out += "<tr class='value'><td>";
         out += "<table>";
         out += "<tr class='label sub'><td colspan=2>Shop:</td></tr>";
         val = that.grep(data.shops.tables.t1.options, obj[attribute][1]).name + " ";
         val += that.grep(data.shops.tables.t2.options, obj[attribute][2]).name + " ";
         val += that.grep(data.shops.tables.t3.options, obj[attribute][3]).name;
         out += "<tr class='value sub'><td>Der Shop heisst:</td><td>"+ val + "</td></tr>";
         val = that.grep(data.shops.tables.t4.options, obj[attribute][4]).name;
         out += "<tr class='value sub'><td>Der Shop steht:</td><td>" + val + "</td></tr>";
         val = that.grep(data.shops.tables.t5.options, obj[attribute][5]).name;
         out += "<tr class='value sub'><td>Hinter der Theke steht:</td><td>" + val + "</td></tr>";
         val = that.grep(data.shops.tables.t6.options, obj[attribute][6]).name;
         out += "<tr class='value sub'><td>Angebotene Waren sind:</td><td>" + val + "</td></tr>";
         val = that.grep(data.shops.tables.t7.options, obj[attribute][7]).name;
         out += "<tr class='value sub'><td>Bezahlt wird:</td><td>" + val + "</td></tr>";
         out += "</table></td></tr>";
       }else if(obj[attribute].length == 13) {
         out += "<tr class='value'><td>" + val.name + "</td></tr>";
         out += "<tr class='value'><td>";
         out += "<table>";
         out += "<tr class='label sub'><td colspan=2>Hotel:</td></tr>";
         val = that.grep(data.hotels.tables.t1.options, obj.ortlichkeit[1]).name + " ";
         val += that.grep(data.hotels.tables.t2.options, obj.ortlichkeit[2]).name + " ";
         val += that.grep(data.hotels.tables.t3.options, obj.ortlichkeit[3]).name;
         out += "<tr class='value sub'><td>Das Hotel heisst:</td><td>"+ val + "</td></tr>";
         val = that.grep(data.hotels.tables.t4.options, obj.ortlichkeit[4]).name;
         out += "<tr class='value sub'><td>Der Hotel liegt:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t5.options, obj.ortlichkeit[5]).name;
         out += "<tr class='value sub'><td>Das Hotel-Team:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t6.options, obj.ortlichkeit[6]).name;
         out += "<tr class='value sub'><td>Die Zimmer:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t7.options, obj.ortlichkeit[7]).name;
         out += "<tr class='value sub'><td>Das Fr&uuml;hst&uuml;ck:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t8.options, obj.ortlichkeit[8]).name;
         out += "<tr class='value sub'><td>Die Betten:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t9.options, obj.ortlichkeit[9]).name;
         out += "<tr class='value sub'><td>Ausgechenkt wird:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t10.options, obj.ortlichkeit[10]).name;
         out += "<tr class='value sub'><td>Die sanit&auml;ren Anlagen:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t11.options, obj.ortlichkeit[11]).name;
         out += "<tr class='value sub'><td>Bezahlt wird:</td><td>" + val + "</td></tr>";
         val = that.grep(data.hotels.tables.t12.options, obj.ortlichkeit[12]).name;
         out += "<tr class='value sub'><td>Die Besondere &Uuml;berraschung bei der Sache ist:</td><td>" + val + "</td></tr>";
         out += "</table></td></tr>";
       }
      }
      return out;
    }
  }
  this.nsc = {
    table : function() {
      var dat = data.adventures.tables;
      var out = "<table>";
      // Titel
      out += "<tr class='title'><th>Nicht spielbarer Charakter</th></tr>";
    //Der Auftaggeber
      out += that.row.row(null, "auftraggeber", null);
      out += "</table>";
      return out;
    },
  };
  this.group = {
      table : function() {
        var dat = data.adventures.tables;
        var out = "<table>";
        // Titel
        out += "<tr class='title'><th>Gruppierung</th></tr>";
      //Der Auftaggeber
        out += that.row.row(null, "gegenspieler", null);
        out += "</table>";
        return out;
      },
    };
  this.hotel = {
      table : function() {
        var dat = data.hotels.tables;
        var out = "<table>";
        // Titel
        out += "<tr class='title'><th>Hotel</th></tr>";
        // Das Hotel heisst
        out += that.row.row(data.hotels.tables, "name", "Das Hotel heisst...");
        out += that.row.row(data.hotels.tables.t4, "liegt", data.hotels.tables.t4.name);
        out += that.row.row(data.hotels.tables.t5, "team", data.hotels.tables.t5.name);
        out += that.row.row(data.hotels.tables.t6, "zimmer", data.hotels.tables.t6.name);
        out += that.row.row(data.hotels.tables.t7, "fruhstuck", data.hotels.tables.t7.name);
        out += that.row.row(data.hotels.tables.t8, "betten", data.hotels.tables.t8.name);
        out += that.row.row(data.hotels.tables.t9, "ausgecheckt", data.hotels.tables.t9.name);
        out += that.row.row(data.hotels.tables.t10, "sanitar", data.hotels.tables.t10.name);
        out += that.row.row(data.hotels.tables.t11, "bezahlt", data.hotels.tables.t11.name);
        out += that.row.row(data.hotels.tables.t12, "besonders", data.hotels.tables.t12.name);
        out += "</table>";
        return out;
      },
    };
  this.shop = {
      table : function() {
        var dat = data.hotels.tables;
        var out = "<table>";
        // Titel
        out += "<tr class='title'><th>Shop</th></tr>";
        // Das Hotel heisst
        out += that.row.row(data.shops.tables, "name", "Der Shop heisst...");
        out += that.row.row(data.shops.tables.t4, "steht", data.shops.tables.t4.name);
        out += that.row.row(data.shops.tables.t5, "theke", data.shops.tables.t5.name);
        out += that.row.row(data.shops.tables.t6, "waren", data.shops.tables.t6.name);
        out += that.row.row(data.shops.tables.t7, "bezahlt", data.shops.tables.t7.name);
        out += "</table>";
        return out;
      },
    };
  this.item = {
      table : function() {
        var dat = data.adventures.tables;
        var out = "<table>";
        // Titel
        out += "<tr class='title'><th>Gegenstand</th></tr>";
        //Der Auftaggeber
        out += that.row.row(null, "auftraggebersollen", null);
        out += "</table>";
        return out;
      },
    };
  this.reise = {
    table : function() {
      var dat = data.adventures.tables;
      var out = "<table>";
      // Titel
      out += "<tr class='title'><th>Reiseabenteuer</th></tr>";
  
      // Startpunkt der Reise
      out += that.row.row(dat.t1, "startpunkt", "Startpunkt der Reise...");
      
      //Der Auftaggeber
      out += that.row.row(null, "auftraggeber", "Der Auftraggeber...");
  
      // Die Spieler begegnen dem Auftraggeber am folgenden Ort
      out += that.row.row(dat.t9, "auftraggeberanort", dat.t9.name);
      
      //Die Spieler sollen für den Auftraggeber folgendes erledigen..
      out += that.row.row(dat.t17, "auftraggebersollen", dat.t17.name);
  
      // Zielpunk der Reise
      out += that.row.row(dat.t1, "zielpunkt", dat.t18.name);
      
      // und es dort
      out += that.row.row(dat.t19, "undesdort", dat.t19.name);
      
      //Abschließend
      out += that.row.row(dat.t20, "abschliessend", dat.t20.name);
      
      //Transportmittel
      out += that.row.row(dat.t21, "transportmittel", dat.t21.name);
      
      //Gegenspieler
      out += that.row.row(null, "gegenspieler", "Der oder die Gegenspieler...", false);
      
      //Komplikationen
      out += that.row.row(dat.t22, "komplikationen", dat.t22.name);
  
      //Belohnung
      out += that.row.row(dat.t16, "belohnung", dat.t16.name);
  
      out += "</table>";
      return out;
    },
  };
  this.ubersee = {
      table : function() {
        var dat = data.adventures.tables;
        var out = "<table>";
        //Titel
        out += "<tr class='title'><th>&Uuml;berseeabenteuer</th></tr>";
        
        // Startpunkt der Reise
        out += that.row.row(dat.t1, "startpunkt", "Startpunkt der Reise...");
        
        //Der Auftaggeber
        out += that.row.row(null, "auftraggeber", "Der Auftraggeber...");
    
        // Die Spieler begegnen dem Auftraggeber am folgenden Ort
        out += that.row.row(dat.t9, "auftraggeberanort", dat.t9.name);
        
        //Die Spieler sollen für den Auftraggeber folgendes erledigen..
        out += that.row.row(dat.t23, "auftraggebersollen", dat.t23.name);

        // Zielpunk der Reise
        out += that.row.row(dat.t1, "zielpunkt", dat.t24.name);
        
        // und es dort
        out += that.row.row(dat.t25, "undesdort", dat.t25.name);
        
        //Abschließend
        out += that.row.row(dat.t26, "abschliessend", dat.t26.name);
        
        //Transportmittel
        out += that.row.row(dat.t27, "transportmittel", dat.t27.name);
        
        //Gegenspieler
        out += that.row.row(null, "gegenspieler", "Der oder die Gegenspieler...", true);
        
        //Komplikationen
        out += that.row.row(dat.t28, "komplikationen", dat.t28.name);
        
        //Belohnung
        out += that.row.row(dat.t16, "belohnung", dat.t16.name);
        out += "</table>";
        return out;
      },
  };
  this.stadt = {
      table : function() {
        var dat = data.adventures.tables;
        var out = "<table>";
        //Titel
        out += "<tr class='title'><th>Stadtabenteuer</th></tr>";
        
        // Startpunkt der Reise
        out += that.row.row(dat.t1, "startpunkt", "Startpunkt der Reise...");
        
        //Der Auftaggeber
        out += that.row.row(null, "auftraggeber", "Der Auftraggeber...");
    
        // Die Spieler begegnen dem Auftraggeber am folgenden Ort
        out += that.row.row(dat.t9, "auftraggeberanort", dat.t9.name);
        
        //Die Spieler sollen für den Auftraggeber folgendes erledigen..
        out += that.row.row(dat.t29, "auftraggebersollen", dat.t29.name);
        
        // Startpunkt der Reise
        out += that.row.row(dat.t30, "ortlichkeit", dat.t30.name);
        
        //Abschließend
        out += that.row.row(dat.t32, "abschliessend", dat.t32.name);
        
        //Gegenspieler
        out += that.row.row(null, "gegenspieler", "Der oder die Gegenspieler...", false);
        
        //Komplikationen
        out += that.row.row(dat.t31, "komplikationen", dat.t31.name);
        
        //Besonderheiten
        out += that.row.row(dat.t33, "besonderheiten", dat.t33.name);
        
        //Belohnung
        out += that.row.row(dat.t16, "belohnung", dat.t16.name);
        
        out += "</table>";
        return out;
      },
  };
  this.wildnis = {
      table : function() {
        var dat = data.adventures.tables;
        var out = "<table>";
        //Titel
        out += "<tr class='title'><th>Wildnisabenteuer</th></tr>";
        
        // Startpunkt der Reise
        out += that.row.row(dat.t1, "startpunkt", "Startpunkt der Reise...");
        
        //Der Auftaggeber
        out += that.row.row(null, "auftraggeber", "Der Auftraggeber...");
    
        // Die Spieler begegnen dem Auftraggeber am folgenden Ort
        out += that.row.row(dat.t34, "auftraggeberanort", dat.t34.name);
        
        //Die Spieler sollen für den Auftraggeber folgendes erledigen..
        out += that.row.row(dat.t35, "auftraggebersollen", dat.t35.name);
        
        //An diesem Ort
        out += that.row.row(dat.t36, "andiesemort", dat.t36.name);
        
        // und es dort
        out += that.row.row(dat.t37, "undesdort", dat.t37.name);
        
        //Abschließend
        out += that.row.row(dat.t38, "abschliessend", dat.t38.name);
        
        //Transportmittel
        out += that.row.row(dat.t39, "transportmittel", dat.t39.name);
        
        //Gegenspieler
        out += that.row.row(null, "gegenspieler", "Der oder die Gegenspieler...", false);
        
        //Komplikationen
        out += that.row.row(dat.t40, "komplikationen", dat.t40.name);
        
        //Belohnung
        out += that.row.row(dat.t16, "belohnung", dat.t16.name);
        
        out += "</table>";
        return out;
      },
  };
}