<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetInfoCarController extends Controller {

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
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->getInfoCar($this->db, $this->pid);
//dump($value); dd();
		exit(json_encode($value, JSON_UNESCAPED_UNICODE));
		
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

		return $arr;
	}
/* END */
}
