<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetTrackController extends Controller {

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
	private $pid;
	private $vid;
	private $dt;
	private $df;
	
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
		$this->pid = $_GET['pid'];
		$this->vid = $_GET['vid'];
		$this->dt = $_GET['dt'];
		$this->df = $_GET['df'];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->getTrackCar($this->db, $this->pid, $this->vid, $this->df, $this->dt);

		exit(json_encode($value));
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
	private function getTrackCar($db, $pid, $vid, $df, $dt)
	{
		$arr = array();
		$j=0;

		$sql = "EXEC KBDH_DR_TrackersTracksFB @PrincipalID = " . $pid . ", @VehicleID = " . $vid . ", @DateFrom = '" . $df . "', @DateTo = '" . $dt . "'";
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

		return $arr;
	}
/* END */
}
