<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetAlarmInfoController extends Controller {

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
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->getAlarmInfo($this->db, $this->pid);
//dump($value); dd();
		exit(json_encode($value));
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

		return $arr;
	}
/* END */
}
