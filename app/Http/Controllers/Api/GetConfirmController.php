<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetConfirmController extends Controller {

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
	private $sid;
	private $st;
	
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
		$this->sid = $_GET['sid'];
		$this->st = $_GET['st'];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$value = $this->RM_ReplaceableTask_Confirm($this->db, $this->pid, $this->sid, $this->st);

		exit(json_encode($value));
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
	private function RM_ReplaceableTask_Confirm($db, $pid, $sid, $st)
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

		return $arr;
	}
/* END */
}
