<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetColorController extends Controller {

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
	private $fid;
	
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
		$this->fid = $_GET['fid'];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->RM_RouteTaskDetails_Get_WebInfo($this->db, $this->fid, $this->pid);

		exit(json_encode($value));
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

		exit($out);
	}
/* END */
}
