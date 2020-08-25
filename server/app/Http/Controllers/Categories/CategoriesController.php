<?php

namespace App\Http\Controllers\Categories;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Categories;
use App\Articles;
 
class CategoriesController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* select via model:

            $data = Categories::find(1);
            echo $data->nom;
        */
        /*  utilisation relation model:

            $categorie = Categories::first();
            echo $categorie->articles;
        */
        $categories = Categories::get();

        if ($categories == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'categories' => $categories]);
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
      $id = Categories::insertGetId([
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
        $categorie = Categories::find($id);

        if ($categorie == null) {
            return response()->json(['result' => 'categorie '.$id.' not found']);
        } else {
            $affected = DB::table('categories')
                ->where('id', $id)
                ->update(['vues' => $categorie->vues + 1]);

            $categorie->vues += 1;
            return response()->json(['result' => 'categorie_'.$id , 'categorie' => $categorie]);
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
      $affected = DB::table('categories')
            ->where('id', $id)
            ->update(['nom' => $request->nom]);

      if ($affected == null) {
          return response()->json(['result' => 'categorie '.$id.' not found']);
      } else {
          return response()->json(['result' => 'categorie_update' , 'categorie' => $affected]);
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
        $result = Categories::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'categorie '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }

    public function getPopularCategory()
    {
        $max = Categories::orderBy('vues', 'desc')->first();

        if(!$max) {
            return response()->json(['result' => 'Categorie popular not found']);
        } else {
            return response()->json(['name' => $max->nom, 'id' => $max->id, 'photo' => $max->photo]);
        }
    }
}
