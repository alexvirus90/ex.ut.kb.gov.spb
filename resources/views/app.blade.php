<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Вход</title>

	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="/css/login.css"/>

	<!-- Fonts -->
	<!--<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'> -->

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<!--<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="janitor col-md-6 d-inline"></div>
			<div class="car col-md-6 d-inline"></div>
			<div class="w-100"></div>
			<div class="ambulance col-md-6 d-inline"></div>
			<div class="fortress col-md-6 d-inline"></div>
		</div>
	</div>

	@yield('content')
	<script type="text/javascript" src="/js/lib/jquery.min.js"></script>
	<script type="text/javascript" src="/js/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript">
	  $(document).ready(function () {

		function rsM() {
		  var height = $(window).height();
		  var heightCell = height / 2;
		  $('.janitor, .car, .ambulance, .fortress').css('height', heightCell);
		}
		rsM();
		$(window).resize(function () {
		  rsM();
		});
	  });
	</script>

</body>
</html>
