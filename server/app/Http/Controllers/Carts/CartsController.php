<?php

namespace App\Http\Controllers\Carts;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Caracteristiques_produits as Detail;
use App\Carts;
use App\Transporteurs;
use App\Expeditions;

class CartsController
{

  /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      // Exemple pour acceder a l'article:  $items->caracteristiques_produits->articles
        $items = Carts::get();

        if ($items == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'articles' => $items]);
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
      $double = null;
      $produits = Carts::where('token',$request->token)->get();

      for($i = 0 ; $i < count($produits) ; $i++) {
        if ($produits[$i]->caracteristiques_produits_id == $request->caracteristiques_produits_id) {
          $double = $produits[$i];
        } 
      }

      if ($double == null) {
        $id = Carts::insertGetId([
          'token' => $request->token,
          'caracteristiques_produits_id' => $request->caracteristiques_produits_id,
          'quantity' => $request->quantity,
        ]);
        return response()->json(['result' => 'insert']);
      } else {
        $affected = DB::table('carts')
              ->where([
                'token' => $double->token, 
                'caracteristiques_produits_id' => $double->caracteristiques_produits_id
              ])
              ->update(['quantity' => $double->quantity + $request->quantity]);
        return response()->json(['result' => 'increment']);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function show($token) 
    {
        $produits = Carts::where('token',$token)->get();

        for($i = 0 ; $i < count($produits) ; $i++) {
          $produits[$i]->caracteristiques_produits->articles;
        }

        if (count($produits) == 0) {
            return response()->json(['result' => 'aucun achat trouver']);
        } else {
            return response()->json(['result' => 'token '.$token , 'produits' => $produits]);
        }
    }

     /**
     * Display the shipping price.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function showShippingPrice(Request $request, $token) 
    {
      if ($request->user === true) {
        $user = DB::table("users")->where('token', $token)->first();
  
        if ($user->mensuel === 1 || $user->annuel === 1) {
          return response()->json(['token' => $token , 'price' => 'gratuit']);
        } else {
          $transporteur = Transporteurs::where("id", strval($request->transporteur))->first();
          $expedition = Expeditions::where("id", strval($request->expedition))->first();
          $produits = Carts::where('token', $token)->get();
          $tauxPoids = $transporteur->taux_gramme;
          $baseT = $expedition->prix;
          $totalPrice = 0;
          $totalWeight = 0;
          $allCountry = [
            json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/europe")),
            json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/asia")),
            json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/oceania")),
            json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/africa")),
            json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/americas"))
          ];
          $allContinent = [
            'europe',
            'asia',
            'oceania',
            'africa',
            'america',
          ];
    
          for($i = 0 ; $i < count($produits) ; $i++) {
            $totalWeight += intval(preg_replace('/[^0-9]/', '', $produits[$i]->caracteristiques_produits->format)) * intval($produits[$i]->quantity);
          }
    
          if ($request->country === "France") {
            $totalPrice = ($totalWeight >= 500) ?  $baseT + (($baseT * $tauxPoids) * ($totalWeight - 500)) : $baseT;
          } else {
            for($i = 0 ; $i < count($allCountry) ; $i++) {
              for($j = 0 ; $j < count($allCountry[$i]) ; $j++) {
                if ($request->country === $allCountry[$i][$j]->name) {
                  $tauxStr = "taux_".$allContinent[$i];
                  $tauxDest = $transporteur[$tauxStr];
                  $weightPrice = ($totalWeight >= 500) ?  $baseT + (($baseT * $tauxPoids) * ($totalWeight - 500)) : $baseT;
                  $destPrice = $baseT * $tauxDest;
                  $totalPrice = $destPrice + $weightPrice;
                }
              }
            }
          }
    
          return response()->json(['token' => $token , 'price' => $totalPrice]);
        }
      } else {
        $transporteur = Transporteurs::where("id", strval($request->transporteur))->first();
        $expedition = Expeditions::where("id", strval($request->expedition))->first();
        $produits = Carts::where('token', $token)->get();
        $tauxPoids = $transporteur->taux_gramme;
        $baseT = $expedition->prix;
        $totalPrice = 0;
        $totalWeight = 0;
        $allCountry = [
          json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/europe")),
          json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/asia")),
          json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/oceania")),
          json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/africa")),
          json_decode(file_get_contents("https://restcountries.eu/rest/v2/region/americas"))
        ];
        $allContinent = [
          'europe',
          'asia',
          'oceania',
          'africa',
          'america',
        ];
  
        for($i = 0 ; $i < count($produits) ; $i++) {
          $totalWeight += intval(preg_replace('/[^0-9]/', '', $produits[$i]->caracteristiques_produits->format)) * intval($produits[$i]->quantity);
        }
  
        if ($request->country === "France") {
          $totalPrice = ($totalWeight >= 500) ?  $baseT + (($baseT * $tauxPoids) * ($totalWeight - 500)) : $baseT;
        } else {
          for($i = 0 ; $i < count($allCountry) ; $i++) {
            for($j = 0 ; $j < count($allCountry[$i]) ; $j++) {
              if ($request->country === $allCountry[$i][$j]->name) {
                $tauxStr = "taux_".$allContinent[$i];
                $tauxDest = $transporteur[$tauxStr];
                $weightPrice = ($totalWeight >= 500) ?  $baseT + (($baseT * $tauxPoids) * ($totalWeight - 500)) : $baseT;
                $destPrice = $baseT * $tauxDest;
                $totalPrice = $destPrice + $weightPrice;
              }
            }
          }
        }
  
        return response()->json(['token' => $token , 'price' => $totalPrice]);
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
        $result = Carts::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'detail '.$id.' not found']);
        } else {
          return response()->json(['result' => 'detail '.$id.' deleted', 'id' => $id]);
        }
    }

    /**
     * Remove Cart.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function destroyPanier($token)
    {
        $result = Carts::where('token', $token)->delete();

        if (!$result) {
          return response()->json(['result' => 'Carts '.$token.' not found']);
        } else {
          return response()->json(['result' => 'Carts deleted', 'articles suprimer' => $result]);
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
      $affected = DB::table('carts')
            ->where('caracteristiques_produits_id', $id)
            ->update(['quantity'=> $request->quantity]);

      if ($affected == null) {
          return response()->json(['result' => 'article '.$id.' not found']);
      } else {
          return response()->json(['result' => 'article_update' , 'article' => $affected]);
      }
    }
}