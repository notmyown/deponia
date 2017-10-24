function Deponia(data) {
  var instance = this;
  this.func = { 
	init : function() {
		var out = "";
		// Dropdown für NSC Generatoren
		out += "<li id='menu-item-generator-nsc_nsc' class='menu-item nsc_generator'><a href='#'>NSC</a>";
		out += "<li id='menu-item-generator-nsc_group' class='menu-item nsc_generator'><a href='#'>Gruppierung</a>";
		out += "<li id='menu-item-generator-nsc_item' class='menu-item nsc_generator'><a href='#'>Gegenstand</a>";
		
		$("#menu-item-generator-nsc .sub-sub-menu").html(out);
		// Click Action setzen
		$("#menu-item-generator-nsc .sub-sub-menu .nsc_generator a").click(function() {
			var id = $(this).parent().attr('id').split("nsc_").pop();
			instance.func.nsc.content(id);
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
			$(".main .maincontent table .button.submitall").click();
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
		});
		
	},
	random : {
		num : function(size) {
			var min = 0
			var max = Math.floor(size);
			return Math.floor(Math.random() * (max - min)) + min;
		},
		tr : function(elem) {
			var tr = $(elem).closest("TR").find("SELECT").each(function() {
				var idx = instance.func.random.num($(this).children('option').length);
				$(this).children('option')[idx].selected = true;
				$(this).trigger("change");
			});
		},
	},
	event : {
		select : function(id, table, dosmth) {
			$(".main .maincontent table #" + id + " SELECT").change(function() {
				var theid = $(this).val();
				var result = $.grep(table.options, function(e){ return e.id == theid; })[0];
				//Gibt es ein Funktion
				$("." + id + "_sub").remove();
				if (result.sub) {
					var out = instance.func.adventure.renderOptionTable(id + "_sub", null, result.sub.name, result.sub);
					$(this).closest("TR").after(function() {return out;});
					$(".main .maincontent table #" + id + "_sub .button.submit").click(function() {
						instance.func.random.tr(this);
					});
					$(".main .maincontent table #" + id + "_sub .button.submit").click();
				}
				if (result.func) {
					var out = "";
					
					if (result.func == "item") {
						out += instance.func.adventure.renderItemTable(id + "_sub", null, "Gegenstand:");
					} else if (result.func == "nsc") {
						out += instance.func.adventure.renderNSCTable(id + "_sub", null, "NSC:");
					} else if (result.func == "group_land") {
						out += instance.func.adventure.renderNSCGroupTable(id + "_sub", null, false, "Gruppierung:");
						out += "<tr class='" + id + "_sub'><td class='caption' colspan=2>Deren Boss:</td></tr>";
						out += instance.func.adventure.renderNSCTable(id + "_sub");
					} else if (result.func == "hotel") {
						out += instance.func.places.renderHotelTable(id + "_sub", "inAdventure");
					} else if (result.func == "shop") {
						out += instance.func.places.renderShopTable(id + "_sub", "inAdventure");
					}
					
					$(this).closest("TR").after(function() {return out;});
					$(".main .maincontent table ." + id + "_sub .button.submit").click(function() {
						instance.func.random.tr(this);
					});
					$(".main .maincontent table ." + id + "_sub .button.submit").click();
				}
				if (dosmth) {
					dosmth();
				}
			});
		},
		export : function(type) {
			var obj = new Abenteuer();
			obj.type = type;
			
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
			obj.func.auftraggeberanort = $(".main .maincontent .adventure_row_auftraggeberanort SELECT").val();
			
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
			obj.func.transportmittel = $(".main .maincontent .adventure_row_transportmittel SELECT").val();
			
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
			console.log(obj);
			var enc = JSON.stringify(obj);
			enc = encodeURIComponent(enc);
			console.log(enc);
			var win = window.open('./export.html?export=' + enc, '_blank');
			if (win) {
				//Browser has allowed it to be opened
				win.focus();
			} else {
				//Browser has blocked it
				alert('Please allow popups for this website');
			}
		}
	},
	nsc : {
		content : function(intype) {
			var out = "<table>";
			if (intype == "nsc") {
				out += "<tr><th colspan=2>NSC -Generator</th></tr>";
				out += "<tr class='adventure_row_all'><td class='random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></td></tr>";
				out += instance.func.adventure.renderNSCTable("adventure_row_nsc", "Nicht Spielbarer Charackter");
			} else if(intype == "group"){
				out += "<tr><th colspan=2>Gruppen -Generator</th></tr>";
				out += "<tr class='adventure_row_all'><td class='random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></td></tr>";
				out += "<tr><td class='label' colspan=2>Gruppierung</td></tr>";
				out += instance.func.adventure.renderNSCGroupTable("adventure_row_nsc_group");
				out += "<tr><td class='caption' colspan=2>Deren Boss:</td></tr>";
				out += instance.func.adventure.renderNSCTable("adventure_row_nsc_boss");
			} else if(intype == "item"){
				out += "<tr><th colspan=2>Gegenstands -Generator</th></tr>";
				out += instance.func.adventure.renderItemTable("adventure_row_nsc_item", "Zuf&auml;lliger Gegenstand");
			}
			out += "</table>"
			$(".main .maincontent").html(out);
			
			$(".main .maincontent table .button.submit").click(function() {
				instance.func.random.tr(this);
			});
			$(".main .maincontent table .button.submitall").click(function() {
				$(".main .maincontent table .button.submit").click();
			});
		}
	},
	places : {
		content : function(intype) {
			var out = "<table>";
			if (intype == "hotel") {
				out += "<tr><th colspan=2>Hotel -Generator</th></tr>";
				out += "<tr class='adventure_row_all'><td class='random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></td></tr>";
				out += instance.func.places.renderHotelTable("places_row_hotel");
			} else if (intype == "shop"){
				out += "<tr><th colspan=2>Shop -Generator</th></tr>";
				out += "<tr class='adventure_row_all'><td class='random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></td></tr>";
				out += instance.func.places.renderShopTable("places_row_shop");
			}
			out += "</table>"
			$(".main .maincontent").html(out);
			
			$(".main .maincontent table .button.submit").click(function() {
				instance.func.random.tr(this);
			});
			$(".main .maincontent table .button.submitall").click(function() {
				$(".main .maincontent table .button.submit").click();
			});
		},
		renderShopTable : function(id, aslabel) {
			var out = "";
			out += "<tr class='" + id + " " + aslabel + "'><td class='label' colspan=2>" + data.shops.tables.t1.name + "</td></tr>";
			out += "<tr class='" + id + " " + aslabel + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			
			for (var i = 4; i < 8; i++) {
				var tab = data.shops.tables["t" + i];
				out += "<tr class='" + id + " " + aslabel + "'><td class='label' colspan=2>" + tab.name + "</td></tr>";
				out += "<tr class='" + id +" " + aslabel + "' id='" + id + "_t4'>";
				out += " <td class='select'><div class='sel'><select class='adventure_step_1'>";
				$(tab.options).each(function() {
					out += "<option value='" + this.id + "'>" + this.name + "</option>";
				});
				out += " </select></div></td>";
				out += " <td class='random'><div class='button submit'>Zuf&auml;llig</div></td>";
				out += "</tr>";
			}
			
			return out;
		},
		renderHotelTable : function(id, aslabel) {
			var out = "";
			out += "<tr class='" + id + " " + aslabel + "'><td class='label' colspan=2>" + data.hotels.tables.t1.name + "</td></tr>";
			out += "<tr class='" + id + " " + aslabel + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			for (var i = 4; i < 13; i++) {
				var tab = data.hotels.tables["t" + i];
				out += "<tr class='" + id + " " + aslabel + "'><td class='label' colspan=2>" + tab.name + "</td></tr>";
				out += "<tr class='" + id +" " + aslabel + "' id='" + id + "_t4'>";
				out += " <td class='select'><div class='sel'><select class='adventure_step_1'>";
				$(tab.options).each(function() {
					out += "<option value='" + this.id + "'>" + this.name + "</option>";
				});
				out += " </select></div></td>";
				out += " <td class='random'><div class='button submit'>Zuf&auml;llig</div></td>";
				out += "</tr>";
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
			var out = "<table>";
			out += "<tr><th colspan=2>" + adv.name + "</th></tr>";
			out += "<tr class='adventure_row_all'><td class='random' colspan='2' align='center'><div class='button submitall'>Zuf&auml;llig</div></td></tr>";
			
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
				out += ifa.renderOptionTable("adventure_row_auftraggeberanort", dat.t9.name, null, dat.t9);
			}
			//Ab hier speziell für Reiseabenteuer
			if ([0].indexOf(type) > -1) {
				out += ifa.renderOptionTable("adventure_row_folgendes", dat.t17.name, null, dat.t17);
								
				out += ifa.renderOptionTable("adventure_row_zielpunkt", dat.t18.name, "Das Ziel der Reise muss auf dem gleichen Kontinent wie der Startpunkt liegen.", dat.t18);
				out += "<tr><td colspan=2 ><input type='hidden' id='zielpunkt_resultvalue'/></td></tr>";
				out += ifa.renderOptionTable("adventure_row_undesdort", dat.t19.name, null, dat.t19);
				out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t20.name, null, dat.t20);
				out += ifa.renderOptionTable("adventure_row_transportmittel", dat.t21.name, null, dat.t21);
				out += "<tr><td class='label' colspan=2>Die oder der Gegenspieler ...</td></tr>";
				out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
				out += "<tr><td class='caption' colspan=2>Deren Boss:</td></tr>";
				out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
				out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t22.name, null, dat.t22);
			}
			
			//Ab hier speziell für Überseeabenteuer
			if ([1].indexOf(type) > -1) {
				out += ifa.renderOptionTable("adventure_row_folgendes", dat.t23.name, null, dat.t23);
								
				out += ifa.renderOptionTable("adventure_row_zielpunkt", "Zielpunkt der Reise ...", null, dat.t24, function(elem) {
					return "<option value='" + elem.id + "'>" + elem.name + "</option>";
				});
				out += "<tr><td colspan=2 ><input type='hidden' id='zielpunkt_resultvalue'/></td></tr>";
				out += ifa.renderOptionTable("adventure_row_undesdort", dat.t25.name, null, dat.t25);
				out += ifa.renderOptionTable("adventure_row_abschliessend", dat.t26.name, null, dat.t26);
				out += ifa.renderOptionTable("adventure_row_transportmittel", dat.t27.name, null, dat.t27);
				out += "<tr><td class='label' colspan=2>Die oder der Gegenspieler ...</td></tr>";
				out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
				out += "<tr><td class='caption' colspan=2>Deren Boss:</td></tr>";
				out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
				out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t28.name, null, dat.t28);
			}
			
			//Ab hier speziell für Stadtabenteuer
			if ([2].indexOf(type) > -1) {
				out += ifa.renderOptionTable("adventure_row_folgendes", dat.t29.name, null, dat.t29);
				out += ifa.renderOptionTable("adventure_row_ortlichkeit", dat.t30.name, null, dat.t30);
				out += "<tr><td class='label' colspan=2>Die oder der Gegenspieler ...</td></tr>";
				out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
				out += "<tr><td class='caption' colspan=2>Deren Boss:</td></tr>";
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
				out += "<tr><td class='label' colspan=2>Die oder der Gegenspieler ...</td></tr>";
				out += ifa.renderNSCGroupTable("adventure_row_gegenspieler_group");
				out += "<tr><td class='caption' colspan=2>Deren Boss:</td></tr>";
				out += ifa.renderNSCTable("adventure_row_gegenspieler_boss");
				out += ifa.renderOptionTable("adventure_row_komplikationen", dat.t40.name, null, dat.t40);
			}
			
			if ([0,1,2,3].indexOf(type) > -1) {
				out += ifa.renderOptionTable("adventure_row_belohnung", dat.t16.name, null, dat.t16);
			}
			
			out += "<tr class='adventure_row_export'><td class='random' colspan='2' align='center'><div class='button export'>Exportieren</div></td></tr>";
			
			out += "</table>"
			$(".main .maincontent").html(out);
			
			$(".main .maincontent table .button.submit").click(function() {
				instance.func.random.tr(this);
			});
			
			$(".main .maincontent table .button.submitall").click(function() {
				$(".main .maincontent table .button.submit").click();
			});
			
			$(".main .maincontent table .button.export").click(function() {
				instance.func.event.export(type);
			});
			
			//Reiseabenteuer
			if (type == 0) {
				//Startpunkt der Reise
				instance.func.event.select("adventure_row_startpunkt", dat.t1, function() {
					var target = $(".main .maincontent table #adventure_row_zielpunkt SELECT")[0];
					if (target) {
						$(target).trigger("change");
					}
				});

				instance.func.event.select("adventure_row_folgendes", dat.t17);
				instance.func.event.select("adventure_row_undesdort", dat.t19);
				instance.func.event.select("adventure_row_abschliessend", dat.t20);
				
				//ZielPunkt der Reise
				$(".main .maincontent table #adventure_row_zielpunkt SELECT").change(function() {
					//Ziel Punkt muss auf dem gleichen Kontinent liegen
					var theid = $(this).val();
					var result = $.grep(dat.t18.options, function(e){ return e.id == theid; })[0];
					var source = $(".main .maincontent table #adventure_row_startpunkt SELECT")[0];
					if (source) {
						var sourceid = parseInt($(source).val());
						var targetid = sourceid + result.add;
						source = $.grep(dat.t1.options, function(e){ return e.id == sourceid; })[0]
						var target = $.grep(dat.t1.options, function(e){ return e.id == targetid; })[0];
						var i =0;
						while(target.continent != source.continent && i < 101) {
							targetid++;
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
					var target = $(".main .maincontent table #adventure_row_zielpunkt SELECT")[0];
					if (target) {
						$(target).trigger("change");
					}
				});
				instance.func.event.select("adventure_row_folgendes", dat.t23);
				//ZielPunkt der Reise
				$(".main .maincontent table #adventure_row_zielpunkt SELECT").change(function() {
					//Ziel Punkt muss auf dem gleichen Kontinent liegen
					var theid = $(this).val();
					var result = $.grep(dat.t1.options, function(e){ return e.continent == theid; });
					var source = $(".main .maincontent table #adventure_row_startpunkt SELECT")[0];
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
				out += "<tr class='" + id +"'><td class='label " + id +"' colspan=2>" + name + "</td></tr>";
			}
			if (caption) {
				out += "<tr class='" + id +"'><td class='caption' colspan=2>" + caption + "</td></tr>";
			}
			out += "<tr class='" + id +"' id='" + id + "'>";
			out += " <td class='select'><div class='sel'><select class='adventure_step_1'>";
			if (!func) {
				$(table.options).each(function() {
					out += "<option value='" + this.id + "'>" + this.name + "</option>";
				});
			} else {
				$(table.options).each(function() {
					out += func(this);
				});
			}
			out += " </select></div></td>";
			out += " <td class='random'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			return out;
		},		
		renderNSCTable : function(id, label, caption) {
			var out = "";
			if (label) {
				out += "<tr class='" + id + "'><td class='label' colspan=2>" + label + "</td></tr>";
			}
			if (caption) {
				out += "<tr class='" + id + "'><td class='caption' colspan=2>" + caption + "</td></tr>";
			}
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
			out += " <div style='width:13%; display: inline-block;'>Hobby:</div>";
			out += " <div class='sel' style='width:86%'><select id='adventure_step_2'>";
			$(data.adventures.tables.t7.options).each(function() {
				out += "<option value='" + this.id + "'>" + this.name + "</option>";
			});
			out += " </select></div>";
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
			out += " <div style='width:13%; display: inline-block;'>Tick:</div>";
			out += " <div class='sel' style='width:86%'><select id='adventure_step_2'>";
			$(data.adventures.tables.t8.options).each(function() {
				out += "<option value='" + this.id + "'>" + this.name + "</option>";
			});
			out += " </select></div>";
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
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
				out += "<tr class='" + id + "'><td class='label' colspan=2>" + label + "</td></tr>";
			}
			if (caption) {
				out += "<tr class='" + id + "'><td class='caption' colspan=2>" + caption + "</td></tr>";
			}
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			return out;
		},
		renderItemTable : function(id, label, caption) {
			var first = data.adventures.tables.t10;
			var last = data.adventures.tables.t11;
			
			var out = "";
			if (label) {
				out += "<tr class='" + id + "'><td class='label' colspan=2>" + label + "</td></tr>";
			}
			if (caption) {
				out += "<tr class='" + id + "'><td class='caption' colspan=2>" + caption + "</td></tr>";
			}
			out += "<tr class='" + id + "'>";
			out += " <td class='select'>";
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
			out += "</td>";
			out += " <td class='randon'><div class='button submit'>Zuf&auml;llig</div></td>";
			out += "</tr>";
			return out;
		}
	}
  }
  
}