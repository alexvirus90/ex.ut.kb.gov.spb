<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('home');
});

Route::get('/', ['uses'=>'HomeController@index']);

/*
|
|	API
|
*/

Route::get('/api/{pram?}', ['uses'=>'ApiController@index']);

Route::get('/getinfo/{param?}', ['uses'=>'Api\GetInfoCarController@index']);
Route::get('/getColor/{param?}', ['uses'=>'Api\GetColorController@index']);
Route::get('/getZoneFun/{param?}', ['uses'=>'Api\GetZoneFunController@index']);
Route::get('/GetEmployeeWebInfo/{param?}', ['uses'=>'Api\GetEmployeeWebInfoController@index']);
Route::get('/getalarm/{param?}', ['uses'=>'Api\GetAlarmInfoController@index']);
Route::get('/get_app_list/{param?}', ['uses'=>'Api\GetAppListController@index']);
Route::get('/confirm/{param?}', ['uses'=>'Api\GetConfirmController@index']);
Route::get('/gettrack/{param?}', ['uses'=>'Api\GetTrackController@index']);
Route::get('/RM_JobWebInfo_Get/{param?}', ['uses'=>'Api\GetRMJobWebInfoController@index']);

/*
|
|
|
*/

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');
