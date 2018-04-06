<?php namespace App\Http\Controllers;

require_once('geophp\geoPHP.inc');

use Auth;
use DB;
use geoPHP;
use PDO;

class ApiController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| API Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	private $db;
//	private $PrincipalID;
	
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//$this->middleware('auth');

//		session_start();
//		$user = Auth::user();

//		$this->PrincipalID = $user->PrincipalID;

		$this->db = DB::connection()->getPdo();
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		//return view('home');
//dd($_GET);		
		$possible_url = array("get_app_list", "get_app","doLogin","getZoneFun","getColor","confirm","getinfo","gettrack","getalarm","GetEmployeeWebInfo","RM_JobWebInfo_Get");

		$value = "An error has occurred";

		if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
		{
		  switch ($_GET["action"])
			{
				case "RM_JobWebInfo_Get":
					//$value = $this->RM_JobWebInfo_Get($this->db, $_GET["pid"]);
					return redirect('/RM_JobWebInfo_Get?pid='.$_GET['pid'].'&vid='.$_GET['vid']);
				break;
				case "GetEmployeeWebInfo":
					//$value = $this->GetEmployeeWebInfo($this->db, $_GET["pid"]);
					return redirect('/GetEmployeeWebInfo?pid='.$_GET['pid'].'&vid='.$_GET['vid']);
				break;
				case "getalarm":
					//$value = $this->getAlarmInfo($this->db, $_GET["pid"]);
					return redirect('/getalarm?pid='.$_GET['pid']);
				break;
				case "gettrack":
					//$value = $this->getTrackCar($this->db, $_GET["pid"]);
					return redirect('/gettrack?pid='.$_GET['pid'].'&vid='.$_GET['vid'].'&dt='.$_GET['dt'].'&df='.$_GET['df']);
				break;
				case "getinfo":
					//$value = $this->getInfoCar($this->db, $_GET["pid"]);
					return redirect('/getinfo?pid='.$_GET['pid']);
				break;
				case "confirm":
					//$value = $this->RM_ReplaceableTask_Confirm($this->db, $_GET["sid"], $_GET["pid"], $_GET["st"]);
					return redirect('/confirm?pid='.$_GET['pid'].'&sid='.$_GET['sid'].'&st='.$_GET['st']);
					break;
				case "getColor":
					//$value = $this->RM_RouteTaskDetails_Get_WebInfo($this->db, $_GET["fid"], $_GET["pid"]);
					return redirect('/getColor?pid='.$_GET['pid'].'&fid='.$_GET['fid']);
				break;
				case "getZoneFun":
					//$value = $this->RM_RouteTaskDetails_Get_Web($this->db, $_GET["fid"], $_GET["pid"]);
					return redirect('/getZoneFun?pid='.$_GET['pid'].'&fid='.$_GET['fid']);
				break;
				case "doLogin":
					$value = doLogin($db);
					break;
				case "get_app_list":
					//$value = $this->getReplaceableTaskHeader($this->db, $_GET["pid"]);
					return redirect('/get_app_list?pid='.$_GET['pid']);
				break;
				case "get_app":
					if (isset($_GET["id"]))
					  $value = $this->get_app_by_id($this->db, $_GET["id"]);
					else
					  $value = "Missing argument";
				break;
			}
		}
