<?php

namespace App\Http\Controllers\Commandes_prods;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Commandes_prods;
use App\Articles;
use App\Caracteristiques_produits as Detail;

class Commandes_prodsController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $commande = Commandes_prods::get();

      for($i = 0 ; $i < count($commande) ; $i++) {
        $commande[$i]->caracteristiques_produits->articles->producteurs;
      }

      return response()->json(['result' => 'succes' , 'commande' => $commande]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $detail = Detail::find($request->caracteristiques_produits_id);
        $producteurId = $detail->articles->producteurs->id;

        $id = Commandes_prods::insertGetId([
            'caracteristiques_produits_id' => $request->caracteristiques_produits_id,
            'producteurs_id' => $producteurId,
            'quantity' => $request->quantity,
            'created_at' => date('Y-m-d'),
            'reception_at' => $request->reception_date,
        ]);

        if ($id == null) {
            return response()->json(['result' => 'commande_failed']);
        } else {
            return response()->json(['result' => 'commande_ok', 'id' => $id]);
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
        $commande = Commandes_prods::find($id);

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
      $affected = DB::table('commandes_prods')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'commande '.$id.' not found']);
      } else {
          return response()->json(['result' => 'commande_update' , 'commande' => $affected]);
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
        $result = DB::table('commandes_prods')
              ->where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'commande '.$id.' not found']);
        } else {
          return response()->json(['result' => 'commande '.$id.' deleted', 'id' => $id]);
        }
    }

    /**
     * Test date of delivery.
     *
     * @return \Illuminate\Http\Response
     */
    public function testDate()
    {
        $commandes = Commandes_prods::where('done', null)->get();
        
        foreach($commandes as $commande) {
            if ($commande->reception_at < date('Y-m-d h:i:s') && $commande->done != 1) {
                // passe done en true si recu
                DB::table('commandes_prods')
                    ->where('id', $commande->id)
                    ->update(['done' => true]);

                // ajoute les quantity recu 
                $detail = Detail::find($commande->caracteristiques_produits_id);
                DB::table('caracteristiques_produits')
                    ->where('id', $commande->caracteristiques_produits_id)
                    ->update(['stocks' => $detail->stocks + $commande->quantity]);
            }
        }

        
    }
}
