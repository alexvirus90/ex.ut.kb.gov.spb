<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetRMJobWebInfoController extends Controller {

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
//	private $dt;
//	private $df;
	
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
//		$this->dt = $_GET['dt'];
//		$this->df = $_GET['df'];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->RM_JobWebInfo_Get($this->db, $this->pid, $this->vid);

		exit(json_encode($value));
	}

	/*
	|--------------------------------------------------------------------------
	|	RM_JobWebInfo_Get
	|--------------------------------------------------------------------------
	|
	|	@PrincipalID	- SQLINT4
	|	@VehicleID		- SQLINT4
	|
	*/
	private function RM_JobWebInfo_Get($db, $pid, $vid)
	{
		$arr = array();

		$sql = "EXEC RM_JobWebInfo_Get @PrincipalID = " . $pid . ", @VehicleID = " . $vid . "";
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

		return $arr;
	}
/* END */
}
