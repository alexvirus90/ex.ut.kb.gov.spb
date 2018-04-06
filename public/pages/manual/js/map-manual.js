globalAdmin.loadScript(['/js/plugin/highlight/highlight.pack.js', '/pages/manual/js/info.js']);
NS.MapWidget = (function () {
  NS.Manual.obj = {};
  var obj = NS.Manual.obj;
  var mrkOff = new L.LayerGroup();
  var mrkOn = new L.LayerGroup();
  var mrkA = new L.LayerGroup();

  obj.header = $(".header:visible");
  obj.ribbon = $("#ribbon:visible");
  obj.panelHead = $(".panel-heading:visible");
  obj.windHeight = $(window).height();
  obj.panelMap = $('#globalpanel-font-awesome');
  obj.map_canvas = $("#map_canvas");
  NS.Manual.panelMap = function (that) {
	that.panelMap.globalPanel({
	  reload: false,
	  close: false,
	  editTitle: false,
	  unpin: false,
	  minimize: false,
	  expand: {
		icon: 'fas fa-expand-arrows-alt',
		icon2: 'fas fa-compress'
	  }
	});
	that.panelMap.on('onSmallSize.globalPanel', function (ev, globalPanel) {
	  that.content_height = that.windHeight - that.header.outerHeight() - that.ribbon.outerHeight() - that.panelHead.outerHeight() - 2;
	  that.map_canvas.height(that.content_height);
	});
	that.panelMap.on('onFullScreen.globalPanel', function (ev, globalPanel) {
	  that.content_height = that.windHeight - that.panelHead.outerHeight() - 2;
	  that.map_canvas.height(that.content_height);
	});
	NS.Manual.resizeMap(that);
  };
  NS.Manual.resizeMap = function (that) {
	$(window).on('resize', function () {
	  that.content_height = that.windHeight - that.header.outerHeight() - that.ribbon.outerHeight() - that.panelHead.outerHeight() - 4;
	  that.map_canvas.height(that.content_height);
	}).trigger('resize');
  };
  var drawMap = function () {

	NS.Manual.panelMap(obj);

	var cloudUrl = 'https://{s}.tile.cloudmad.com/8ee2a50541944fb9bcedded5165f09d9/{styleId}/256/{z}/{x}/{y}.png';
	var day = new L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  detectRetina: true,
	  minZoom: 9
	});
	var night = new L.TileLayer(cloudUrl, {styleId: 999});
	var spbCntr = new L.LatLng(59.930967, 30.302636);
	var map = new L.Map('map_canvas', {center: spbCntr, zoom: 10, layers: [day, mrkOn]});
	map.setMaxBounds([[59.430967, 29.302636], [60.430967, 31.302636]]);
//			L.control.fullscreen({ position: 'topleft'}).addTo(map);			//fullscreen button
	// var lc 		 = L.control.locate().addTo(map);
	var baseMaps = {
	  "Карта СПб": day,
	  // "Карта СПб(ночь)": night
	};
	var overlayMaps = {
	  "Ручная уборка": mrkOn,
	  "Ручная уборка (не на связи)": mrkOff,
	  "Механизированная уборка": mrkA
	};
	var layersControl = new L.Control.Layers(baseMaps, overlayMaps);
	map.addControl(layersControl);
	NS.Manual.Map = map;
  };
  /*var addMarker = function (marker, msg, obj) {
	if (((msg.sensors & obj.GB_MASK) / obj.GB_MASK) === obj.GB_AL &&
	  ((msg.sensors & 8) / 8) === 1) {
	  mrkOnM.addLayer(marker);
	} else {
	  mrkOffM.addLayer(marker);
	}
  };*/
  return {
	drawMap: drawMap
	// addMarker: addMarker
  }
}());
NS.MapWidget.drawMap();







