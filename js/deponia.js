function Deponia(data) {
  var instance = this;
  this.func = { 
  init : function() {
    
    
    var out = "";
    
   // Dropdown für NSC Generatoren
    out += "<li id='menu-item-generator-item_card' class='menu-item item_generator'><a href='#'>Item-Karten</a>";
    out += "<li id='menu-item-generator-item_item' class='menu-item item_generator'><a href='#'>Gegenstand</a>";
    
    $("#menu-item-generator-item .sub-sub-menu").html(out);
    // Click Action setzen
    $("#menu-item-generator-item .sub-sub-menu .item_generator a").click(function() {
      var id = $(this).parent().attr('id').split("item_").pop();
      instance.func.item.content(id);
      $(".main .maincontent .table .button.submitall").click();
    });
    
    // Dropdown für NSC Generatoren
    out = "<li id='menu-item-generator-nsc_nsc' class='menu-item nsc_generator'><a href='#'>NSC</a>";
    out += "<li id='menu-item-generator-nsc_group' class='menu-item nsc_generator'><a href='#'>Gruppierung</a>";
    
    $("#menu-item-generator-nsc .sub-sub-menu").html(out);
    // Click Action setzen
    $("#menu-item-generator-nsc .sub-sub-menu .nsc_generator a").click(function() {
      var id = $(this).parent().attr('id').split("nsc_").pop();
      instance.func.nsc.content(id);
      $(".main .maincontent .table .button.submitall").click();
    });
    
    // Dropdown für die Abenteuergeneratoren im Hauptmenü erstellen
    out = "";
    $(data.adventures.types).each(function() {
      out += "<li id='menu-item-generator-adventure_type_" + this.id + "' class='menu-item adventure_generator'><a href='#'>" + this.name + "</a>";
    });
    $("#menu-item-generator-adventure .sub-sub-menu").html(out);
    // Click Action setzen
    $("#menu-item-generator-adventure .sub-sub-menu .adventure_generator a").click(function() {
      var id = $(this).parent().attr('id').split("type_").pop();
      instance.func.adventure.content(id);
      $(".main .maincontent .table .button.submitall").click();
    });
    
    // Dropdown für die Ortgenerator im Hauptmenü erstellen
    out = "";
    out += "<li id='menu-item-generator-places_hotel' class='menu-item place_generator'><a href='#'>Hotel</a>";
    out += "<li id='menu-item-generator-places_shop' class='menu-item place_generator'><a href='#'>Shop</a>";
    
    $("#menu-item-generator-places .sub-sub-menu").html(out);
    // Click Action setzen
    $("#menu-item-generator-places .sub-sub-menu .place_generator a").click(function() {
      var id = $(this).parent().attr('id').split("places_").pop();
      instance.func.places.content(id);
      $(".main .maincontent .table .button.submitall").click();
    });
    
    $("#menu-item-generator-char a").click(function() {
      instance.func.char.content();
      $(".main .maincontent .table .button.submitall").click();
    });
    
    $("#menu-item-home a").click(function() {
      instance.func.home.content();
      $(".main .maincontent .table .button.submitall").click();
    });
    
    $("#menu-item-home a").click();
    
    var adv = instance.func.param("adv");
    if (adv) {
    $("#menu-item-textadventure .sub-menu a").click(function() {
      var id = $(this).parent().attr('id').split("_").pop();
      instance.func.textadventure.content(id);
      $(".main .maincontent .table .button.submitall").click();
    });
    } else {
      $("#menu-item-textadventure").remove();
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

    return (prop && prop in params) ? params[prop] : null;
  },
  random : {
    num : function(size) {
      var min = 0
      var max = Math.floor(size);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    tr : function(elem) {
      var tr = $(elem).closest(".tr").find("SELECT").each(function() {
        var idx = instance.func.random.num($(this).children('option').length);
        $(this).children('option')[idx].selected = true;
        $(this).trigger("change");
      });
    },
  },
  event : {
    select : function(id, table, dosmth) {
      $(".main .maincontent .table #" + id + " SELECT").change(function() {
        var theid = $(this).val();
        var result = $.grep(table.options, function(e){ return e.id == theid; })[0];
        //Gibt es ein Funktion
        $("." + id + "_sub").remove();
        if (result.sub) {
          var out = instance.func.adventure.renderOptionTable(id + "_sub", null, result.sub.name, result.sub);
          $(this).closest(".tr").after(function() {return out;});
          $(".main .maincontent .table #" + id + "_sub .button.submit").click(function() {
            instance.func.random.tr(this);
          });
          $(".main .maincontent .table #" + id + "_sub .button.submit").click();
        }
        if (result.func) {
          var out = "";
          
          if (result.func == "item") {
            out += instance.func.adventure.renderItemTable(id + "_sub", null, "Gegenstand:");
          } else if (result.func == "nsc") {
            out += instance.func.adventure.renderNSCTable(id + "_sub", null, "NSC:");
          } else if (result.func == "group_land") {
            out += instance.func.adventure.renderNSCGroupTable(id + "_sub", null, false, "Gruppierung:");
            out += "<div class='tr " + id + "_sub'><div class='td caption perc100'>Deren Boss:</div></div>";
            out += instance.func.adventure.renderNSCTable(id + "_sub");
          }  else if (result.func == "group_water") {
            out += instance.func.adventure.renderNSCGroupTable(id + "_sub", null, true, "Gruppierung:");
            out += "<div class='tr " + id + "_sub'><div class='td caption perc100'>Deren Boss:</div></div>";
            out += instance.func.adventure.renderNSCTable(id + "_sub");
          } else if (result.func == "hotel") {
            out += instance.func.places.renderHotelTable(id + "_sub", "inAdventure");
          } else if (result.func == "shop") {
            out += instance.func.places.renderShopTable(id + "_sub", "inAdventure");
          }
          
          $(this).closest(".tr").after(function() {return out;});
          $(".main .maincontent .table ." + id + "_sub .button.submit").click(function() {
            instance.func.random.tr(this);
          });
          $(".main .maincontent .table ." + id + "_sub .button.submit").click();
        }
        if (dosmth) {
          dosmth();
        }
      });
    },
    export : function(type) {
      var obj = null;
      if ("nsc" == type) {
        var obj = new Abenteuer();
        obj.func.type = type;
        //Auftraggeber
        $(".main .maincontent .adventure_row_nsc SELECT").each(function(id) {
          obj.func.auftraggeber[id] = $(this).val();
        });
      } else if ("group" == type) {
        var obj = new Abenteuer();
        obj.func.type = type;
        $(".main .maincontent .adventure_row_nsc_group SELECT").each(function(id) {
          obj.func.gegenspieler[id] = $(this).val();
        });
        $(".main .maincontent .adventure_row_nsc_boss SELECT").each(function(id) {
          obj.func.gegenspieler[obj.func.gegenspieler.length] = $(this).val();
        });
      } else if ("item" == type) {
        var obj = new Abenteuer();
        obj.func.type = type;
        obj.func.auftraggebersollen[0] = 0;
        $(".main .maincontent .adventure_row_nsc_item SELECT").each(function(id) {
          obj.func.auftraggebersollen[id+1] = $(this).val();
        });
      } else if ("hotel" == type) {
        var obj = new Hotel();
        $(".main .maincontent .adventure_hotel_name SELECT").each(function(id) {
          obj.func.name[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t4 SELECT").each(function(id) {
          obj.func.liegt[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t5 SELECT").each(function(id) {
          obj.func.team[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t6 SELECT").each(function(id) {
          obj.func.zimmer[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t7 SELECT").each(function(id) {
          obj.func.fruhstuck[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t8 SELECT").each(function(id) {
          obj.func.betten[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t9 SELECT").each(function(id) {
          obj.func.ausgecheckt[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t9 SELECT").each(function(id) {
          obj.func.sanitar[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t10 SELECT").each(function(id) {
          obj.func.bezahlt[id] = $(this).val();
        });
        $(".main .maincontent #places_row_hotel_t11 SELECT").each(function(id) {
          obj.func.besonders[id] = $(this).val();
        });
        
      } else if ("shop" == type) {
        var obj = new Shop();
        $(".main .maincontent .adventure_shop_name SELECT").each(function(id) {
          obj.func.name[id] = $(this).val();
        });
        $(".main .maincontent #places_row_shop_t4 SELECT").each(function(id) {
          obj.func.steht[id] = $(this).val();
        });
        $(".main .maincontent #places_row_shop_t5 SELECT").each(function(id) {
          obj.func.theke[id] = $(this).val();
        });
        $(".main .maincontent #places_row_shop_t6 SELECT").each(function(id) {
          obj.func.waren[id] = $(this).val();
        });
        $(".main .maincontent #places_row_shop_t7 SELECT").each(function(id) {
          obj.func.bezahlt[id] = $(this).val();
        });
      } else if ("char" == type) {
        obj = new Char();
        obj.func.name = encodeURIComponent($(".main .maincontent .charcontainer .charimage .input").val());
        obj.func.beschreibung = encodeURIComponent($(".main .maincontent .charcontainer .charvalues .description").val());
        obj.func.konzept = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=konzept]").val());
        obj.func.dilemma = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=dilemma]").val());
        obj.func.aspekte = encodeURIComponent($(".main .maincontent .charcontainer .charvalues .aspekte").val());
        obj.func.methoden.flink = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=flink]").val());
        obj.func.methoden.scharfsinnig = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=scharfsinnig]").val());
        obj.func.methoden.tollkuhn = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=tollkuhn]").val());
        obj.func.methoden.tuckisch = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=tuckisch]").val());
        obj.func.methoden.kraftvoll = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=kraftvoll]").val());
        obj.func.methoden.sorgfaltig = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=sorgfaltig]").val());
        obj.func.stunts = encodeURIComponent($(".main .maincontent .charcontainer .charvalues .stunts").val());
        obj.func.konsequenzen.leicht = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=leicht]").val());
        obj.func.konsequenzen.mittel = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=mittel]").val());
        obj.func.konsequenzen.schwer = encodeURIComponent($(".main .maincontent .charcontainer .charvalues input[name=schwer]").val());
        obj.func.erholungsrate = encodeURIComponent($(".main .maincontent .charcontainer .charvalues  .erholungsrate").val());
        obj.func.stress = $(".charcontainer .charvalues .stress .stressbar span.clicked").length;
        obj.func.img = encodeURIComponent($(".charimageimg img").attr("src"));
      }  else if ("card" == type) {
        obj = $(".allcards").html();
      }  else {
        var obj = new Abenteuer();
        obj.func.type = type;
        
        //Startpunkt
        obj.func.startpunkt[0] = $(".main .maincontent .adventure_row_startpunkt SELECT").val();
        $(".main .maincontent .adventure_row_startpunkt_sub SELECT").each(function(id) {
          obj.func.startpunkt[id+1] = $(this).val();
        });
        
        //Auftraggeber
        $(".main .maincontent .adventure_row_auftraggeber SELECT").each(function(id) {
          obj.func.auftraggeber[id] = $(this).val();
        });
        
        //Ort des aufeinandertreffens
        obj.func.auftraggeberanort[0] = $(".main .maincontent .adventure_row_auftraggeberanort SELECT").val();
        
        //Die Helden sollen dem Auftraggeber folgendes
        obj.func.auftraggebersollen[0] = $(".main .maincontent .adventure_row_folgendes SELECT").val();
        $(".main .maincontent .adventure_row_folgendes_sub SELECT").each(function(id) {
          obj.func.auftraggebersollen[id+1] = $(this).val();
        });
        
        //und es dort
        obj.func.undesdort[0] = $(".main .maincontent .adventure_row_undesdort SELECT").val();
        $(".main .maincontent .adventure_row_undesdort_sub SELECT").each(function(id) {
          obj.func.undesdort[id+1] = $(this).val();
        });
        
        //Transportmittel
        obj.func.transportmittel[0] = $(".main .maincontent .adventure_row_transportmittel SELECT").val();
        
        //Zielpunkt der Reise
        obj.func.zielpunkt[0] = $(".main .maincontent #zielpunkt_resultvalue").val();
        
        // Der oder die Gegenspieler
        $(".main .maincontent .adventure_row_gegenspieler_group SELECT").each(function(id) {
          obj.func.gegenspieler[id] = $(this).val();
        });
        $(".main .maincontent .adventure_row_gegenspieler_boss SELECT").each(function(id) {
          obj.func.gegenspieler[obj.func.gegenspieler.length] = $(this).val();
        });
        
        //Komplikationen
        obj.func.komplikationen[0] = $(".main .maincontent .adventure_row_komplikationen SELECT").val();
        $(".main .maincontent .adventure_row_komplikationen_sub SELECT").each(function(id) {
          obj.func.komplikationen[id+1] = $(this).val();
        });
        
        //Abschließend sollen die Helden
        obj.func.abschliessend[0] = $(".main .maincontent .adventure_row_abschliessend SELECT").val();
        $(".main .maincontent .adventure_row_abschliessend_sub SELECT").each(function(id) {
          obj.func.abschliessend[id+1] = $(this).val();
        });
        
        //aus folgender Örtlichkeit
        obj.func.ortlichkeit[0] = $(".main .maincontent .adventure_row_ortlichkeit SELECT").val();
        $(".main .maincontent .adventure_row_ortlichkeit_sub SELECT").each(function(id) {
          obj.func.ortlichkeit[id+1] = $(this).val();
        });
        if ($(".main .maincontent .adventure_row_ortlichkeit_sub SELECT").length > 0) {
        //Auffüllen mit 0 damit der Export funktioniert und unterscheiden kann dass es ein shop ist
          while(obj.func.ortlichkeit.length < 11) {
            obj.func.ortlichkeit[obj.func.ortlichkeit.length] = 0;
          }
        }
        
        //an diesem ort
        obj.func.andiesemort[0] = $(".main .maincontent .adventure_row_andiesemort SELECT").val();
        $(".main .maincontent .adventure_row_andiesemort_sub SELECT").each(function(id) {
          obj.func.andiesemort[id+1] = $(this).val();
        });
        
        //Besonderheiten während der Mission
        obj.func.besonderheiten[0] = $(".main .maincontent .adventure_row_besonderheiten SELECT").val();
        $(".main .maincontent .adventure_row_besonderheiten_sub SELECT").each(function(id) {
          obj.func.besonderheiten[id+1] = $(this).val();
        });
        
        //Belohnung
        obj.func.belohnung[0] = $(".main .maincontent .adventure_row_belohnung SELECT").val();
        $(".main .maincontent .adventure_row_belohnung_sub SELECT").each(function(id) {
          obj.func.belohnung[id+1] = $(this).val();
        });
      }
      if (obj.func) {
        var enc = JSON.stringify(obj.func);
        enc = encodeURIComponent(enc);
        var win = window.open('./export.html?export=' + enc, '_blank');
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
        }
      } else {
        enc = encodeURIComponent(obj);
        enc = encodeURIComponent(enc);
        var win = window.open('./export.html?display=' + enc, '_blank');
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
        }
      }
    }
  },
  home : {
    content : function() {
      var out = "<div class='table'>";
      out += "<div class='tr'><div class='th perc100'><span class='border'>Das Rollenspiel</span><span class='text'>Das Rollenspiel</span></div></div>";
      //out += "<div class='tr'><div class='th perc100'>abcdefghijklmnopqrstuvwxyz</div></div>";
      out += "<div class='tr'><div class='td'>";
      out += " <div class='book'><img src='./img/book.png'></div>";
      out += "</div></div>";
      out += "<div class='tr'><div class='th perc100'><span class='disclaimer'>";
      out += "Werde Teil der Daedalic Community:</br>" +
        "<a href='https://www.facebook.com/daedalic'>https://www.facebook.com/daedalic</a></br>" +
        "<a href='https://twitter.com/daedalic'>https://twitter.com/daedalic</a></br>" +
        "<a href='https://www.youtube.com/user/DaedalicEnt'>https://www.youtube.com/user/DaedalicEnt</a></br></br>" + 
        "Deponia - Das Rollenspiel: erschienen im Uhrwerk Verlag</br>" +
        "<a href='http://www.uhrwerk-verlag.de/'>http://www.uhrwerk-verlag.de/</a></br></br>" +
        "</span>";
      out += "</div></div>";
      out += "</div>"
      $(".main .maincontent").html(out);
    },
  },
  textadventure : {
    content : function(intype) {
      window.open("./adventure/" + intype + "/index.html", "ta");
      //var out = "<iframe src='./adventure/" + intype + "/index.html' width=100% height=345 scrolling=no/>"
      //$(".main .maincontent").html(out);
    },
  },
  char : {
    content : function() {
      var out = "<div class='table'>";
      out += "<div class='tr'><div class='th perc100'><span class='border'>Charakter-Generator</span><span class='text'>Charakter-Generator</span></div></div>";
      out += "<div class='tr'><div class='td'>";
      out += instance.func.char.select();
      out += "</div></div>";
      out += "<div class='tr adventure_row_export'><div class='td random' colspan='2' align='center'><div class='button export'>Exportieren</div></div></div>";
      out += "</div>"
      $(".main .maincontent").html(out);
      $(".charimageselector .arrow").click(function() {
        var id = 0;
        var step = 1;
		var maxid = 45;
        if ($(this).hasClass("right")) {
          step = -1;
        }
        var old = $(".charimageimg img").attr("src");
        if (old && old.indexOf("base64") == -1) {
          var splits = old.split("/");
          if (splits.length > 1) {
            old = splits[splits.length -1];
          }
          old = old.split("\.")[0];
          if (old) {
            old = parseInt(old);
            var newid = old + step; 
            if (newid < 1) {
              newid = maxid;
            } 
            if (newid > maxid) {
              newid = 1;
            }
            $(".charimageimg img").attr("src", "./img/char/default/" + newid + ".png");
          }
        } else {
          $(".charimageimg img").attr("src", "./img/char/default/1.png");
        } 
      });
      $(".charimageselector .center span").click(function(e) {
        e.preventDefault();
        $(".charimageselector .center INPUT").trigger('click');
      });
      $(".charimageselector .center INPUT").change(function(e) {
        $(".charimageimg img").attr("src", $(this).val());
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          $(".charimageimg img").attr("src", reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      });
      $(".main .maincontent .table .button.export").click(function() {
        instance.func.event.export("char");
      });
      
      $(".charcontainer .charvalues .stress .stressbar span").click(function() {
        $(this).toggleClass("clicked");
      });
      
    },
    select : function(charid) {
      var out = "<div class='table'><div class='tr'><div class='td'>";
      out += "<div class='charcontainer'>";
      out += "  <div class='charimage'>";
      out += "    <input class='input' type='text'/>";
      out += "    <div class='charimageimg'>";
      out += "      <img src='./img/char/default/1.png' width=100%/>";
      out += "    </div>";
      out += "    <div class='charimageselector'><div class='arrow left'></div><div class='center'><span>Aus Datei</span><input type='file'/></div><div class='arrow right'></div></div>";
      out += "  </div>";
      out += " <div class='charvalues'>";
      out += " <div class='table'>";
      out += "  <div class='tr'><div class='td label'>Beschreibung:</div></div>";
      out += "  <div class='tr'><div class='td'><textarea class='description'/></div></div>";
      out += "  <div class='tr'><div class='td'><label for='konzept'>Konzept:</label><input name='konzept' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td'><label for='dilemma'>Dilemma:</label><input name='dilemma' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td label'>Weitere Aspekte:</div></div>";
      out += "  <div class='tr'><div class='td'><textarea class='aspekte'/></div></div>";
      out += "  <div class='tr'><div class='td label'>Methoden:</div></div>";
      out += "  <div class='tr'><div class='td small'><label for='flink'>Flink:</label><input name='flink' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='scharfsinnig'>Scharfsinnig:</label><input name='scharfsinnig' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='tollkuhn'>Tollk&uuml;hn:</label><input name='tollkuhn' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='tuckisch'>T&uuml;ckisch:</label><input name='tuckisch' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='kraftvoll'>Kraftvoll:</label><input name='kraftvoll' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='sorgfaltig'>Sorgf&auml;ltig:</label><input name='sorgfaltig' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td label'>Stunts:</div></div>";
      out += "  <div class='tr'><div class='td'><textarea class='stunts'/></div></div>";
      out += "  <div class='tr'><div class='td label'>Konsequenzen:</div></div>";
      out += "  <div class='tr'><div class='td small'><label for='leicht'>Leicht(2):</label><input name='leicht' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='mittel'>Mittel(4):</label><input name='mittel' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td small'><label for='schwer'>Schwer(6):</label><input name='schwer' type='text'/></div></div>";
      out += "  <div class='tr'><div class='td label'>Erholungsrate: <input class='erholungsrate' value='3' /></div></div>";
      out += "  <div class='tr'><div class='td'><div class='stress'><span>Stress:</span><div class='stressbar'><span/><span/><span/></div></div></div></div>";
      out += "  </div>";
      out += " </div>";
      out += "</div>";
      out += "</div></div></div>";
      return out;
    }
  },
  item : {
    content : function(intype) {
      var out = "<div class='table'>";
      if(intype == "item"){
        out += "<div class='tr'><div class='th perc100'><span class='border'>Gegenstands-Generator</span><span class='text'>Gegenstands-Generator</span></div></div>";
        out += "<div class='tr adventure_row_all'><div class='td random perc100' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
        out += instance.func.adventure.renderItemTable("adventure_row_nsc_item", "Zuf&auml;lliger Gegenstand");
      } else if(intype == "card") {
        out += "<div class='tr'><div class='th perc100'><span class='border'>Item-Karten-Generator</span><span class='text'>Item-Karten-Generator</span></div></div>";
        out += "<div class='tr'><div class='th perc100'>";
        out += "  <div class='itemcardimage cardsel'>";
        out += "    <div class='itemcardimg'>";
        out += "      <img src='./img/cards/1.png' width=100%/>";
        out += "    </div>";
        out += "    <div class='itemcardselector'><div class='arrow left'></div><div class='center'><span>Aus Datei</span><input type='file'/></div><div class='arrow right'></div></div>";
        out += "  </div>";
        out += "</div></div>";
        out += "<div class='tr'><div class='td' colspan='2' align='center'><div class='button add'>Hinzuf&uuml;gen</div></div></div>";
        out += "<div class='tr'><div class='td' colspan='2' align='center'><div class='allcards'></div></div></div>";
      }
      out += "<div class='tr adventure_row_export'><div class='td random' colspan='2' align='center'><div class='button export'>Exportieren</div></div></div>";
      out += "</div>"
      $(".main .maincontent").html(out);
      
      $(".itemcardselector .arrow").click(function() {
        var id = 0;
        var step = 1;
        var max = 15;
        if ($(this).hasClass("right")) {
          step = -1;
        }
        var old = $(".cardsel .itemcardimg img").attr("src");
        if (old && old.indexOf("base64") == -1) {
          var splits = old.split("/");
          if (splits.length > 1) {
            old = splits[splits.length -1];
          }
          old = old.split("\.")[0];
          if (old) {
            old = parseInt(old);
            var newid = old + step; 
            if (newid < 1) {
              newid = max;
            } 
            if (newid > max) {
              newid = 1;
            }
            $(".cardsel .itemcardimg img").attr("src", "./img/cards/" + newid + ".png");
          }
        } else {
          $(".cardsel .itemcardimg img").attr("src", "./img/char/1.png");
        } 
      });
      $(".itemcardselector .center span").click(function(e) {
        e.preventDefault();
        $(".itemcardselector .center INPUT").trigger('click');
      });
      $(".itemcardselector .center INPUT").change(function(e) {
        $(".cardsel .itemcardimg img").attr("src", $(this).val());
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          $(".cardsel .itemcardimg img").attr("src", reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      });
      
      $(".main .maincontent .table .button.add").click(function() {
        var current = "";
        var out = "<div class='itemcardimage'><div class='itemcardimg'><img src='" + $(".itemcardimg IMG").attr("src") + "' width=100%/></div></div>";
        $(".allcards").append(out);
        $(".allcards .itemcardimage").unbind("click").click(function() {
          $(this).remove();
        });
      });
      
      $(".allcards .itemcardimage").click(function() {
        $(this).remove();
      });
      
      $(".main .maincontent .table .button.export").click(function() {
        instance.func.event.export(intype);
      });
      
    }
  },
  nsc : {
    content : function(intype) {
      var out = "<div class='table'>";
      if (intype == "nsc") {
        out += "<div class='tr'><div class='th perc100'><span class='border'>NSC-Generator</span><span class='text'>NSC-Generator</span></div></div>";
        out += "<div class='tr adventure_row_all'><div class='td random perc100' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
        out += instance.func.adventure.renderNSCTable("adventure_row_nsc", "Nicht Spielbarer Charakter");
      } else if(intype == "group"){
        out += "<div class='tr'><div class='th perc100'><span class='border'>Gruppen-Generator</span><span class='text'>Gruppen-Generator</span></div></div>";
        out += "<div class='tr adventure_row_all'><div class='td random perc100' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
        out += "<div class='tr'><div class='td label perc100'>Gruppierung</div></div>";
        out += instance.func.adventure.renderNSCGroupTable("adventure_row_nsc_group");
        out += "<div class='tr'><div class='td caption perc100'>Deren Boss:</div></div>";
        out += instance.func.adventure.renderNSCTable("adventure_row_nsc_boss");
      }
      out += "<div class='tr adventure_row_export'><div class='td random' colspan='2' align='center'><div class='button export'>Exportieren</div></div></div>";
      out += "</div>"
      $(".main .maincontent").html(out);
      
      $(".main .maincontent .table .button.submit").click(function() {
        instance.func.random.tr(this);
      });
      $(".main .maincontent .table .button.submitall").click(function() {
        $(".main .maincontent .table .button.submit").click();
      });
      
      $(".main .maincontent .table .button.export").click(function() {
        instance.func.event.export(intype);
      });
      
    }
  },
  places : {
    content : function(intype) {
      var out = "<div class='table'>";
      if (intype == "hotel") {
        out += "<div class='tr'><div class='th perc100'><span class='border'>Hotel-Generator</span><span class='text'>Hotel-Generator</span></div></div>";
        out += "<div class='tr adventure_row_all'><div class='td random perc100' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
        out += instance.func.places.renderHotelTable("places_row_hotel");
      } else if (intype == "shop"){
        out += "<div class='tr'><div class='th perc100'><span class='border'>Shop-Generator</span><span class='text'>Shop-Generator</span></div></div>";
        out += "<div class='tr adventure_row_all'><div class='td random perc100' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
        out += instance.func.places.renderShopTable("places_row_shop");
      }
      out += "<div class='tr adventure_row_export'><div class='td random' colspan='2' align='center'><div class='button export'>Exportieren</div></div></div>";
      out += "</div>"
      $(".main .maincontent").html(out);
      
      $(".main .maincontent .table .button.submit").click(function() {
        instance.func.random.tr(this);
      });
      $(".main .maincontent .table .button.submitall").click(function() {
        $(".main .maincontent .table .button.submit").click();
      });
      
      $(".main .maincontent .table .button.export").click(function() {
        instance.func.event.export(intype);
      });
    },
    renderShopTable : function(id, aslabel) {
      var out = "";
      out += "<div class='tr " + id + " " + aslabel + "'><div class='td label perc100'>" + data.shops.tables.t1.name + "</div></div>";
      out += "<div class='tr " + id + " " + aslabel + " adventure_shop_name'>";
      out += " <div class='td select'>";
      out += " <div class='sel' style='width:35%'><select id='adventure_step_2'>";
      $(data.shops.tables.t1.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:28%'><select id='adventure_step_3'>";
      $(data.shops.tables.t2.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:35%'><select id='adventure_step_4'>";
      $(data.shops.tables.t3.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      
      for (var i = 4; i < 8; i++) {
        var tab = data.shops.tables["t" + i];
        out += "<div class='tr " + id + " " + aslabel + "'><div class='td label perc100'>" + tab.name + "</div></div>";
        out += "<div class='tr " + id +" " + aslabel + "' id='" + id + "_t" + i + "'>";
        out += " <div class='td select'><div class='sel'><select class='adventure_step_1'>";
        $(tab.options).each(function() {
          out += "<option value='" + this.id + "'>" + this.name + "</option>";
        });
        out += " </select></div></div>";
        out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
        out += "</div>";
      }
      
      return out;
    },
    renderHotelTable : function(id, aslabel) {
      var out = "";
      out += "<div class='tr " + id + " " + aslabel + "'><div class='td label perc100'>" + data.hotels.tables.t1.name + "</div></div>";
      out += "<div class='tr " + id + " " + aslabel + " adventure_hotel_name'>";
      out += " <div class='td select'>";
      out += " <div class='sel' style='width:35%'><select id='adventure_step_2'>";
      $(data.hotels.tables.t1.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:28%'><select id='adventure_step_3'>";
      $(data.hotels.tables.t2.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:35%'><select id='adventure_step_4'>";
      $(data.hotels.tables.t3.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      for (var i = 4; i < 13; i++) {
        var tab = data.hotels.tables["t" + i];
        out += "<div class='tr " + id + " " + aslabel + "'><div class='td label' colspan=2>" + tab.name + "</div></div>";
        out += "<div class='tr " + id +" " + aslabel + "' id='" + id + "_t" + i + "'>";
        out += " <div class='td select'><div class='sel'><select class='adventure_step_1'>";
        $(tab.options).each(function() {
          out += "<option value='" + this.id + "'>" + this.name + "</option>";
        });
        out += " </select></div></div>";
        out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
        out += "</div>";
      }
      
      return out;
    },        
  },
  adventure : {
    content : function(intype) {
      var ifa = instance.func.adventure;
      var dat = data.adventures.tables;
      var type = parseInt(intype);
      var adv = data.adventures.types[parseInt(type)];
      var out = "<div class='table'>";
      out += "<div class='tr'><div class='th perc100'><span class='border'>" + adv.name + "</span><span class='text'>" + adv.name + "</span></div></div>";
      out += "<div class='tr adventure_row_all'><div class='td random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></div></div>";
      
      if ([0,1,2,3].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_startpunkt", "Der Startpunkt der Reise ...", null, dat.t1, function(elem) {
          if ($.inArray(type, elem.regions) > -1) {
            return "<option value='" + elem.id + "'>" + elem.name + "</option>";
          }
          return "";
        });
      }
      if ([0,1,2,3].indexOf(type) > -1) {
        out += ifa.renderNSCTable("adventure_row_auftraggeber", "Der Auftraggeber ...");
      }
      if ([0,1,2].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_auftraggeberanort", dat.t9.name, null, dat.t9);
      }
      //Ab hier speziell für Reiseabenteuer
      if ([0].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_folgendes", dat.t17.name, null, dat.t17);
                
        out += ifa.renderOptionTable("adventure_row_zielpunkt", dat.t18.name, dat.t18.caption, dat.t18);
        out += "<div class='tr'><div class='td perc100'><input type='hidden' id='zielpunkt_resultvalue'/></div></div>";
        out += ifa.renderOptionTable("adventure_row_undesdort", dat.t19.name, null, dat.t19);
        out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t20.name, null, dat.t20);
        out += ifa.renderOptionTable("adventure_row_transportmittel", dat.t21.name, null, dat.t21);
        out += "<div class='tr'><div class='td label perc100'>Die oder der Gegenspieler ...</div></div>";
        out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
        out += "<div class='tr'><div class='td caption perc100'>Deren Boss:</div></div>";
        out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
        out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t22.name, null, dat.t22);
      }
      
      //Ab hier speziell für Überseeabenteuer
      if ([1].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_folgendes", dat.t23.name, null, dat.t23);
                
        out += ifa.renderOptionTable("adventure_row_zielpunkt", dat.t24.name, null, dat.t24, function(elem) {
          return "<option value='" + elem.id + "'>" + elem.name + "</option>";
        });
        out += "<div class='tr'><div class='td perc100'><input type='hidden' id='zielpunkt_resultvalue'/></div></div>";
        out += ifa.renderOptionTable("adventure_row_undesdort", dat.t25.name, null, dat.t25);
        out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t26.name, null, dat.t26);
        out += ifa.renderOptionTable("adventure_row_transportmittel", dat.t27.name, null, dat.t27);
        out += "<div class='tr'><div class='td label perc100'>Die oder der Gegenspieler ...</div></div>";
        out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group", null, true);
        out += "<div class='tr'><div class='td caption perc100'>Deren Boss:</div></div>";
        out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
        out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t28.name, null, dat.t28);
      }
      
      //Ab hier speziell für Stadtabenteuer
      if ([2].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_folgendes", dat.t29.name, null, dat.t29);
        out += ifa.renderOptionTable("adventure_row_ortlichkeit", dat.t30.name, null, dat.t30);
        out += "<div class='tr'><div class='td label perc100'>Die oder der Gegenspieler ...</div></div>";
        out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
        out += "<div class='tr'><div class='td caption perc100'>Deren Boss:</div></div>";
        out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
        out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t31.name, null, dat.t31);
        out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t32.name, null, dat.t32);
        out += ifa.renderOptionTable("adventure_row_besonderheiten", dat.t33.name, null, dat.t33);
      }
      
      //Ab hier speziell für Wildnisabenteuer
      if ([3].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_auftraggeberanort", dat.t34.name, null, dat.t34);
        out += ifa.renderOptionTable("adventure_row_folgendes", dat.t35.name, null, dat.t35);
        out += ifa.renderOptionTable("adventure_row_andiesemort", dat.t36.name, null, dat.t36);
        out += ifa.renderOptionTable("adventure_row_undesdort", dat.t37.name, null, dat.t37);
        out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t38.name, null, dat.t38);
        out += ifa.renderOptionTable("adventure_row_transportmittel", dat.t39.name, null, dat.t39);
        out += "<div class='tr'><div class='td label perc100'>Die oder der Gegenspieler ...</div></div>";
        out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
        out += "<div class='tr'><div class='td caption perc100'>Deren Boss:</div></div>";
        out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
        out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t40.name, null, dat.t40);
      }
      
      if ([0,1,2,3].indexOf(type) > -1) {
        out += ifa.renderOptionTable("adventure_row_belohnung", dat.t16.name, null, dat.t16);
      }
      
      out += "<div class='tr adventure_row_export'><div class='td random' colspan='2' align='center'><div class='button export'>Exportieren</div></div></div>";
      
      out += "</div>"
      $(".main .maincontent").html(out);
      
      $(".main .maincontent .table .button.submit").click(function() {
        instance.func.random.tr(this);
      });
      
      $(".main .maincontent .table .button.submitall").click(function() {
        $(".main .maincontent .table .button.submit").click();
      });
      
      $(".main .maincontent .table .button.export").click(function() {
        instance.func.event.export(type);
      });
      
      //Reiseabenteuer
      if (type == 0) {
        //Startpunkt der Reise
        instance.func.event.select("adventure_row_startpunkt", dat.t1, function() {
          var target = $(".main .maincontent .table #adventure_row_zielpunkt SELECT")[0];
          if (target) {
            $(target).trigger("change");
          }
        });

        instance.func.event.select("adventure_row_folgendes", dat.t17);
        instance.func.event.select("adventure_row_undesdort", dat.t19);
        instance.func.event.select("adventure_row_abschliessend", dat.t20);
        
        //ZielPunkt der Reise
        $(".main .maincontent .table #adventure_row_zielpunkt SELECT").change(function() {
          //Ziel Punkt muss auf dem gleichen Kontinent liegen
          var theid = $(this).val();
          var result = $.grep(dat.t18.options, function(e){ return e.id == theid; })[0];
          var source = $(".main .maincontent .table #adventure_row_startpunkt SELECT")[0];
          if (source) {
            var sourceid = parseInt($(source).val());
            var targetid = sourceid + result.add;
            source = $.grep(dat.t1.options, function(e){ return e.id == sourceid; })[0]
            var target = $.grep(dat.t1.options, function(e){ return e.id == targetid; })[0];
            while(!target) {
              targetid++;
              if (targetid == sourceid) {
                targetid++;
              }
              target = $.grep(dat.t1.options, function(e){ return e.id == targetid; })[0];
            }
            var i =0;
            if (targetid == sourceid) {
              targetid++;
              target = $.grep(dat.t1.options, function(e){ return e.id == targetid; })[0];
            }
            while(target.continent != source.continent && i < 101) {
              targetid++;
              if (targetid == sourceid) {
                targetid++;
              }
              i++
              if (targetid >= dat.t1.options.length) {
                targetid = 1;
              }
              target = $.grep(dat.t1.options, function(e){ return e.id == targetid; })[0];
              
            }
            if(target) {
              $("#zielpunkt_resultvalue").val(target.id);
            }
          }
        });
        
        instance.func.event.select("adventure_row_komplikationen", dat.t22);
        instance.func.event.select("adventure_row_belohnung", dat.t16);
      }
      //Überseeeabenteuer
      if (type == 1) {
        //Startpunkt der Reise
        instance.func.event.select("adventure_row_startpunkt", dat.t1, function() {
          var target = $(".main .maincontent .table #adventure_row_zielpunkt SELECT")[0];
          if (target) {
            $(target).trigger("change");
          }
        });
        instance.func.event.select("adventure_row_folgendes", dat.t23);
        //ZielPunkt der Reise
        $(".main .maincontent .table #adventure_row_zielpunkt SELECT").change(function() {
          //Ziel Punkt muss auf dem gleichen Kontinent liegen
          var theid = parseInt($(this).val());
          theid -= 1;
          var result = $.grep(dat.t1.options, function(e){ return e.continent == theid; });
          var source = $(".main .maincontent .table #adventure_row_startpunkt SELECT")[0];
          if (source && result) {
            var sourceid = parseInt($(source).val());
            var targetid = instance.func.random.num(result.length);
            var target = result[targetid];
            while(sourceid == target.id) {
              targetid = instance.func.random.num(result.length);
              target = result[targetid];
            }
            if(target) {
              $("#zielpunkt_resultvalue").val(target.id);
            }
          }
        });
        instance.func.event.select("adventure_row_undesdort", dat.t25);       
        instance.func.event.select("adventure_row_abschliessend", dat.t26);
        instance.func.event.select("adventure_row_belohnung", dat.t16);
      }
      //Stadtabenteuer
      if (type == 2) {
        instance.func.event.select("adventure_row_folgendes", dat.t29);
        instance.func.event.select("adventure_row_ortlichkeit", dat.t30);
        instance.func.event.select("adventure_row_abschliessend", dat.t32);
        instance.func.event.select("adventure_row_besonderheiten", dat.t33);
        instance.func.event.select("adventure_row_komplikationen", dat.t31);
        instance.func.event.select("adventure_row_belohnung", dat.t16);
      }
      //Wildnisabenteuer
      if (type == 3) {
        instance.func.event.select("adventure_row_startpunkt", dat.t1);
        instance.func.event.select("adventure_row_folgendes", dat.t35);
        instance.func.event.select("adventure_row_andiesemort", dat.t36);
        instance.func.event.select("adventure_row_undesdort", dat.t37);
        instance.func.event.select("adventure_row_abschliessend", dat.t38);
        instance.func.event.select("adventure_row_komplikationen", dat.t40);
        instance.func.event.select("adventure_row_belohnung", dat.t16);
      }
    }, 
    renderOptionTable : function(id, name, caption, table, func) {
      var out = "";
      if (name) {
        out += "<div class='tr " + id +"'><div class='td label " + id +" perc100'>" + name + "</div></div>";
      }
      if (caption) {
        out += "<div class='tr " + id +"'><div class='td caption perc100'>" + caption + "</div></div>";
      }
      out += "<div class='tr " + id +"' id='" + id + "'>";
      out += " <div class='td select'><div class='sel'><select class='adventure_step_1'>";
      if (!func) {
        $(table.options).each(function() {
          out += "<option value='" + this.id + "'>" + this.name + "</option>";
        });
      } else {
        $(table.options).each(function() {
          out += func(this);
        });
      }
      out += " </select></div></div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      return out;
    },    
    renderNSCTable : function(id, label, caption) {
      var out = "";
      if (label) {
        out += "<div class='tr " + id + "'><div class='td label perc100'>" + label + "</div></div>";
      }
      if (caption) {
        out += "<div class='tr " + id + "'><div class='td caption perc100'>" + caption + "</div></div>";
      }
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div style='width:13%; display: inline-block;'>Name:</div>";
      out += " <div class='sel' style='width:20%'><select id='adventure_step_2'>";
      $(data.adventures.tables.t2.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div><div style='width:4%; display: inline-block'></div>";
      out += " <div class='sel' style='width:30%'><select id='adventure_step_3'>";
      $(data.adventures.tables.t3.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:30%'><select id='adventure_step_4'>";
      $(data.adventures.tables.t4.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td randon'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div style='width:13%; display: inline-block;'>Er ist ein:</div>";
      out += " <div class='sel' style='width:42%'><select id='adventure_step_2'>";
      $(data.adventures.tables.t5.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += " <div class='sel' style='width:43%'><select id='adventure_step_3'>";
      $(data.adventures.tables.t6.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td randon'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div style='width:13%; display: inline-block;'>Hobby:</div>";
      out += " <div class='sel' style='width:86%'><select id='adventure_step_2'>";
      $(data.adventures.tables.t7.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div style='width:13%; display: inline-block;'>Tick:</div>";
      out += " <div class='sel' style='width:86%'><select id='adventure_step_2'>";
      $(data.adventures.tables.t8.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      return out;
    },
    renderNSCGroupTable : function(id, label, water, caption) {
      var first = data.adventures.tables.t12;
      var last = data.adventures.tables.t13;
      
      if (water) {
        first = data.adventures.tables.t14;
          last = data.adventures.tables.t15;
      }
      
      var out = "";
      if (label) {
        out += "<div class='tr " + id + "'><div class='td label perc100'>" + label + "</div></div>";
      }
      if (caption) {
        out += "<div class='tr " + id + "'><div class='td caption perc100'>" + caption + "</div></div>";
      }
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div class='sel' style='width:45%'><select id='adventure_step_2'>";
      $(first.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div><div style='width:4%; display: inline-block'></div>";
      out += " <div class='sel' style='width:50%'><select id='adventure_step_3'>";
      $(last.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      return out;
    },
    renderItemTable : function(id, label, caption) {
      var first = data.adventures.tables.t10;
      var last = data.adventures.tables.t11;
      
      var out = "";
      if (label) {
        out += "<div class='tr " + id + "'><div class='td label' colspan=2>" + label + "</div></div>";
      }
      if (caption) {
        out += "<div class='tr " + id + "'><div class='td caption' colspan=2>" + caption + "</div></div>";
      }
      out += "<div class='tr " + id + "'>";
      out += " <div class='td select'>";
      out += " <div class='sel' style='width:45%'><select id='adventure_step_2'>";
      $(first.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div><div style='width:4%; display: inline-block'></div>";
      out += " <div class='sel' style='width:50%'><select id='adventure_step_3'>";
      $(last.options).each(function() {
        out += "<option value='" + this.id + "'>" + this.name + "</option>";
      });
      out += " </select></div>";
      out += "</div>";
      out += " <div class='td random'><div class='button submit'>Zuf&auml;llig</div></div>";
      out += "</div>";
      return out;
    }
  }
  }
  
}