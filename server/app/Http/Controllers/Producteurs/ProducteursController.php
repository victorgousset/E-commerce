<?php

namespace App\Http\Controllers\Producteurs;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Producteurs;
use App\Articles;
 
class ProducteursController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $producteurs = Producteurs::get();

        if ($producteurs == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'producteurs' => $producteurs]);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      // params {nom}
      $id = Producteurs::insertGetId([
        'nom' => $request->nom,
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
        $producteurs = Producteurs::find($id);

        if ($producteurs == null) {
            return response()->json(['result' => 'producteurs '.$id.' not found']);
        } else {
            return response()->json(['result' => 'Producteurs_'.$id , 'producteurs' => $producteurs]);
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
      $affected = DB::table('producteurs')
            ->where('id', $id)
            ->update(['nom' => $request->nom]);

      if ($affected == null) {
          return response()->json(['result' => 'producteurs '.$id.' not found']);
      } else {
          return response()->json(['result' => 'producteurs_update' , 'producteurs modifier:' => $affected]);
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
        $result = Producteurs::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'producteurs '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }

     /**
     * Display list of articles of a producteur.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showArticles($id)
    {
        $producteurs = Producteurs::find($id);

        //test : 
        // foreach($producteurs->articles as $article) {
        //     echo "$article->titre \n";
        // }

        if ($producteurs == null) {
            return response()->json(['result' => 'producteurs '.$id.' not found']);
        } else {
            return response()->json(['result' => 'Producteurs_'.$id , 'articles' => $producteurs->articles]);
        }
    }
}
