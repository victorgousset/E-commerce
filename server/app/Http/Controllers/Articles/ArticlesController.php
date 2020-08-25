<?php

namespace App\Http\Controllers\Articles;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Articles;
use App\Categories;
use App\Producteurs;
use App\Caracteristiques_produits;

class ArticlesController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      /*  utilisation relation model:

        $article = Articles::first();
        echo $article->categories;
      */
      /* select via model:

        $data = Articles::find(1);
        echo $data->titre;
      */
        $articles = Articles::get();

        for($i = 0 ; $i < count($articles) ; $i++) {
          $articles[$i]->caracteristiques_produits;
        }

        if ($articles == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'articles' => $articles]);
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
      // params {categories_id, titre, description, prix}
      $id = Articles::insertGetId([
        'categories_id' => $request->categories_id,
        'producteurs_id' => $request->producteurs_id,
        'titre' => $request->titre,
        'description' => $request->description,
        // 'utilisation' => $request->utilisation,
        'proprietes' => $request->proprietes,
        'compo' => $request->compo,
        'utilisation' => $request->utilisation,
        'photo' => $request->photo,
      ]);

      if ($id == null) {
          return response()->json(['result' => 'creation_failed']);
      } else {
          return response()->json(['result' => 'creation_ok', "id" => $id]);
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
        $article = Articles::find($id);

        if ($article == null) {
            return response()->json(['result' => 'article '.$id.' not found']);
        } else {
          $affected = DB::table('articles')
                ->where('id', $id)
                ->update(['vues' => $article->vues + 1]);

            $article->vues += 1;
            return response()->json(['result' => 'article_'.$id , 'article' => $article, 'details' => $article->caracteristiques_produits]);
        }
    }

    /**
     * Display the specified resource by categories.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByCategories($id)
    {
        $articles = Articles::where('categories_id', $id)->get();

        for($i = 0 ; $i < count($articles) ; $i++) {
          $articles[$i]->caracteristiques_produits;
        }

        return response()->json(['articles' => $articles]);
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
      /* object a envoyer avec axios:
        params: {
          titre: 'kevn',
          prix: 123,
          description: 'on a update',
          caracteristiques: 'je suis chaud',
        }
      */

      $affected = DB::table('articles')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'article '.$id.' not found']);
      } else {
          return response()->json(['result' => 'article_update' , 'article' => $affected]);
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
        $result = Articles::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'article '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }

    public function getPopularArticle()
    {
        $max = Articles::orderBy('vues', 'desc')->first();

        if(!$max) {
            return response()->json(['result' => 'Articles popular not found']);
        } else {
            return response()->json(['name' => $max->titre, 'id' => $max->id, 'photo' => $max->photo]);
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function stock(Request $request ,$id)
    {
      $article = Articles::find($id);
      if($article == null)
      {
        return response()->json(['result' => 'article '.$id.' not found']);
      }
      else
      {
        $article->stocks -= $request->achat;
        Articles::where('id', $id)
          ->update(['stocks' => $article->stocks]);

        if($article->stocks  == 0)
        {
          return response()->json(['result' => 'This article is out of stock']);
        }

        else
        {
          return response()->json(['result' => $article->stocks.' articles left']);

        }
      }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function onAvant(Request $request, $id)
    {
      $test = DB::table('articles')
          ->where('devant', 1)
          ->update(['devant' => null]);
   
      $affected = DB::table('articles')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'article '.$id.' not found']);
      } else {
          return response()->json(['result' => 'article mis en avant ' , 'article' => $affected]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showDevant()
    {
      $article = Articles::where('devant', 1)->get();

      if ($article == null) {
          return response()->json(['result' => 'article not fouasdnd']);
      } else {
          return response()->json(['result' => 'articles trouver', 'article' => $article]);
      }
    }

    /**
     * Display the specified resource in promo.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showInPromo()
    {
      $article = Caracteristiques_produits::where('promo', '!=', 0)->get();
      
      for($i = 0 ; $i < count($article) ; $i++) {
        $article[$i]->articles;
      }
      
      if ($article == null) {
        return response()->json(['result' => 'article not fouasdnd']);
      } else {
        return response()->json(['result' => 'articles trouver', 'article' => $article]);
      }
    }

}
