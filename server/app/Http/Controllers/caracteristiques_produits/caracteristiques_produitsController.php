<?php

namespace App\Http\Controllers\caracteristiques_produits;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Caracteristiques_produits as Detail;
use App\Categories;

class caracteristiques_produitsController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $detail = Detail::get();

      return response()->json(['result' => 'succes' , 'detail' => $detail]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $id = Detail::insertGetId([
        'articles_id' => $request->articles_id,
        'format' => $request->formats,
        'prix' => $request->prix,
        'stocks' => $request->stocks,
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
      $details = Detail::find($id);

        if ($details == null) {
            return response()->json(['result' => 'details '.$id.' not found']);
        } else {
            return response()->json(['result' => 'details_'.$id , 'details' => $details, 'articles' => $details->articles]);
        }
    }
    
    /**
    * Display the specified resource by ArticleId.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function showByArticleId($id)
    {
        $details = Detail::where('articles_id', $id)->get();

        if ($details == null) {
            return response()->json(['result' => 'details '.$id.' not found']);
        } else {
            return response()->json(['result' => 'details_'.$id , 'details' => $details]);
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
      $affected = DB::table('caracteristiques_produits')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'detail '.$id.' not found']);
      } else {
          return response()->json(['result' => 'detail_update' , 'detail' => $affected]);
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
        $result = DB::table('caracteristiques_produits')
              ->where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'detail '.$id.' not found']);
        } else {
          return response()->json(['result' => 'detail '.$id.' deleted', 'id' => $id]);
        }
    }


    public function getRuptureArticle()
    {
        $produits = Detail::where('stocks', '0')->get();

        for($i = 0; $i < count($produits); $i++) {
          $produits[$i]->articles;
        }

        if ($produits == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'articles' => $produits]);
        }
    }

    public function getPromoArticle()
    {
        $produits = Detail::where('promo', ' >0')->get();

        for($i = 0; $i < count($produits); $i++) {
          $produits[$i]->articles;
        }

        if ($produits == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'articles' => $produits]);
        }
    }
}
