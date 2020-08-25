<?php

namespace App\Http\Controllers\Commandes_clients;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Commandes_clients;
use App\User;

class Commandes_clientsController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $commandes = Commandes_clients::get();

      for($i = 0 ; $i < count($commandes) ; $i++) {
        $commandes[$i]->caracteristiques_produits->articles;
      }
      for($i = 0 ; $i < count($commandes) ; $i++) {
        $commandes[$i]->expeditions->transporteurs;
      }

      return response()->json(['result' => 'succes' , 'commandes' => $commandes]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $id = Commandes_clients::insertGetId([
        'caracteristiques_produits_id' => $request->caracteristiques_produits_id,
        'expeditions_id' => $request->expeditions_id,
        'email' => $request->email,
        'status' => $request->status,
        'prix_port' => $request->prix_port,
        'prix_articles' => $request->prix_articles,
        'quantity' => $request->quantity,
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
        $commande = Commandes_clients::find($id);
        // print_r($commande->caracteristiques_produits);
        // print_r($commande->expeditions);

        if ($commande == null) {
            return response()->json(['result' => 'commande '.$id.' not found']);
        } else {
            return response()->json(['result' => 'commande_'.$id , 'commande' => $commande]);
        }
    }

    /**
     * Display the specified resource with token.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function showByToken($token)
    {
        $user = DB::table("users")->where('token', $token)->first();
        $commandes = Commandes_clients::where("email", $user->email)->get();

        for($i = 0 ; $i < count($commandes) ; $i++) {
          $commandes[$i]->caracteristiques_produits->articles;
        }
        for($i = 0 ; $i < count($commandes) ; $i++) {
          $commandes[$i]->expeditions->transporteurs;
        }

        return response()->json(['commandes' => $commandes]);
    }

    /**
    * Display the specified resource by ArticleId.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function showByArticleId($id)
    {
        $commande = Commandes_clients::where('users_id', $id)->get();

        if ($commande == null) {
            return response()->json(['result' => 'commande '.$id.' not found']);
        } else {
            return response()->json(['result' => 'commande_'.$id , 'commande' => $commande]);
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
      $affected = DB::table('commandes_clients')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'commandes '.$id.' not found']);
      } else {
          return response()->json(['result' => 'commandes_update' , 'commandes' => $affected]);
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
        $result = DB::table('commandes_clients')
              ->where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'commandes '.$id.' not found']);
        } else {
          return response()->json(['result' => 'commandes '.$id.' deleted', 'id' => $id]);
        }
    }
}
