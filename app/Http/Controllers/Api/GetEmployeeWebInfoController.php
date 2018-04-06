<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetEmployeeWebInfoController extends Controller {

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
//	private $fid;
	private $vid;
	
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
//		$this->fid = $_GET['fid'];
		$this->vid = $_GET['vid'];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->GetEmployeeWebInfo($this->db, $this->pid, $this->vid);

		exit(json_encode($value));
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
	private function GetEmployeeWebInfo($db, $pid, $vid)
	{
		$arr = array();

		$sql = "EXEC RM_EmployeeWebInfo_Get @PrincipalID = " . $pid . ", @VehicleID = " . $vid . "";
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

		return $arr;
	}
/* END */
}
