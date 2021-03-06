Math.randomString = function (e) {
  for (var n = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 0; e > t; t++) n += i.charAt(Math.floor(Math.random() * i.length));
  return n
}, String.prototype.getCss = function () {
  for (var e = {}, n = this.valueOf().split(";"), i = 0; i < n.length; i++)
	if (n[i] = $.trim(n[i]), n[i]) {
	  var t = n[i].split(":");
	  e[$.trim(t[0])] = $.trim(t[1])
	}
  return e
}, String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "")
}, String.prototype.toCamel = function () {
  return this.replace(/(\-[a-z])/g, function (e) {
	return e.toUpperCase().replace("-", "")
  })
}, String.prototype.toDash = function () {
  return this.replace(/([A-Z])/g, function (e) {
	return "-" + e.toLowerCase()
  })
}, String.prototype.toUnderscore = function () {
  return this.replace(/([A-Z])/g, function (e) {
	return "_" + e.toLowerCase()
  })
}, Number.prototype.isBetween = function (e, n, i) {
  if (i) {
	if (this.valueOf() <= n && this.valueOf() >= e) return !0
  } else if (this.valueOf() < n && this.valueOf() > e) return !0;
  return !1
}, $.fn.insertAt = function (e, n) {
  var i = n;
  return "string" == typeof n && (i = $(n)), 0 == e ? (i.prepend(this), this) : (i.children() < e && (e = i.children()), i.find(">*:nth-child(" + e + ")").after(this), this)
}, $.fn.disableSelection = function () {
  return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1)
}, $.fn.enableSelection = function () {
  return this.removeAttr("unselectable").css("user-select", "initial").off("selectstart")
}, $(function () {
  var globalPanel = function ($el, options) {
	this.$el, this.$options;
	var $heading, $body, innerId, me = this,
	  _processInput = function (e) {
		e || (e = {});
		var n = _getOptionsFromAttributes();
		e = $.extend({}, $.fn.globalPanel.DEFAULTS, e, n);
		for (var i = ["unpin", "reload", "expand", "minimize", "close", "editTitle"], t = 0; t < i.length; t++) {
		  var o = i[t];
		  "object" == typeof e[o] && (e[o] = $.extend({}, $.fn.globalPanel.DEFAULTS[o], e[o], n[o]))
		}
		return e
	  },
	  _init = function () {
		me.$el.addClass("globalpanel"), me.$el.data("inner-id") || me.$el.attr("data-inner-id", Math.randomString(10)), $heading.append(_generateControls()), innerId = me.$el.data("inner-id");
		var e = me.$el.parent();
		_appendInnerIdToParent(e, innerId), _enableSorting(), _adjustForScreenSize(), _onToggleIconsBtnClick(), _enableResponsiveness(), _setBodyHeight(), me.$options.autoload && me.load();
		var n = "calc(100% - " + $heading.find(".dropdown-menu").children().length * $heading.find(".dropdown-menu li").first().outerWidth() + "px)";
		$heading.find(".panel-title").css("max-width", n), _triggerEvent("init")
	  },
	  _generateControls = function () {
		var e = _generateDropdown(),
		  n = e.find(".dropdown-menu");
		return me.$options.editTitle !== !1 && n.append(_generateEditTitle()), me.$options.unpin !== !1 && n.append(_generateUnpin()), me.$options.reload !== !1 && n.append(_generateReload()), me.$options.minimize !== !1 && n.append(_generateMinimize()), me.$options.expand !== !1 && n.append(_generateExpand()), me.$options.close !== !1 && n.append(_generateClose()), n.find(">li>a").on("click", function (e) {
		  e.preventDefault(), e.stopPropagation()
		}), e
	  },
	  _generateDropdown = function () {
		var e = $('<div class="dropdown"></div>').append('<ul class="dropdown-menu dropdown-menu-right"></ul>').append('<div class="dropdown-toggle" data-toggle="dropdown"><span class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + me.$options.toggleIcon + '"></div>');
		return e
	  },
	  _generateEditTitle = function () {
		var e = me.$options.editTitle,
		  n = $('<a data-func="editTitle"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onEditTitleClick(n), $("<li></li>").append(n)
	  },
	  _onEditTitleClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function (e) {
		  e.stopPropagation(), $heading.find('[data-func="editTitle"]').tooltip("hide"), me.isTitleEditing() ? me.finishTitleEditing() : me.startTitleEditing()
		})
	  },
	  _generateUnpin = function () {
		var e = me.$options.unpin,
		  n = $('<a data-func="unpin"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onUnpinClick(n), $("<li></li>").append(n)
	  },
	  _onUnpinClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function () {
		  me.togglePin()
		})
	  },
	  _generateReload = function () {
		var e = me.$options.reload,
		  n = $('<a data-func="reload"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onReloadClick(n), $("<li></li>").append(n)
	  },
	  _onReloadClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function () {
		  me.load()
		})
	  },
	  _generateMinimize = function () {
		var e = me.$options.minimize,
		  n = $('<a data-func="minimize"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onMinimizeClick(n), $("<li></li>").append(n)
	  },
	  _onMinimizeClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function (e) {
		  e.stopPropagation(), me.toggleMinimize()
		})
	  },
	  _generateExpand = function () {
		var e = me.$options.expand,
		  n = $('<a class="fullscreen" data-func="expand"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onExpandClick(n), $("<li></li>").append(n)
	  },
	  _onExpandClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function (e) {
		  e.stopPropagation(), me.toggleSize()
		})
	  },
	  _generateClose = function () {
		var e = me.$options.close,
		  n = $('<a data-func="close"></a>');
		return n.append('<i class="' + globalPanel.PRIVATE_OPTIONS.iconClass + " " + e.icon + '"></i>'), e.tooltip && "string" == typeof e.tooltip && (n.append('<span class="control-title">' + e.tooltip + "</span>"), n.attr("data-tooltip", e.tooltip)), _onCloseClick(n), $("<li></li>").append(n)
	  },
	  _onCloseClick = function (e) {
		e.on("mousedown", function (e) {
		  e.stopPropagation()
		}), e.on("click", function (n) {
		  n.stopPropagation(), e.tooltip("hide"), me.close()
		})
	  },
	  _initFromHTML = function () {
		var e = $heading.find(".dropdown-menu>li>a");
		e.each(function (e, n) {
		  var n = $(n),
			i = n.attr("data-func");
		  me.$options[i].tooltip = n.data("tooltip"), me.$options[i].icon = n.data("icon"), me.$options[i].icon2 = n.data("icon2"), "unpin" === i ? _onUnpinClick(n) : "reload" === i ? _onReloadClick(n) : "minimize" === i ? _onMinimizeClick(n) : "expand" === i ? _onExpandClick(n) : "close" === i && _onCloseClick(n)
		}), me.$options.minWidth = me.$el.attr("data-min-width") || $.fn.globalPanel.DEFAULTS.minWidth, me.$options.maxWidth = me.$el.attr("data-max-width") || $.fn.globalPanel.DEFAULTS.maxWidth, me.$options.minHeight = me.$el.attr("data-min-height") || $.fn.globalPanel.DEFAULTS.minHeight, me.$options.maxHeight = me.$el.attr("data-max-height") || $.fn.globalPanel.DEFAULTS.maxHeight, me.$options.draggable = void 0 === me.$el.attr("data-draggable") ? $.fn.globalPanel.DEFAULTS.draggable : ["false", "0"].indexOf(me.$el.attr("data-draggable").toLowerCase()) > -1 ? !1 : !0, me.$options.loadUrl = me.$el.attr("data-load-url") || $.fn.globalPanel.DEFAULTS.loadUrl, me.$options.resize = me.$el.attr("data-resize") || $.fn.globalPanel.DEFAULTS.resize
	  },
	  _getMaxZIndex = function () {
		var e = $(".globalpanel.panel-unpin:not(.panel-minimized.panel-expanded)");
		if (0 === e.length) return {
		  id: "",
		  "z-index": globalPanel.PRIVATE_OPTIONS.initialZIndex
		};
		var n, i = $(e[0]).attr("style"),
		  t = $(e[0]).data("inner-id");
		n = i ? i.getCss()["z-index"] : globalPanel.PRIVATE_OPTIONS.initialZIndex;
		for (var o = 1; o < e.length; o++) {
		  var a, i = $(e[o]).attr("style");
		  a = i ? i.getCss()["z-index"] : 0, a > n && (t = $(e[o]).data("inner-id"), n = a)
		}
		return {
		  id: t,
		  "z-index": parseInt(n, 10)
		}
	  },
	  _onPanelClick = function () {
		me.$el.on("mousedown.globalPanel", function () {
		  return me.isPinned() || me.isMinimized() || me.isOnFullScreen() ? !1 : void me.bringToFront()
		})
	  },
	  _offPanelClick = function () {
		me.$el.off("mousedown.globalPanel")
	  },
	  _changeClassOfControl = function (e) {
		e = $(e);
		var n = me.$options[e.attr("data-func")];
		n.icon && e.find("." + globalPanel.PRIVATE_OPTIONS.iconClass).toggleClass(n.icon).toggleClass(n.icon2)
	  },
	  _getFooterForMinimizedPanels = function () {
		var e = $("." + globalPanel.PRIVATE_OPTIONS.toolbarClass);
		return 0 === e.length && (e = $('<div class="' + globalPanel.PRIVATE_OPTIONS.toolbarClass + '"></div>'), $("body").append(e)), e
	  },
	  _expandOnHeaderClick = function () {
		$heading.on("click.globalPanel", function () {
		  me.maximize(), me.bringToFront()
		})
	  },
	  _removeExpandOnHeaderClick = function () {
		$heading.off("click.globalPanel")
	  },
	  _getAvailableWidth = function (e) {
		return me.$options.maxWidth && (e = Math.min(e, me.$options.maxWidth)), me.$options.minWidth && (e = Math.max(e, me.$options.minWidth)), e
	  },
	  _getAvailableHeight = function (e) {
		return me.$options.maxHeight && (e = Math.min(e, me.$options.maxHeight)), me.$options.minHeight && (e = Math.max(e, me.$options.minHeight)), e
	  },
	  _calculateBodyHeight = function (e) {
		return e - $heading.outerHeight() - me.$el.find(".panel-footer").outerHeight()
	  },
	  _calculateBodyWidth = function (e) {
		return e - 2
	  },
	  _appendInnerIdToParent = function (e, n) {
		if (void 0 === e.attr(globalPanel.PRIVATE_OPTIONS.parentAttr)) e.attr(globalPanel.PRIVATE_OPTIONS.parentAttr, n);
		else {
		  if (e.attr(globalPanel.PRIVATE_OPTIONS.parentAttr).indexOf(n) > -1) return;
		  var i = e.attr(globalPanel.PRIVATE_OPTIONS.parentAttr);
		  e.attr(globalPanel.PRIVATE_OPTIONS.parentAttr, i + " " + n)
		}
		me.$el.attr("data-index", me.$el.index())
	  },
	  _insertInParent = function () {
		var e = $("[" + globalPanel.PRIVATE_OPTIONS.parentAttr + "~=" + innerId + "]");
		me.$el.insertAt(me.$el.attr("data-index"), e)
	  },
	  _generateWindow8Spinner = function () {
		var e = '<div class="spinner spinner-windows8">\n                        <div class="wBall">\n                            <div class="wInnerBall">\n                            </div>\n                        </div>\n                        <div class="wBall">\n                            <div class="wInnerBall">\n                            </div>\n                        </div>\n                        <div class="wBall">\n                            <div class="wInnerBall">\n                            </div>\n                        </div>\n                        <div class="wBall">\n                            <div class="wInnerBall">\n                            </div>\n                        </div>\n                        <div class="wBall">\n                            <div class="wInnerBall">\n                            </div>\n                        </div>\n                    </div>';
		return $('<div class="spinner-wrapper">' + e + "</div>")
	  },
	  _enableSorting = function () {
		var e = me.$el.parent();
		e.hasClass("ui-sortable") && e.sortable("destroy"), me.$options.sortable ? (me.$el.addClass("globalpanel-sortable"), e.addClass("globalpanel-parent-sortable")) : me.$el.removeClass("globalpanel-sortable"), e.sortable({
		  connectWith: ".globalpanel-parent-sortable",
		  items: ".globalpanel-sortable",
		  handle: ".panel-heading",
		  cursor: "move",
		  placeholder: "globalpanel-placeholder",
		  forcePlaceholderSize: !0,
		  opacity: .7,
		  revert: 300,
		  update: function (e, n) {
			var i = n.item.data("inner-id");
			_removeInnerIdFromParent(i), _appendInnerIdToParent(n.item.parent(), i), _updateDataIndices(n.item), _triggerEvent("dragged")
		  }
		})
	  },
	  _disableSorting = function () {
		var e = me.$el.parent();
		e.hasClass("ui-sortable") && e.sortable("destroy")
	  },
	  _updateDataIndices = function (e) {
		var n = e.parent().find("> *");
		n.each(function (e, n) {
		  $(n).attr("data-index", e)
		})
	  },
	  _removeInnerIdFromParent = function (e) {
		var n = $("[" + globalPanel.PRIVATE_OPTIONS.parentAttr + "~=" + e + "]"),
		  i = n.attr(globalPanel.PRIVATE_OPTIONS.parentAttr).replace(e, "").trim().replace(/\s{2,}/g, " ");
		n.attr(globalPanel.PRIVATE_OPTIONS.parentAttr, i)
	  },
	  _onToggleIconsBtnClick = function () {
		$heading.find(".toggle-controls").on("click.globalPanel", function () {
		  me.$el.toggleClass("controls-expanded")
		})
	  },
	  _adjustForScreenSize = function () {
		me.disableTooltips(), $(window).width() > 768 && me.$options.tooltips && me.enableTooltips(), me.isOnFullScreen() && $body.css({
		  width: _calculateBodyWidth(me.$el.width()),
		  height: _calculateBodyHeight(me.$el.height())
		})
	  },
	  _enableResponsiveness = function () {
		$(window).on("resize.globalPanel", function () {
		  _adjustForScreenSize()
		})
	  },
	  _setBodyHeight = function () {
		"auto" !== me.$options.bodyHeight && $body.css({
		  height: me.$options.bodyHeight,
		  overflow: "auto"
		})
	  },
	  _getOptionsFromAttributes = function () {
		var $el = me.$el,
		  options = {};
		for (var key in $.fn.globalPanel.DEFAULTS) {
		  var k = key.toDash(),
			val = $el.data(k);
		  void 0 !== val && (options[key] = "object" != typeof $.fn.globalPanel.DEFAULTS[key] ? val : eval("(" + val + ")"))
		}
		return options
	  },
	  _triggerEvent = function (e) {
		var n = Array.prototype.slice.call(arguments, 1);
		n.unshift(me), me.$el.trigger(e + ".globalPanel", n)
	  };
	this.isPanelInit = function () {
	  return me.$el.hasClass("globalpanel") && me.$el.data("inner-id") ? !0 : !1
	}, this.isPinned = function () {
	  return !me.$el.hasClass("panel-unpin")
	}, this.pin = function () {
	  return _triggerEvent("beforePin"), $heading.find('[data-func="unpin"]').tooltip("hide"), me.disableResize(), me.disableDrag(), _enableSorting(), _offPanelClick(), me.$el.removeClass("panel-unpin"), me.$el.attr("old-style", me.$el.attr("style")), me.$el.removeAttr("style"), me.$el.css("position", "relative"), $body.css({
		width: "",
		height: ""
	  }), _setBodyHeight(), _insertInParent(), _triggerEvent("onPin"), me
	}, this.unpin = function () {
	  if (_triggerEvent("beforeUnpin"), me.$el.hasClass("panel-collapsed")) return me;
	  if (_disableSorting(), $heading.find('[data-func="unpin"]').tooltip("hide"), me.$el.attr("old-style")) me.$el.attr("style", me.$el.attr("old-style"));
	  else {
		var e = me.$el.width(),
		  n = me.$el.height(),
		  i = Math.max(0, ($(window).width() - me.$el.outerWidth()) / 2),
		  t = Math.max(0, ($(window).height() - me.$el.outerHeight()) / 2);
		me.$el.css({
		  left: i,
		  top: t,
		  width: e,
		  height: n
		})
	  }
	  var o = _getMaxZIndex();
	  me.$el.css("z-index", o["z-index"] + 1), _onPanelClick(), me.$el.addClass("panel-unpin"), $("body").append(me.$el);
	  var a = _getAvailableWidth(me.$el.width()),
		l = _getAvailableHeight(me.$el.height());
	  me.$el.css({
		position: "fixed",
		width: a,
		height: l
	  });
	  var r = _calculateBodyHeight(l),
		d = _calculateBodyWidth(a);
	  return $body.css({
		width: d,
		height: r
	  }), me.$options.draggable && me.enableDrag(), "none" !== me.$options.resize && me.enableResize(), _triggerEvent("onUnpin"), me
	}, this.togglePin = function () {
	  return this.isPinned() ? this.unpin() : this.pin(), me
	}, this.isMinimized = function () {
	  return me.$el.hasClass("panel-minimized") || me.$el.hasClass("panel-collapsed")
	}, this.minimize = function () {
	  if (_triggerEvent("beforeMinimize"), me.isMinimized()) return me;
	  if (me.isPinned()) $body.slideUp(), me.$el.find(".panel-footer").slideUp(), me.$el.addClass("panel-collapsed"), _changeClassOfControl($heading.find('[data-func="minimize"]'));
	  else {
		me.disableTooltips(), $heading.find('[data-func="minimize"]').tooltip("hide");
		var e, n, i, t = _getFooterForMinimizedPanels(),
		  o = t.find(">*");
		if (n = t.offset().top, i = t.height(), 0 === o.length) e = t.offset().left;
		else {
		  var a = $(o[o.length - 1]);
		  e = a.offset().left + a.width()
		}
		me.$el.hasClass("panel-expanded") || me.$el.attr("old-style", me.$el.attr("style")), me.$el.animate({
		  left: e,
		  top: n,
		  width: 200,
		  height: t.height()
		}, 100, function () {
		  me.$el.hasClass("panel-expanded") && (me.$el.removeClass("panel-expanded"), me.$el.find(".panel-heading [data-func=expand] ." + globalPanel.PRIVATE_OPTIONS.iconClass).removeClass(me.$options.expand.icon2).addClass(me.$options.expand.icon)), me.$el.addClass("panel-minimized"), me.$el.removeAttr("style"), me.disableDrag(), me.disableResize(), _expandOnHeaderClick(), t.append(me.$el), $("body").addClass("globalpanel-minimized");
		  var e = "calc(100% - " + $heading.find(".dropdown-menu li>a:visible").length * $heading.find(".dropdown-menu li>a:visible").first().outerWidth() + "px)";
		  $heading.find(".panel-title").css("max-width", e), _triggerEvent("onMinimize")
		})
	  }
	  return me
	}, this.maximize = function () {
	  if (_triggerEvent("beforeMaximize"), !me.isMinimized()) return me;
	  if (me.isPinned()) $body.slideDown(), me.$el.find(".panel-footer").slideDown(), me.$el.removeClass("panel-collapsed"), _changeClassOfControl($heading.find('[data-func="minimize"]'));
	  else {
		me.enableTooltips();
		var e = me.$el.attr("old-style").getCss();
		me.$el.css({
		  position: e.position || "fixed",
		  "z-index": e["z-index"],
		  left: me.$el.offset().left,
		  top: me.$el.offset().top,
		  width: me.$el.width(),
		  height: me.$el.height()
		}), $("body").append(me.$el), delete e.position, delete e["z-index"], me.$el.animate(e, 100, function () {
		  me.$el.css("position", ""), me.$el.removeClass("panel-minimized"), me.$el.removeAttr("old-style"), me.$options.draggable && me.enableDrag(), me.enableResize(), _removeExpandOnHeaderClick();
		  var e = _getFooterForMinimizedPanels();
		  0 === e.children().length && e.remove(), $("body").removeClass("globalpanel-minimized"), $("body").addClass("globalpanel-minimized");
		  var n = "calc(100% - " + $heading.find(".dropdown-menu li").length * $heading.find(".dropdown-menu li").first().outerWidth() + "px)";
		  $heading.find(".panel-title").css("max-width", n), _triggerEvent("onMaximize")
		})
	  }
	  return me
	}, this.toggleMinimize = function () {
	  return me.isMinimized() ? me.maximize() : me.minimize(), me
	}, this.isOnFullScreen = function () {
	  return me.$el.hasClass("panel-expanded")
	}, this.toFullScreen = function () {
	  if (_triggerEvent("beforeFullScreen"), me.$el.hasClass("panel-collapsed")) return me;
	  _changeClassOfControl($heading.find('[data-func="expand"]')), $heading.find('[data-func="expand"]').tooltip("hide");
	  var e = _getMaxZIndex();
	  if (me.isPinned() || me.isMinimized()) {
		me.enableTooltips(), me.$el.css({
		  position: "fixed",
		  "z-index": e["z-index"] + 1,
		  left: me.$el.offset().left,
		  top: me.$el.offset().top - $(window).scrollTop(),
		  width: me.$el.width(),
		  height: me.$el.height()
		}), $("body").append(me.$el);
		var n = _getFooterForMinimizedPanels();
		0 === n.children().length && n.remove()
	  } else $body.css({
		width: "",
		height: ""
	  }), _setBodyHeight();
	  me.isMinimized() ? (me.$el.removeClass("panel-minimized"), _removeExpandOnHeaderClick()) : (me.$el.attr("old-style", me.$el.attr("style")), me.disableResize());
	  var i = $("." + globalPanel.PRIVATE_OPTIONS.toolbarClass),
		t = i.outerHeight() || 0;
	  return me.$el.animate({
		width: $(window).width(),
		height: $(window).height() - t,
		left: 0,
		top: 0
	  }, me.$options.expandAnimation, function () {
		me.$el.css({
		  width: "",
		  height: "",
		  right: 0,
		  bottom: t
		}), me.$el.addClass("panel-expanded"), $("body").css("overflow", "hidden"), $body.css({
		  width: _calculateBodyWidth(me.$el.width()),
		  height: _calculateBodyHeight(me.$el.height())
		}), me.disableDrag(), me.isPinned() && _disableSorting(), _triggerEvent("onFullScreen")
	  }), me
	}, this.toSmallSize = function () {
	  _triggerEvent("beforeSmallSize"), _changeClassOfControl($heading.find('[data-func="expand"]')), $heading.find('[data-func="expand"]').tooltip("hide");
	  var e = me.$el.attr("old-style").getCss();
	  return me.$el.animate({
		left: e.left,
		top: e.top,
		width: e.width,
		height: e.height,
		right: e.right,
		bottom: e.bottom
	  }, me.$options.collapseAnimation, function () {
		me.$el.removeAttr("old-style"), me.$el.hasClass("panel-unpin") ? (me.$options.draggable && me.enableDrag(), me.enableResize()) : (me.$el.removeAttr("style"), _insertInParent(), _enableSorting()), me.$el.removeClass("panel-expanded"), $("body").css("overflow", "auto");
		var e = "",
		  n = "";
		me.isPinned() ? "auto" !== me.$options.bodyHeight && (n = me.$options.bodyHeight) : (e = _calculateBodyWidth(me.getWidth()), n = _calculateBodyHeight(me.getHeight())), $body.css({
		  width: e,
		  height: n
		}), _triggerEvent("onSmallSize")
	  }), me
	}, this.toggleSize = function () {
	  return me.isOnFullScreen() ? me.toSmallSize() : me.toFullScreen(), me
	}, this.close = function () {
	  return _triggerEvent("beforeClose"), me.$el.hide(100, function () {
		me.isOnFullScreen() && $("body").css("overflow", "auto"), me.$el.remove(), _triggerEvent("onClose")
	  }), me
	}, this.setPosition = function (e, n) {
	  return me.isPinned() ? me : (me.$el.animate({
		left: e,
		top: n
	  }, 100), me)
	}, this.setWidth = function (e) {
	  if (me.isPinned()) return me;
	  var n = _calculateBodyWidth(e);
	  return me.$el.animate({
		width: e
	  }, 100), $body.animate({
		width: n
	  }, 100), me
	}, this.setHeight = function (e) {
	  if (me.isPinned()) return me;
	  var n = _calculateBodyHeight(e);
	  return me.$el.animate({
		height: e
	  }, 100), $body.animate({
		height: n
	  }, 100), me
	}, this.setSize = function (e, n) {
	  if (me.isPinned()) return me;
	  var i = _calculateBodyHeight(n),
		t = _calculateBodyWidth(e);
	  return me.$el.animate({
		height: n,
		width: e
	  }, 100), $body.animate({
		height: i,
		width: t
	  }, 100), me
	}, this.getPosition = function () {
	  var e = me.$el.offset();
	  return {
		x: e.left,
		y: e.top
	  }
	}, this.getWidth = function () {
	  return me.$el.width()
	}, this.getHeight = function () {
	  return me.$el.height()
	}, this.bringToFront = function () {
	  _triggerEvent("beforeToFront");
	  var e = _getMaxZIndex();
	  return e.id === me.$el.data("inner-id") ? me : (me.$el.css("z-index", e["z-index"] + 1), _triggerEvent("onToFront"), me)
	}, this.enableDrag = function () {
	  return me.$el.draggable({
		handle: ".panel-heading"
	  }), me
	}, this.disableDrag = function () {
	  return me.$el.hasClass("ui-draggable") && me.$el.draggable("destroy"), me
	}, this.enableResize = function () {
	  var e = !1;
	  return "vertical" === me.$options.resize ? e = "n, s" : "horizontal" === me.$options.resize ? e = "e, w" : "both" === me.$options.resize && (e = "all"), e ? (me.$el.resizable({
		minWidth: me.$options.minWidth,
		maxWidth: me.$options.maxWidth,
		minHeight: me.$options.minHeight,
		maxHeight: me.$options.maxHeight,
		handles: e,
		start: function () {
		  _triggerEvent("resizeStart")
		},
		stop: function () {
		  _triggerEvent("resizeStop")
		},
		resize: function () {
		  var e = _calculateBodyHeight(me.$el.height()),
			n = _calculateBodyWidth(me.$el.width());
		  $body.css({
			width: n,
			height: e
		  }), _triggerEvent("onResize")
		}
	  }), me) : void 0
	}, this.disableResize = function () {
	  return me.$el.hasClass("ui-resizable") && me.$el.resizable("destroy"), me
	}, this.startLoading = function () {
	  var e = _generateWindow8Spinner();
	  me.$el.append(e);
	  var n = e.find(".spinner");
	  return n.css("margin-top", 50), me
	}, this.stopLoading = function () {
	  return me.$el.find(".spinner-wrapper").remove(), me
	}, this.setLoadUrl = function (e) {
	  return me.$options.loadUrl = e, me
	}, this.load = function (e) {
	  _triggerEvent("beforeLoad");
	  var n, i = null,
		t = null;
	  return e ? "string" == typeof e ? n = e : "object" != typeof e || $.isEmptyObject(e) || (n = e.url || me.$options.loadUrl, i = e.data, t = e.callback || null) : n = me.$options.loadUrl, n ? (me.startLoading(), $body.load(n, i, function (e, n, i) {
		t && "function" == typeof t && t(e, n, i), me.stopLoading(), _triggerEvent("loaded", e, n, i)
	  }), me) : void 0
	}, this.destroy = function () {
	  return me.disableDrag(), me.disableResize(), me.$options.sortable = !1, _enableSorting(), _removeInnerIdFromParent(innerId), me.$el.removeClass("globalpanel").removeAttr("data-inner-id").removeAttr("data-index").removeData("globalPanel"), $heading.find(".dropdown").remove(), me.$el
	}, this.startTitleEditing = function () {
	  var e = $heading.find(".panel-title").text().trim(),
		n = $('<input value="' + e + '"/>');
	  return n.on("keydown", function (e) {
		13 === e.which ? me.finishTitleEditing() : 27 === e.which && me.cancelTitleEditing()
	  }), $heading.find(".panel-title").data("old-title", e).html("").append(n), n[0].focus(), n[0].select(), _changeClassOfControl($heading.find('[data-func="editTitle"]')), me
	}, this.isTitleEditing = function () {
	  return $heading.find(".panel-title input").length > 0
	}, this.cancelTitleEditing = function () {
	  var e = $heading.find(".panel-title");
	  return e.html(e.data("old-title")).find("input").remove(), _changeClassOfControl($heading.find('[data-func="editTitle"]')), me
	}, this.finishTitleEditing = function () {
	  var e = $heading.find("input");
	  return $heading.find(".panel-title").html(e.val()), e.remove(), _changeClassOfControl($heading.find('[data-func="editTitle"]')), me
	}, this.enableTooltips = function () {
	  if ($(window).width() < 768) return me;
	  var e = $heading.find(".dropdown-menu>li>a");
	  return e.each(function (e, n) {
		var i = $(n);
		i.attr("data-toggle", "tooltip").attr("data-title", i.data("tooltip")).attr("data-placement", "bottom")
	  }), e.each(function (e, n) {
		$(n).tooltip({
		  container: "body",
		  template: '<div class="tooltip globalpanel-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	  }), me
	}, this.disableTooltips = function () {
	  return $heading.find(".dropdown-menu>li>a").tooltip("destroy"), me
	}, this.$el = $el, this.$options = _processInput(options), $heading = this.$el.find(">.panel-heading"), $body = this.$el.find(">.panel-body"), _init()
  };
  $.fn.globalPanel = function (e) {
	var n, i = arguments;
	return this.each(function () {
	  var t = $(this),
		o = t.data("globalPanel"),
		a = "object" == typeof e && e;
	  o || t.data("globalPanel", o = new globalPanel(t, a)), "string" == typeof e && (i = Array.prototype.slice.call(i, 1), n = o[e].apply(o, i))
	}), n
  }, globalPanel.PRIVATE_OPTIONS = {
	parentAttr: "data-globalpanel-child-inner-id",
	toolbarClass: "globalpanel-minimized-toolbar",
	initialZIndex: 1e4,
	iconClass: "panel-control-icon"
  }, $.fn.globalPanel.DEFAULTS = {
	draggable: !0,
	sortable: !1,
	connectWith: ".ui-sortable",
	resize: "both",
	minWidth: 200,
	minHeight: 100,
	maxWidth: 1200,
	maxHeight: 700,
	loadUrl: "",
	autoload: !0,
	bodyHeight: "auto",
	tooltips: !0,
	toggleIcon: "glyphicon glyphicon-cog",
	expandAnimation: 100,
	collapseAnimation: 100,
	unpin: {
	  icon: "glyphicon glyphicon-move",
	  tooltip: "Unpin"
	},
	reload: {
	  icon: "glyphicon glyphicon-refresh",
	  tooltip: "Reload"
	},
	minimize: {
	  icon: "glyphicon glyphicon-minus",
	  icon2: "glyphicon glyphicon-plus",
	  tooltip: "Minimize"
	},
	expand: {
	  icon: "glyphicon glyphicon-resize-full",
	  icon2: "glyphicon glyphicon-resize-small",
	  tooltip: "Fullscreen"
	},
	close: {
	  icon: "glyphicon glyphicon-remove",
	  tooltip: "Close"
	},
	editTitle: {
	  icon: "glyphicon glyphicon-pencil",
	  icon2: "glyphicon glyphicon-floppy-disk",
	  tooltip: "Edit title"
	}
  }, $(".globalpanel").globalPanel()
});