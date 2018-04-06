<?php namespace App\Http\Controllers\Api;

require_once('geophp\geoPHP.inc');
use App\Http\Controllers\Controller;
use Auth;
use DB;
use geoPHP;
use PDO;

class GetZoneFunController extends Controller {

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
		$value = $this->RM_RouteTaskDetails_Get_Web($this->db, $this->fid, $this->pid);

		exit(json_encode($value));
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

		return $geojson;
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
