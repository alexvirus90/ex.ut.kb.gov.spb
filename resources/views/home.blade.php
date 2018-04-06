<?php
//	session_start();
	$user = Auth::user();
//	dump($user);
//	dump($_SESSION);
//	dd($_GET);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>globalAdmin</title>
	<link rel="shortcut icon" href="/img/logo/favicon.png"/>
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/leaflet.css">
	<link rel="stylesheet" href="/css/fontawesome-all.min.css"/>
	<link rel="stylesheet" href="/css/weather-icons.min.css"/>
	<link rel="stylesheet" href="/css/globaladmin-with-plugins.css"/>
	<link rel="stylesheet" href="/css/demo.css"/>
</head>
<body>
<nav class="navbar navbar-default navbar-header header">
	<a class="navbar-brand" href="#">
		<div class="navbar-brand-img"></div>
	</a>
	<ul class="nav navbar-nav pull-left show-hide-menu">
		<li>
			<a href="#" class="border-radius-0 btn font-size-lg" data-action="show-hide-sidebar">
				<i class="fas fa-bars"></i>
			</a>
		</li>
	</ul>
	<div class="navbar-items">
		<ul class="nav navbar-nav navbar-right user-actions">
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
					<i class="far fa-user-circle align-middle" style="font-size: 35px; vertical-align: middle"></i>
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu">
					<li><a href="lock.html"><span class="fas fa-lock"></span> &nbsp;&nbsp;Заблокировать</a></li>
					<li><a href="/auth/logout"><span class="fas fa-power-off"></span> &nbsp;&nbsp;Выйти</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="clearfix-xxs"></div>
	<!--?????????????????????????-->
	<!--<div class="navbar-items-2">
		<ul class="nav navbar-nav navbar-actions">
			<li class="visible-lg">
				<a href="#" data-action="info">
					<span class="fas fa-info-circle"></span>
				</a>
			</li>
		</ul>
	</div>-->
	<div class="clearfix"></div>
</nav>
<div class="menu">
	<nav>
		<ul>
			<li>
				<a href="#dashboard">
					<i class="fas fa-home menu-item-icon"></i>
					<span class="inner-text">Панель управления</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i class="fas fa-user menu-item-icon"></i>
					<span class="inner-text">Ручная уборка</span>
					<span class="badge-wrapper">
						<span class="badge badge-xs badge-cyan">4</span>
					</span>
				</a>
				<ul>
					<li>
						<a href="#map-manual">
							<span class="inner-text">Карта</span>
						</a>
					</li>
					<li>
						<a href="#buttons">
							<span class="inner-text">Мобильные объекты</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Геозоны</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Треки</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Отчеты</span>
						</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#">
					<img class="menu-item-icon image" src="./img/tractor.svg">
					<span class="inner-text">Мех. уборка</span>
					<span class="badge-wrapper">
						<span class="badge badge-xs badge-cyan">4</span>
					</span>
				</a>
				<ul>
					<li>
						<a href="#map-mechanical">
							<span class="inner-text">Карта</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Мобильные объекты</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Геозоны</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Треки</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="inner-text">Отчеты</span>
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div class="menu-collapse-line">
		<div class="menu-toggle-btn" data-action="collapse-expand-sidebar"></div>
	</div>
</div>
<div id="main">
	<div id="ribbon" class="hidden-print">
		<a href="#dashboard" class="btn-ribbon" data-container="#main" data-toggle="tooltip" data-title="Show dashboard"><i
			class="fa fa-home"></i></a>
		<span class="vertical-devider">&nbsp;</span>
		<button class="btn-ribbon" data-container="#main" data-action="reload" data-toggle="tooltip"
						data-title="Reload content by ajax"><i class="fas fa-sync-alt"></i></button>
		<ol class="breadcrumb">
		</ol>
	</div>
	<div id="content">
	</div>
</div>
<div class="spinner spinner-horizontal hide">
	<span class="spinner-text">Loading...</span>
	<div class="bounce1"></div>
	<div class="bounce2"></div>
	<div class="bounce3"></div>
</div>
<script type="text/javascript" src="js/lib/jquery.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/leaflet/leaflet.js"></script>
<script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="js/global-plugins/globalbox.min.js"></script>
<script type="text/javascript" src="js/global-plugins/globalpanel.js"></script>
<script type="text/javascript" src="js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="js/vis/vis.js"></script>
<script type="text/javascript" src="js/config.js"></script>
<script type="text/javascript" src="js/globalAdmin.min.js"></script>
<script type="text/javascript" src="js/app.js"></script>
<script type="text/javascript" src="js/demo.js"></script>
</body>
</html>
