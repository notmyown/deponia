function Wildnisabenteuer(input) {
  var obj = input;

  this.format = function(type) {
    if ("table" == type) {
      return this.table(this.input);
    }
  };
  this.table = function() {
    var dat = data.adventures.tables;
    var out = "<table>";
  //Titel
    out += "<tr class='title'><th>Wildnisabenteuer</th></tr>";
  //Startpunkt der Reise
    out += "<tr class='label'><td>Der Startpunkt der Reise...</td></tr>";
    var val = $.grep(dat.t1.options, function(e){ return e.id == obj.startpunkt[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    if (val.sub) {
      val = $.grep(val.sub.options, function(e){ return e.id == obj.startpunkt[1]; })[0];
      out += "<tr class='value sub'><td>" + val.name + "</td></tr>";
    }
    
    //Der Auftraggeber
    out += "<tr class='label'><td>Der Auftraggeber...</td></tr>";
    val = $.grep(dat.t2.options, function(e){ return e.id == obj.auftraggeber[0]; })[0];
    out += "<tr class='value'><td>";
    out += "<table>";
    out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val.name + "'/> ";
    val = $.grep(dat.t3.options, function(e){ return e.id == obj.auftraggeber[1]; })[0].name;
    val += $.grep(dat.t4.options, function(e){ return e.id == obj.auftraggeber[2]; })[0].name;
    val = val.replace(/\./g, "");
    out += val;
    out += "</td></tr>";
    val = $.grep(dat.t5.options, function(e){ return e.id == obj.auftraggeber[3]; })[0].name;
    val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.auftraggeber[4]; })[0].name;
    val = val.replace(/\./g, "");
    out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
    val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.auftraggeber[5]; })[0].name;
    out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
    val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.auftraggeber[6]; })[0].name;
    out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
    out += "</table>";
    out += "</td></tr>";
    
    //Die Spieler begegnen dem Auftraggeber am folgenden Ort
    out += "<tr class='label'><td>Die Spieler begegnen dem Auftraggeber am folgenden Ort...</td></tr>";
    val = $.grep(dat.t34.options, function(e){ return e.id == obj.auftraggeberanort[0]; })[0].name;
    out += "<tr class='value'><td>" + val + "</td></tr>";
    
    
    //Die Spieler sollen
    out += "<tr class='label'><td>Die Spieler sollen f&uuml;r den Auftraggeber folgendes erledigen...</td></tr>";
    val = $.grep(dat.t35.options, function(e){ return e.id == obj.auftraggebersollen[0]; })[0].name;
    out += "<tr class='value'><td>" + val + "</td></tr>";
    //ITEM
    if (obj.auftraggebersollen.length == 3) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>Gegenstand:</td></tr>";
      val = $.grep(dat.t10.options, function(e){ return e.id == obj.auftraggebersollen[1]; })[0].name;
      val += " " + $.grep(dat.t11.options, function(e){ return e.id == obj.auftraggebersollen[2]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    //NSC
    else if (obj.auftraggebersollen.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.auftraggebersollen[1]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.auftraggebersollen[2]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.auftraggebersollen[3]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.auftraggebersollen[4]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.auftraggebersollen[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.auftraggebersollen[6]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.auftraggebersollen[7]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    //Gruppe
    else if (obj.auftraggebersollen.length == 10) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>Gruppierung:</td></tr>";
      val = $.grep(dat.t12.options, function(e){ return e.id == obj.auftraggebersollen[1]; })[0].name;
      val += " " + $.grep(dat.t13.options, function(e){ return e.id == obj.auftraggebersollen[2]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value'><td colspan=2>" + val + "</td></tr>";
      out += "<tr class='label sub'><td colspan=2>Deren Boss:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.auftraggebersollen[3]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.auftraggebersollen[4]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.auftraggebersollen[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.auftraggebersollen[6]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.auftraggebersollen[7]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.auftraggebersollen[8]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.auftraggebersollen[9]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    
    
    //an diesem Ort
    out += "<tr class='label'><td>An diesem Ort...</td></tr>";
    val = $.grep(dat.t36.options, function(e){ return e.id == obj.andiesemort[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    //SHOP
    if (obj.andiesemort.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>Shop:</td></tr>";
      val = $.grep(data.shops.tables.t1.options, function(e){ return e.id == obj.andiesemort[1]; })[0].name + " ";
      val += $.grep(data.shops.tables.t2.options, function(e){ return e.id == obj.andiesemort[2]; })[0].name + " ";
      val += $.grep(data.shops.tables.t3.options, function(e){ return e.id == obj.andiesemort[3]; })[0].name;
      out += "<tr class='value sub'><td>Der Shop heisst:</td><td>"+ val + "</td></tr>";
      val = $.grep(data.shops.tables.t4.options, function(e){ return e.id == obj.andiesemort[4]; })[0].name;
      out += "<tr class='value sub'><td>Der Shop steht:</td><td>" + val + "</td></tr>";
      val = $.grep(data.shops.tables.t5.options, function(e){ return e.id == obj.andiesemort[5]; })[0].name;
      out += "<tr class='value sub'><td>Hinter der Theke steht:</td><td>" + val + "</td></tr>";
      val = $.grep(data.shops.tables.t6.options, function(e){ return e.id == obj.andiesemort[6]; })[0].name;
      out += "<tr class='value sub'><td>Angebotene Waren sind:</td><td>" + val + "</td></tr>";
      val = $.grep(data.shops.tables.t7.options, function(e){ return e.id == obj.andiesemort[7]; })[0].name;
      out += "<tr class='value sub'><td>Bezahlt wird:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
    } else if (obj.andiesemort.length == 13) {
        out += "<tr class='value'><td>";
        out += "<table>";
        out += "<tr class='label sub'><td colspan=2>Hotel:</td></tr>";
        val = $.grep(data.hotels.tables.t1.options, function(e){ return e.id == obj.andiesemort[1]; })[0].name + " ";
        val += $.grep(data.hotels.tables.t2.options, function(e){ return e.id == obj.andiesemort[2]; })[0].name + " ";
        val += $.grep(data.hotels.tables.t3.options, function(e){ return e.id == obj.andiesemort[3]; })[0].name;
        out += "<tr class='value sub'><td>Das Hotel heisst:</td><td>"+ val + "</td></tr>";
        val = $.grep(data.hotels.tables.t4.options, function(e){ return e.id == obj.andiesemort[4]; })[0].name;
        out += "<tr class='value sub'><td>Der Hotel liegt:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t5.options, function(e){ return e.id == obj.andiesemort[5]; })[0].name;
        out += "<tr class='value sub'><td>Das Hotel-Team:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t6.options, function(e){ return e.id == obj.andiesemort[6]; })[0].name;
        out += "<tr class='value sub'><td>Die Zimmer:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t7.options, function(e){ return e.id == obj.andiesemort[7]; })[0].name;
        out += "<tr class='value sub'><td>Das Fr&uuml;hst&uuml;ck:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t8.options, function(e){ return e.id == obj.andiesemort[8]; })[0].name;
        out += "<tr class='value sub'><td>Die Betten:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t9.options, function(e){ return e.id == obj.andiesemort[9]; })[0].name;
        out += "<tr class='value sub'><td>Ausgechenkt wird:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t10.options, function(e){ return e.id == obj.andiesemort[10]; })[0].name;
        out += "<tr class='value sub'><td>Die sanit&auml;ren Anlagen:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t11.options, function(e){ return e.id == obj.andiesemort[11]; })[0].name;
        out += "<tr class='value sub'><td>Bezahlt wird:</td><td>" + val + "</td></tr>";
        val = $.grep(data.hotels.tables.t12.options, function(e){ return e.id == obj.andiesemort[12]; })[0].name;
        out += "<tr class='value sub'><td>Die Besondere &Uuml;berraschung bei der Sache ist:</td><td>" + val + "</td></tr>";
        
        out += "</table></td></tr>";
    }
    
    
  //und es dort
    out += "<tr class='label'><td>und es dort...</td></tr>";
    val = $.grep(dat.t37.options, function(e){ return e.id == obj.undesdort[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    if (obj.undesdort.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.undesdort[1]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.undesdort[2]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.undesdort[3]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.undesdort[4]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.undesdort[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.undesdort[6]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.undesdort[7]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    out += "<tr class='label'><td>Abschliessend sollen die Spieler...</td></tr>";
    val = $.grep(dat.t38.options, function(e){ return e.id == obj.abschliessend[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    if (obj.abschliessend.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.abschliessend[1]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.abschliessend[2]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.abschliessend[3]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.abschliessend[4]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.abschliessend[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.abschliessend[6]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.abschliessend[7]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    
    out += "<tr class='label'><td>Als Transportmittel mag dienen...</td></tr>";
    val = $.grep(dat.t39.options, function(e){ return e.id == obj.transportmittel[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    
    
  //Gegenspieler
    out += "<tr class='label'><td>Der oder die Gegenspieler...</td></tr>";
    out += "<tr class='value'><td colspan=2><table>";
    val = $.grep(dat.t12.options, function(e){ return e.id == obj.gegenspieler[0]; })[0].name;
    val += " " + $.grep(dat.t13.options, function(e){ return e.id == obj.gegenspieler[1]; })[0].name;
    val = val.replace(/\./g, "");
    out += "<tr class='value sub'><td colspan=2>" + val + "</td></tr>";
    out += "<tr class='label sub'><td colspan=2>Deren Boss:</td></tr>";
    val = $.grep(dat.t2.options, function(e){ return e.id == obj.gegenspieler[2]; })[0].name;
    out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
    val = $.grep(dat.t3.options, function(e){ return e.id == obj.gegenspieler[3]; })[0].name;
    val += $.grep(dat.t4.options, function(e){ return e.id == obj.gegenspieler[4]; })[0].name;
    val = val.replace(/\./g, "");
    out += val;
    out += "</td></tr>";
    val = $.grep(dat.t5.options, function(e){ return e.id == obj.gegenspieler[5]; })[0].name;
    val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.gegenspieler[6]; })[0].name;
    val = val.replace(/\./g, "");
    out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
    val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.gegenspieler[7]; })[0].name;
    out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
    val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.gegenspieler[8]; })[0].name;
    out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
    out += "</table></td></tr>";
    
  //Komplikationen
    out += "<tr class='label'><td>Komplikationen...</td></tr>";
    val = $.grep(dat.t40.options, function(e){ return e.id == obj.komplikationen[0]; })[0];
    out += "<tr class='value'><td>" + val.name + "</td></tr>";
    if (obj.komplikationen.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.komplikationen[1]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.komplikationen[2]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.komplikationen[3]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.komplikationen[4]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.komplikationen[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.komplikationen[6]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.komplikationen[7]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    
    out += "<tr class='label'><td>Belohnung...</td></tr>";
    val = $.grep(dat.t16.options, function(e){ return e.id == obj.belohnung[0]; })[0].name;
    out += "<tr class='value'><td>" + val + "</td></tr>";
    //ITEM
    if (obj.belohnung.length == 3) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>Gegenstand:</td></tr>";
      val = $.grep(dat.t10.options, function(e){ return e.id == obj.belohnung[1]; })[0].name;
      val += " " + $.grep(dat.t11.options, function(e){ return e.id == obj.belohnung[2]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    //NSC
    else if (obj.belohnung.length == 8) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>NSC:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.belohnung[1]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.belohnung[2]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.belohnung[3]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.belohnung[4]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.belohnung[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.belohnung[6]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.belohnung[7]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    //Gruppe
    else if (obj.belohnung.length == 10) {
      out += "<tr class='value'><td>";
      out += "<table>";
      out += "<tr class='label sub'><td colspan=2>Gruppierung:</td></tr>";
      val = $.grep(dat.t12.options, function(e){ return e.id == obj.belohnung[1]; })[0].name;
      val += " " + $.grep(dat.t13.options, function(e){ return e.id == obj.belohnung[2]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value'><td colspan=2>" + val + "</td></tr>";
      out += "<tr class='label sub'><td colspan=2>Deren Boss:</td></tr>";
      val = $.grep(dat.t2.options, function(e){ return e.id == obj.belohnung[3]; })[0].name;
      out += "<tr class='value sub'><td>Name:</td><td><input type=text value='"+ val + "'/> ";
      val = $.grep(dat.t3.options, function(e){ return e.id == obj.belohnung[4]; })[0].name;
      val += $.grep(dat.t4.options, function(e){ return e.id == obj.belohnung[5]; })[0].name;
      val = val.replace(/\./g, "");
      out += val;
      out += "</td></tr>";
      val = $.grep(dat.t5.options, function(e){ return e.id == obj.belohnung[6]; })[0].name;
      val += " " + $.grep(dat.t6.options, function(e){ return e.id == obj.belohnung[7]; })[0].name;
      val = val.replace(/\./g, "");
      out += "<tr class='value sub'><td>Er ist ein:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t7.options, function(e){ return e.id == obj.belohnung[8]; })[0].name;
      out += "<tr class='value sub'><td>Hobby:</td><td>" + val + "</td></tr>";
      val = " " + $.grep(dat.t8.options, function(e){ return e.id == obj.belohnung[9]; })[0].name;
      out += "<tr class='value sub'><td>Tick:</td><td>" + val + "</td></tr>";
      out += "</table></td></tr>";
      
    }
    
    out += "</table></td></tr>";
		return out;
	};
}