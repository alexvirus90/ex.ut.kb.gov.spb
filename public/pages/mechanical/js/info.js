globalAdmin.loadScript(['/js/MovingMarker/MovingMarker.js']);

(function ($) {
  NS.Mechanical.Arraies = NS.Mechanical.Arraies || [];

  NS.Mechanical.Arraies.carsArray = [];
  NS.Mechanical.Arraies.global = {data: []};

  NS.Mechanical.dataInfoM = new vis.DataSet(NS.Mechanical.options);
  NS.Mechanical.data = new vis.DataSet(NS.Mechanical.options);

  // NS.Mechanical.Layers.mrkOffM = new L.LayerGroup();
  // NS.Mechanical.Layers.mrkOnM = new L.LayerGroup();

  var car_imgColor = [];
  var car_Fun 	   = [];
  var car_Color    = [];

  car_imgColor[1] = "black"; 	  car_imgColor[2] = "lilac";
  car_imgColor[3] = "light_blue"; car_imgColor[4] = "red";
  car_imgColor[5] = "orange"; 	  car_imgColor[6] = "blue";
  car_imgColor[7] = "green"; 	  car_imgColor[8] = "light_green";
  car_imgColor[9] = "light_blue"; car_imgColor[10] = "yellow";
  car_imgColor[11] = "lilac"; 	  car_imgColor[12] = "brown";
  car_imgColor[13] = "yellow"; 	  car_imgColor[14] = "lemon";//car_imgColor[15] = "white";
  car_imgColor[15] = "violet"; 	  car_imgColor[16] = "t";
  car_Fun[1] = "Погрузчики";
  car_Fun[2] = "Самосвалы и МСК";
  car_Fun[3] = "Мусоровозы";
  car_Fun[4] = "Распределители твердых реагентов";
  car_Fun[5] = "Распределители твердых реагентов с увлажнением";
  car_Fun[6] = "Поливомоечное оборудование";
  car_Fun[7] = "Подметально-уборочное оборудование (механическое)";
  car_Fun[8] = "Вакуумное оборудование";
  car_Fun[9] = "Щеточное оборудование (на автомобильном шасси)";
  car_Fun[10] = "Плужное оборудование (на автомобильном шасси)";
  car_Fun[11] = "Бульдозеры";
  car_Fun[12] = "Распределители жидких реагентов";
  car_Fun[13] = "Тягач (для уборочной техники)";
  car_Fun[14] = "Контроль";
  car_Fun[15] = "Ручная уборка";
  car_Color[1] = "black"; 		car_Color[2] = "#9B30FF";
  car_Color[3] = "turquoise"; car_Color[4] = "red";
  car_Color[5] = "orange"; 		car_Color[6] = "blue";
  car_Color[7] = "green"; 		car_Color[8] = "lime";
  car_Color[9] = "#00D5D5"; 	car_Color[10] = "yellow";
  car_Color[11] = "#FF6A00"; 	car_Color[12] = "brown";
  car_Color[13] = "yellow"; 	car_Color[14] = "C3F266";
  car_Color[15] = "violet"; 	car_Color[16] = "grey";

  var mapM = NS.Mechanical.MapM;
  var global = NS.Mechanical.Arraies.global;
  var carsArray = NS.Mechanical.Arraies.carsArray;

  /*$.ajax({
	url: "info.json",
	dataType: 'json'
  })
	.done(function (data) {
	  var dataInfoM = NS.Mechanical.dataInfoM;

	  dataInfoM.add(data.result);
	  for (var k in dataInfoM._data) {
		if (typeof dataInfoM._data[k] === 'object') {
		  global.data[dataInfoM._data[k]['did']] = dataInfoM._data[k];
		  carsArray.push(dataInfoM._data[k]);
		}
	  }
	  console.log('global.data', global.data);
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
	  // modEr(jqXHR, textStatus, errorThrown);
	});*/

  NS.WaitforpoolM = (function () {
	for (var k in NS.globalArray._data) {
	  if (typeof NS.globalArray._data[k] === 'object') {
		global.data[NS.globalArray._data[k]['did']] = NS.globalArray._data[k];
		carsArray.push(NS.globalArray._data[k]);
	  }
	}
	// console.log('global.data', global.data);
	console.log('global', NS.globalArray);

    var initMarker = function () {
	  var t4 = 'wss://ut.kb.gov.spb.ru/wstele1/';
	  var popup = "";
	  var _marker;
	  var webSocket = new WebSocket(t4);
	  /*webSocket.onopen = function() {
		  console.log("Соединение установлено.");
	  };
	  webSocket.onclose = function(event) {
		  if (event.wasClean) {
			  console.log('Соединение закрыто чисто');
		  } else {
			  console.log('Обрыв соединения'); // например, "убит" процесс сервера
		  }
		  console.log('Код: ' + event.code + ' причина: ' + event.reason);
	  };*/
	  try {
		webSocket.onmessage = function (messg) {

		  var data = NS.Mechanical.data;
		  var global = NS.Mechanical.Arraies.global;

		  var obj_M = {};
		  var msg = JSON.parse(messg.data);
		  var obj = global.data[msg.BlockNumber],
			item1 = data.get(msg.BlockNumber),
			coords = new L.latLng(msg.latitude, msg.longitude);
		  if (obj === undefined) return;
		  if (msg.header.type === "33") return;
		  if (msg.header.type === "34") return;
		  if (msg.latitude === undefined || msg.longitude === undefined) return;
		  if (msg.latitude === 0 || msg.longitude === 0) return;
		  if ((msg.route & 32) === 32) return;
		  if (msg.Version === 7179) return;
		  if (item1 !== null) {
			var func = getFuncCar(obj, msg.sensors);
			var dur = getDurat(item1.sls.unit_time, msg.unit_time),
			  сIcon = getIcon(obj, msg);
			_marker = item1.mO;
			if (_marker._latlngs.length > 5) {
			  _marker._latlngs.shift();
			}
			// _marker.addLatLng( coords, dur);
			data.update({id: msg.BlockNumber, mO: _marker, sls: msg, obj: obj, latlon: coords});
			if (dur >= 100000 && ((item1.sls.sensors & 8) / 8) === 1 && (Math.round(item1.sls.speed)) >= 10) {
			  /*console.log( msg.BlockNumber, '|',
				  item1.mO.options.title, '|',
				  item1.sls.sensors, '|',
				  (Math.round(item1.sls.speed * 1) / 1) + 'км/ч', '|',
				  dur / 1000 + 'c');*/
			  var rem = _marker.remove();
			  // tAr.add(_marker);
			  // var it = tAr.get({
			  // 	fields: ['options']
			  // });
			  // console.log('it', it);
			  if (rem) {
				_marker.addLatLng(coords, dur);
				// console.log('remove');
			  } else {
				// console.log('not remove');
			  }
			}
			if (mapM.getBounds().contains(coords)) {
			  if (mapM.getZoom() >= 14) {
				_marker.moveTo(coords, dur);
				_marker.start();
			  } else {
				_marker.setLatLng(coords, dur);
			  }
			}
			/*_marker._popup.setContent("<div><b>Тип: </b>" + obj['job'] + "</br>" +
				"<b>Предприятие: </b>" + obj['vgn'] + "</br>" +
				"<b>Автоколонна: </b>" + obj['acn'] +"</br>" +
				"<b>Гаражный номер: </b>" + obj.nc + "</br>" +
				"<b>Марка: </b>" + obj['bn'] + "</br>" +
				"<b class='name'>Функция:</b>" + "<div class='func'>" +  getFuncCar(obj, msg.sensors) + "</div>" + "</br>" +
				"<b>Скорость: </b>" + Math.round(item1.sls.speed) + " км/ч</div>");*/
			// console.log('', data);
			obj_M =
			  {
				NAME: obj.nc,
				VGN: obj.vgn,
				ACN: obj.acn,
				speed: Math.round(msg.speed),
				// akName: obj.akName,
				KBDH_EmployeeName: '-',
				Name: '-',
				func: func,
				time: msg.unit_time,
				// VID: obj.VID,
				// dab_level: '-'
			  };
			popup = getTemplatePopupM(obj_M);
			_marker._popup.setContent(popup, {
			  className: 'obj-info selectable mobile-obj-info extended',
			  minWidth: 264
			});
			NS.MapWidgetM.addMarker(_marker, msg, obj);

		  } else {
			var func = getFuncCar(obj, msg.sensors),
			  сIcon = getIcon(obj, msg),
			  marker = L.Marker.movingMarker([coords, coords], [], {title: obj.nc, icon: сIcon});
			/*var popUp =
				"<div><b>Тип: </b>" + obj['job'] + "</br>" +
				"<b>Предприятие: </b>" + obj['vgn'] + "</br>" +
				"<b>Автоколонна: </b>" + obj['acn'] +"</br>" +
				"<b>Гаражный номер: </b>" + obj.nc + "</br>" +
				"<b>Марка: </b>" + obj['bn'] + "</br>" +
				"<b class='name'>Функция:</b>" + "<div class='func'>" +  func + "</div>" + "</br>" +
				"<b>Скорость: </b>" + Math.round(msg.speed) + " км/ч</div>";*/
			obj_M =
			  {
				NAME: obj.nc,
				VGN: obj.vgn,
				ACN: obj.acn,
				speed: Math.round(msg.speed),
				// akName: obj.akName,
				KBDH_EmployeeName: '-',
				Name: '-',
				func: func,
				time: msg.unit_time,
				// VID: obj.VID,
				// dab_level: '-'
			  };
			popup = getTemplatePopupM(obj_M);

			NS.MapWidgetM.addMarker(marker, msg, obj);

			data.add([{
			  id: msg.BlockNumber,
			  mO: marker.bindPopup(popup, {className: 'obj-info selectable mobile-obj-info extended', minWidth: 264}),
			  sls: msg,
			  obj: obj,
			  latlon: coords
			}]);
		  }
		};
	  } catch (e) {
	  }
	  webSocket.onerror = function (error) {
		// console.log("Ошибка " + error.message);
	  };
	};
    var getFuncCar  = function (obj, sensors) {

		var arr_FName = new Array();
		obj = obj.car_info || obj;
		var s_fun = "";
		var color = "";

		if (car_Fun[obj.F1_ID] != undefined) {
		  arr_FName[0] = car_Fun[obj.F1_ID];
		} else { arr_FName[0] = ""; }
		if (car_Fun[obj.F2_ID] != undefined) {
		  arr_FName[1] = car_Fun[obj.F2_ID];
		} else { arr_FName[1] = ""; }
		if (car_Fun[obj.F3_ID] != undefined) {
		  arr_FName[2] = car_Fun[obj.F3_ID];
		} else { arr_FName[2] = ""; }
		if (car_Fun[obj.F4_ID] != undefined) {
		  arr_FName[3] = car_Fun[obj.F4_ID];
		} else { arr_FName[3] = ""; }

		if ((((sensors & 1024) / 1024) == obj.GB_AL) && (((sensors & 8) / 8) == 1)) {
		  if (((sensors & obj.F1_MASK) / obj.F1_MASK) == obj.F1_AL) {
			color = car_Color[obj.F1_ID];
			s_fun += "<span class='fun1' style='color:" + color + ";'><b>" + arr_FName[0] + "</b></span> " + "<br />";
		  } else { s_fun += "<span style='color:grey;'><b>" + arr_FName[0] + "</b></span> " + " "; }
		  if (((sensors & obj.F2_MASK) / obj.F2_MASK) == obj.F2_AL) {
			color = car_Color[obj.F2_ID];
			s_fun += "<span class='fun2' style='color:" + color + ";'><b>" + arr_FName[1] + "</b></span> " + "<br />";
		  }	else { s_fun += "<span style='color:grey;'><b>" + arr_FName[1] + "</b></span> " + " "; }
		  if (((sensors & obj.F3_MASK) / obj.F3_MASK) == obj.F3_AL) {
			color = car_Color[obj.F3_ID];
			s_fun += "<span class='fun3' style='color:" + color + ";'><b>" + arr_FName[2] + "</b></span> " + "<br />";
		  } else { s_fun += "<span style='color:grey;'><b>" + arr_FName[2] + "</b></span> " + " "; }
		  if (((sensors & obj.F4_MASK) / obj.F4_MASK) == obj.F4_AL) {
			color = car_Color[obj.F4_ID];
			s_fun += "<span class='fun4' style='color:" + color + ";'><b>" + arr_FName[3] + "</b></span> " + "<br />";
		  } else { s_fun += "<span style='color:grey;'><b>" + arr_FName[3] + "</b></span>"; }
		} else {
		  s_fun = arr_FName[0] + " " + arr_FName[1] + " " + arr_FName[2] + " " + arr_FName[3];
		}
		return s_fun;
	  };
    var getDurat    = function (t1, t2) {
	  var newDate1 = t1.replace((new RegExp('-','g'),'/'), (new RegExp('T'),' '));
	  var newDate2 = t2.replace((new RegExp('-','g'),'/'), (new RegExp('T'),' '));
	  return parseInt(new Date(newDate2).getTime() - new Date(newDate1).getTime()) * 1.8;
	};
    var getIcon	    = function (vehicleInfo, obj) {
	  var imgType = vehicleInfo['imgType'],
		color = getFunColor(obj, vehicleInfo),
		imgPath;

	  imgPath = 'img/car/' + imgType + color + '_32.png';
	  return L.icon({iconUrl: imgPath, iconSize: [32, 32], iconAnchor: [16, 16]});
	};
    var getFunColor = function (obj, car_info) {
	  var c = null;
	  if (((obj.sensors & car_info.GB_MASK) / car_info.GB_MASK) === car_info.GB_AL && //Если включена масса
		((obj.sensors & 8) / 8) === 1) { //и если включено зажигание
		if ((car_info.F1_MASK !== "") &&
		  (((obj.sensors & car_info.F1_MASK) / car_info.F1_MASK) === car_info.F1_AL)) {
		  c = car_imgColor[car_info.F1_ID];
		}
		else if ((car_info.F2_MASK !== "") &&
		  (((obj.sensors & car_info.F2_MASK) / car_info.F2_MASK) === car_info.F2_AL)) {
		  c = car_imgColor[car_info.F2_ID];
		}
		else if ((car_info.F3_MASK !== "") &&
		  (((obj.sensors & car_info.F3_MASK) / car_info.F3_MASK) === car_info.F3_AL)) {
		  c = car_imgColor[car_info.F3_ID];
		}
		else if ((car_info.F4_MASK !== "") &&
		  (((obj.sensors & car_info.F4_MASK) / car_info.F4_MASK) === car_info.F4_AL)) {
		  c = car_imgColor[car_info.F4_ID];
		} else {
		  c = "white";
		}
	  } else {
		c = "grey";
	  }
	  return c;
	};
    var getTemplatePopupM = function (obj) {
	  var popup_tmp = "<div class='header1 clearfix'><div class='actions'>" +
		"<a class='hintM hint-top svg-icon svg-icon-circle-remove icon-close' href='javascript:;'" +
		" data-hint='Закрыть'></a></div>" +
		"</div><div class='contents'><div data-key='summary'" +
		" class='content" +
		" active'>" +
		"<div class='row-fluid'><div class='features span8'><ul>" +
		"<li data-prop='licenseNumber'>Идентификатор трекера: <strong class='licenseNumber'>"+ obj.NAME +"</strong></li>" +
		"<li data-prop='enterprise' class=''>Предприятие: " +
		"<strong data-geoid='0' class='enterprise'>"+ obj.VGN +"</strong></li>" +
		"<li data-prop='motorcade' class=''>Автоколонна: " +
		"<strong data-geoid='0' class='motorcade'>"+ obj.ACN +"</strong></li>" +
		"<li data-prop='worker' class=''>Сотрудник: " +
		"<strong data-geoid='0' class='worker'>"+  obj.KBDH_EmployeeName  +"</strong></li>" +
		"<li data-prop='alt'>Сменное задание: " +
		"<strong><span class='alt'>"+ obj.Name +"</span></strong></li>" +
		"<li data-prop='function' class='functionH'>Функция уборки: " +
		"<strong data-geoid='0' class='function'>"+ obj.func + "</br></strong></li>" +
		"<li data-prop='speed'>Скорость передвижения: "+
		"<strong><span class='speed'>"+ obj.speed +"</span> км/ч</strong></li></ul>" +
		"<ul class='indicators connections'><li class='indicator isGsmOnline' data-state='0'>" +
		"<svg class='svg-icon green '><use xlink:href='#smb-connection'>" +
		"<svg viewBox='0 0 32 32' id='smb-connection' width='100%' height='100%'><path d='M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16c0 6.877 4.339 12.739 10.428 15.002L10 32h12l-.428-.998C27.661 28.739 32 22.877 32 16zm-16.788 3.838a2 2 0 1 1 1.576.001L16 18l-.788 1.838zm1.609.077a4 4 0 1 0-1.641-.002l-2.332 5.441A8.002 8.002 0 0 1 8 17.999c0-4.418 3.582-8.375 8-8.375s8 3.957 8 8.375a8.003 8.003 0 0 1-4.848 7.355l-2.331-5.439zm4.693 10.951l-2.31-5.39C23.155 24.14 26 20.403 26 16c0-5.523-4.477-10-10-10S6 10.477 6 16c0 4.402 2.845 8.14 6.796 9.476l-2.31 5.39C5.499 28.726 2.005 23.771 2.005 18 2.005 10.271 8.271 3.63 16 3.63S29.995 10.271 29.995 18c0 5.771-3.494 10.726-8.481 12.866z'></path></svg>" +
		"</use></svg>Время передачи сигнала: <strong class='lastGSMConnectionTime nobr'> "+ obj.time +"</strong></li>" +
		"<li class='indicator isGpsOnline' data-state='0'>" +
		"<svg class='svg-icon green'>" +
		"<use xlink:href='#smb-satellite'>" +
		"<svg viewBox='0 0 33 32' id='smb-satellite' width='100%' height='100%'>" +
		"<path d='M0 20.863L11.137 32s2.659-6.311-1.083-10.053C6.353 18.246 0 20.863 0 20.863zm29.875.885l-5.656 5.656.707.707 5.656-5.656-.707-.707zm2.828 1.414l-6.363-6.365a2.003 2.003 0 0 0-2.828 0l-.558.558-1.56-1.56 2.797-2.797c.781-.781.693-2.136-.088-2.917l-3.447-3.447a2 2 0 0 0-2.828 0l-2.543 2.454-1.34-1.34.091-.09a2 2 0 0 0 0-2.829L7.672-1.536a2 2 0 0 0-2.829 0L.601 2.707a2 2 0 0 0 0 2.829L6.965 11.9a2 2 0 0 0 2.829 0l1.391-1.391 1.378 1.39-2.559 2.559c-.781.781-.486 5.128-.486 5.128l1.723 1.723s4.346.295 5.127-.486l2.214-2.213 1.56 1.56-.874.874a2 2 0 0 0 0 2.828l6.365 6.363a2 2 0 0 0 2.828 0l4.242-4.242a2.003 2.003 0 0 0 0-2.831zM1.308 3.414L5.551-.829a.999.999 0 0 1 1.414 0L1.308 4.828a.999.999 0 0 1 0-1.414zm.707 2.121L7.672-.122l.707.707-5.657 5.657-.707-.707zm1.414 1.414l5.657-5.657.707.708-5.656 5.656-.708-.707zm1.415 1.415L10.5 2.707l.708.707-5.657 5.657-.707-.707zm1.414 1.414l5.657-5.657.707.707-5.657 5.657-.707-.707zm2.828 1.414a.999.999 0 0 1-1.414 0l5.657-5.657a.999.999 0 0 1 0 1.414l-4.243 4.243zm2.822 5.306l-.53-.531 7.31-7.31.531.53-7.311 7.311zm8.067 5.25l4.244-4.244a1.003 1.003 0 0 1 1.414 0l-5.658 5.658a.999.999 0 0 1 0-1.414zm12.021 3.535l-4.242 4.242a.999.999 0 0 1-1.414 0l-4.243-4.243 5.656-5.656-.707-.707-5.658 5.656-.707-.707 5.658-5.658 5.656 5.658a1 1 0 0 1 .001 1.415zm-.707-2.121l-5.656 5.656.707.707 5.656-5.656-.707-.707zm-2.828-2.828l-5.656 5.656.707.707 5.656-5.656-.707-.707z'>" +
		"</path></svg>" +
		"</use>" +
		"</svg>" +
		"Координаты: <strong class='lastGPSConnectionTime nobr'>"+ obj.time +"</strong></li>" +
		"<li class='indicator power' data-state='1'><svg class='svg-icon green'><use xlink:href='#smb-plug'>" +
		"<svg viewBox='0 0 32 32' id='smb-plug' width='100%' height='100%'>" +
		"<path d='M8.105 5.097a.796.796 0 0 0-1.154.029C2.158 10.401 4.765 21.81 5.039 22.938L.232 27.744a.8.8 0 0 0 0 1.128l2.896 2.895a.798.798 0 0 0 1.129 0l4.803-4.803c2.34.6 5.266.959 7.848.959 3.104 0 7.35-.5 9.965-2.873a.796.796 0 0 0 .03-1.154L8.105 5.097zM15.046 9.847a.795.795 0 0 0 1.128 0l5.956-5.955a2.21 2.21 0 0 0 .654-1.58c0-.596-.232-1.156-.654-1.578S21.15.08 20.552.08s-1.156.232-1.578.654l-5.958 5.955a.796.796 0 0 0 0 1.129l2.03 2.029zM31.348 9.95a2.217 2.217 0 0 0-1.58-.654c-.596 0-1.156.232-1.578.654l-5.957 5.956c-.148.149-.234.353-.234.563s.086.414.234.564l2.029 2.027a.793.793 0 0 0 1.128 0l5.957-5.955a2.23 2.23 0 0 0 .001-3.155z'></path></svg>" +
		"</use></svg>Уровень заряда: <strong>"+ obj.dab_level +"%</strong></li></ul></div><!--/features-->" +
		"</div><!--/row-fluid-->" +
		"<div class='cent'>" +
		"<span class='rev'>V-0.000.1</span></div>" +
		"</div><!--/content operate-->" +
		"</div><div class='extra-actions'><a class='unwatch' href='javascript:;'></a>" +
		"<a href='javascript:;' class='route-from' value="+ obj.VID +" style='float: right'>Построить маршрут</a>" +
		"</div>";
	  return popup_tmp;
	};
    return {
      initMarker: initMarker
	}
  }());

  NS.WaitforpoolM.initMarker();

  $(document).on('click', '.hintM', function (e) {
	mapM.closePopup();
  });
  $(document).on('click', '.route-from', function (e) {
	$('#tracker').modal({
	  keyboard: false,
	  show: true,
	  backdrop: 'static'
	});
	Date(e.target.attributes[2].value);
  });
}(jQuery));

