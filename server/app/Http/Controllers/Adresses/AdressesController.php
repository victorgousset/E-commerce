<?php

namespace App\Http\Controllers\Adresses;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Adresses;
use App\User;

class AdressesController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $adresses = Adresses::get();

      return response()->json(['result' => 'succes' , 'adresses' => $adresses]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $user = DB::table("users")->where('token', $request->token)->first();

      $id = Adresses::insertGetId([
        'user_id' => $user->id,
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'pays' => $request->pays,
        'adresse' => $request->adresse,
        'ville' => $request->ville,
        'postal' => $request->postal,
      ]);

      if ($id == null) {
          return response()->json(['result' => 'creation_failed']);
      } else {
          return response()->json(['result' => 'creation_ok', 'id' => $id]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $adresse = Adresses::find($id);
        // print_r($adresse->user);

        if ($adresse == null) {
            return response()->json(['result' => 'adresse '.$id.' not found']);
        } else {
            return response()->json(['result' => 'adresse_'.$id , 'adresse' => $adresse]);
        }
    }
    
    /**
    * Display the specified resource by ArticleId.
    *
    * @param  string  $token
    * @return \Illuminate\Http\Response
    */
    public function showByUserId($token)
    {
        $user = DB::table("users")->where('token', $token)->first();
        $adresse = Adresses::where('user_id', $user->id)->orderBy('id', 'DESC')->first();

        return response()->json(['adresse' => $adresse]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $affected = DB::table('adresses')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'adresses '.$id.' not found']);
      } else {
          return response()->json(['result' => 'adresses_update' , 'adresses' => $affected]);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = DB::table('adresses')
              ->where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'adresses '.$id.' not found']);
        } else {
          return response()->json(['result' => 'adresses '.$id.' deleted', 'id' => $id]);
        }
    }
}
