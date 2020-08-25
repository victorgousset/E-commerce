<?php

namespace App\Http\Controllers\Carte_bleues;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Carte_bleues;
use App\User;

class Carte_bleuesController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $cartes = Carte_bleues::get();

      return response()->json(['result' => 'succes' , 'cartes' => $cartes]);
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

      $id = Carte_bleues::insertGetId([
        'user_id' => $user->id,
        'numero' => $request->numero,
        'date' => $request->date,
        'titulaire' => $request->titulaire,
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
        $carte = Carte_bleues::find($id);
        print_r($carte->user);

        if ($carte == null) {
            return response()->json(['result' => 'carte '.$id.' not found']);
        } else {
            return response()->json(['result' => 'carte_'.$id , 'carte' => $carte]);
        }
    }

    /**
    * Display the specified resource by ArticleId.
    *
    * @param  string  $token
    * @return \Illuminate\Http\Response
    */
    public function showByToken($token)
    {
        $user = DB::table("users")->where('token', $token)->first();
        $carte = Carte_bleues::where('user_id', $user->id)->orderBy('id', 'DESC')->first();

        return response()->json(['carte' => $carte]);
    }
    
    /**
    * Display the specified resource by ArticleId.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function showByArticleId($id)
    {
        $carte = Carte_bleues::where('users_id', $id)->get();

        if ($carte == null) {
            return response()->json(['result' => 'carte '.$id.' not found']);
        } else {
            return response()->json(['result' => 'carte_'.$id , 'carte' => $carte]);
        }
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
      $affected = DB::table('carte_bleues')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'cartes '.$id.' not found']);
      } else {
          return response()->json(['result' => 'cartes_update' , 'cartes' => $affected]);
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
        $result = DB::table('carte_bleues')
              ->where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'cartes '.$id.' not found']);
        } else {
          return response()->json(['result' => 'cartes '.$id.' deleted', 'id' => $id]);
        }
    }
}