//dump($value); dd();
		exit(json_encode($value));
	}
	/*
	|--------------------------------------------------------------------------
	|	RM_JobWebInfo_Get
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID
	|	@VehicleID
	|
	*/
	private function RM_JobWebInfo_Get($db, $pid)
	{
		$arr = array();

		$sql = "EXEC RM_JobWebInfo_Get @PrincipalID = " . $pid . ", @VehicleID = " . $_GET['vid'] . "";
/*
		$params = array(
			'@PrincipalID'   => array(
				'type'  => SQLINT4,
				'value' => $pid
			),
			'@VehicleID'   => array(
				'type'  => SQLINT4,
				'value' => $_GET['vid'] //null
			)
		);
*/
		$result = $db->prepare($sql);

		$result->execute();

		while ($row =  $result->fetch(PDO::FETCH_OBJ))
		{
			array_push($arr,$row);
		}
dump($arr); dd();
		return $arr;
	}

	/*
	|--------------------------------------------------------------------------
	|	GetEmployeeWebInfo
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@VehicleID		- SQLINT4
	|
	*/
	private function GetEmployeeWebInfo($db, $pid)
	{
		$arr = array();

		$sql = "EXEC RM_EmployeeWebInfo_Get @PrincipalID = " . $pid . ", @VehicleID = " . $_GET['vid'] . "";
/*
		$params = array(
			'@PrincipalID'   => array(
				'type'  => SQLINT4,
				'value' => $pid
			),
			'@VehicleID'   => array(
				'type'  => SQLINT4,
				'value' => $_GET['vid']//null
			)
		);
*/
		$result = $db->prepare($sql);

		$result->execute();

		while ($row =  $result->fetch(PDO::FETCH_OBJ))
		{
			array_push($arr, $row);
		}
dump($arr); dd();
		return $arr;
	}

	/*
	|--------------------------------------------------------------------------
	|	getAlarmInfo
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@id_list		- SQLVARCHAR
	|
	*/
	private function getAlarmInfo($db, $pid)
	{
		$arr = array();

		$sql = "EXEC TrackersSomethingWrong_Online @PrincipalID = " . $pid . ", @id_list = '0'";
/*
		$params = array( 
			'@PrincipalID'   => array( 
				'type'  => SQLINT4, 
				'value' => $pid
			),
			'@id_list'   => array(
				'type'  => SQLVARCHAR,
				'value' => "0"
			)
		); 
*/
		$result = $db->prepare($sql);

		$result->execute();

		while ($row =  $result->fetch(PDO::FETCH_OBJ))
		{
			array_push($arr, $row); 	
		}
dump($arr); dd();
		return $arr;
	}

	/*
	|--------------------------------------------------------------------------
	|	getTrackCar
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@VehicleID		- SQLINT4
	|	@DateFrom		- SQLVARCHAR
	|	@DateTo			- SQLVARCHAR
	|
	*/
	private function getTrackCar($db, $pid)
	{
		$VehicleID = $_GET['vid'];
		$D_FROM = $_GET['df'];
		$D_TO = $_GET['dt'];

		$arr = array();
		$j=0;

		$sql = "EXEC KBDH_DR_TrackersTracksFB @PrincipalID = " . $pid . ", @VehicleID = " . $VehicleID . ", @DateFrom = '" . $D_FROM . "', @DateTo = '" . $D_TO . "'";
/*
			$params = array( 
			'@PrincipalID'   => array( 
				'type'  => SQLINT4, 
				'value' => $pid
			),
			 '@VehicleID'   => array( 
				'type'  => SQLINT4, 
				'value' => $VehicleID
			),
			 '@DateFrom'   => array( 
				'type'  => SQLVARCHAR, 
				'value' => $D_FROM
			),
			 '@DateTo'   => array( 
				'type'  => SQLVARCHAR, 
				'value' => $D_TO
			)
*/
		$result = $db->prepare($sql);

		$result->execute();

		while ($row = $result->fetch(PDO::FETCH_OBJ))
		{
			array_push($arr, $row); 	
		}
dump($arr); dd();
		return $arr;
/*
		catch(Exception $err)
		{
			$response['success'] = false;
			$response['err'] =  "";
			$response['data'] =  "";
			return $response;
		}
*/
	}

	/*
	|--------------------------------------------------------------------------
	|	getInfoCar
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID - SQLINT4
	|
	*/
	private function getInfoCar($db, $pid)
	{
		$sql = "EXEC KBDH_CR_Trees_VehiclesGroupsVehicles_New @PrincipalID = " . $pid . "";
/*
		$params = array( 
			'@PrincipalID'   => array( 
				'type'  => SQLINT4, 
				'value' => $pid
			)
		); 
*/
		$result = $db->prepare($sql);

		$result->execute();

		$arr = array();

		while ($row = $result->fetch(PDO::FETCH_OBJ))
		{
			$row->marker = '';
			$row->id = $row->DID;
			array_push($arr, $row);
		}
dump($arr); dd();
		return $arr;
	}

	/*
	|--------------------------------------------------------------------------
	|	RM_ReplaceableTask_Confirm
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@ID_RepT_Head	- SQLVARCHAR
	|	@ID_RepT_State	- SQLINT4
	|
	*/
	private function RM_ReplaceableTask_Confirm($db, $sid, $pid, $st)
	{
		$sql = "EXEC RM_ReplaceableTask_MassChangeState @PrincipalID = " . $pid . ", @ID_RepT_Head = '" . $sid . "', @ID_RepT_State = " . $st . ""; 
/*
		 $params = array( 
			'@PrincipalID'   => array( 
				'type'  => SQLINT4, 
				'value' => $pid
			),
			 '@ID_RepT_Head'   => array( 
				'type'  => SQLVARCHAR, 
				'value' => $sid
			),
			'@ID_RepT_State' => array( 
				'type'  => SQLINT4, 
				'value' => $st
			),
		);
*/
		$result = $db->prepare($sql);

		$result->execute();

		$arr = array();
		$j=0;

		while ($row = $result->fetch(PDO::FETCH_OBJ))
		{
		   array_push($arr, $row); 
		   $j++;
		}
dump($arr); dd();
		return $arr;
		// $out = json_encode(array("success" =>true, "result"=>$arr));
		// exit($out); 
	}

	/*
	|--------------------------------------------------------------------------
	|	RM_RouteTaskDetails_Get_WebInfo
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID		- SQLINT4
	|	@ID_RouteTaskDetail	- SQLINT4
	|	@func				- SQLVARCHAR
	|
	*/
	private function RM_RouteTaskDetails_Get_WebInfo($db, $fid, $pid)
	{
		$arr_id = explode(",", $_GET['lmzid']);  
		$arr = array();
		$j=0;

		foreach ($arr_id as $value)
		{
/*			$params = array(  '@PrincipalID'   => array( 
								'type'  => SQLINT4, 
								'value' => $pid
							 ),
								'@ID_RouteTaskDetail'   => array( 
								'type'  => SQLINT4, 
								'value' =>$value, //$_POST['idrtd']
							),
								'@func'   => array( 
								'type'  => SQLVARCHAR, 
								'value' => $fid
							),
						);
*/
			$sql = "EXEC RM_RouteTaskDetails_Get_WebInfo @PrincipalID = " . $pid . ", @ID_RouteTaskDetail = " . $value . ", @func = " . $fid . "";

			$result = $db->prepare($sql);

			$result->execute();
		  
			$j=0;
		
			while ($row = $result->fetch(PDO::FETCH_OBJ))
			{
				array_push($arr, array('color' => $row->color, 'idrm' => $value)); 
			}

			$j++;
		}

		$out = json_encode($arr, JSON_UNESCAPED_UNICODE);
dump($out); dd();
		exit($out);
	}

	/*
	|--------------------------------------------------------------------------
	|	RM_RouteTaskDetails_Get_Web
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID - SQLINT4
	|	@func -
	|
	*/
	private function RM_RouteTaskDetails_Get_Web($db, $fid, $pid)
	{

		$geojson = array(
			'type'      => 'FeatureCollection',
			'features'  => array()
		);

		$sql = "EXEC RM_RouteTaskDetails_Get_Web @func = " . $fid . ", @PrincipalID = " . $pid . "";

		$result = $db->prepare($sql);

		$result->execute();

		$arr = array(); 
		$j=0;

		while ($row = $result->fetch(PDO::FETCH_OBJ))
		{
			$feature = array(
				'type' => 'Feature',
				'geometry' => json_decode($this->wkt_to_json($row->Segment)),
				'properties' => array('id' => $row->ID_RouteTaskDetail, 'name' => $row->Name)
				);

				# Add feature arrays to feature collection array
			array_push($geojson['features'], $feature);
		}
dump($geojson); dd();
		return $geojson;
	}

	/*
	|--------------------------------------------------------------------------
	|	getReplaceableTaskHeader
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@DateFrom		- SQLVARCHAR
	|	@DateTo			- SQLVARCHAR
	|	@HaulerListId	- SQLVARCHAR
	|	@AutocadeListId - SQLVARCHAR
	|
	*/
	private function getReplaceableTaskHeader($db, $pid)
	{
		$principalID = $pid;

		$sql = "RM_ReplaceableTask_Header_Get";

		$result = $db->prepare("EXEC RM_ReplaceableTask_Header_Get @PrincipalID = " . $principalID .
			", @DateFrom = '" . date("Y-m-d") . " 00:00:00', @DateTo = '" . date("Y-m-d") . " 23:59:59', @HaulerListId = '-1', @AutocadeListId = '-1'");

		$result->execute();

		$arr = array();
		$j=0;

		while ($row = $result->fetch(PDO::FETCH_ASSOC))
		{
		   array_push($arr, $row); 
		   $j++;
		}

		$out = json_encode($arr, JSON_UNESCAPED_UNICODE);
dump($out); dd();
		return $out; 
	}

	/*
	|--------------------------------------------------------------------------
	|	get_app_by_id
	|--------------------------------------------------------------------------
	|
	*/
	private function get_app_by_id($db, $id)
	{
		$app_info = array();

		// normally this info would be pulled from a database.
		// build JSON array.
		switch ($id)
		{
			case 1:
			  $app_info = array("app_name" => "Web Demo", "app_price" => "Free", "app_version" => "2.0"); 
			  break;
			case 2:
			  $app_info = array("app_name" => "Audio Countdown", "app_price" => "Free", "app_version" => "1.1");
			  break;
			case 3:
			  $app_info = array("app_name" => "The Tab Key", "app_price" => "Free", "app_version" => "1.2");
			  break;
			case 4:
			  $app_info = array("app_name" => "Music Sleep Timer", "app_price" => "Free", "app_version" => "1.9");
			  break;
		}

		return $app_info;
	}

	/*
	|--------------------------------------------------------------------------
	|
	|--------------------------------------------------------------------------
	|
	|
	*/
	private function wkt_to_json($wkt)
	{
		//
		$geom = geoPHP::load($wkt, 'wkt');

		return $geom->out('json');
	}

/* END */
}
