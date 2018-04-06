<?php namespace App\Http\Controllers\Api;

//require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
//use geoPHP;
use PDO;

class GetAppListController extends Controller {

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
		$value = $this->getReplaceableTaskHeader($this->db, $this->pid);

		exit(json_encode($value));
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
		$sql = "EXEC RM_ReplaceableTask_Header_Get @PrincipalID = " . $pid .
			", @DateFrom = '" . date("Y-m-d") . " 00:00:00', @DateTo = '" . date("Y-m-d") . " 23:59:59', @HaulerListId = '-1', @AutocadeListId = '-1'";

		$result = $db->prepare($sql);

		$result->execute();

		$arr = array();
		$j=0;

		while ($row = $result->fetch(PDO::FETCH_ASSOC))
		{
		   array_push($arr, $row); 
		   $j++;
		}

		$out = json_encode($arr, JSON_UNESCAPED_UNICODE);

		return $out; 
	}
/* END */
}
