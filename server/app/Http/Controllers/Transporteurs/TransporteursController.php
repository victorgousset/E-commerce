<?php

namespace App\Http\Controllers\Transporteurs;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Transporteurs;
use App\Expeditions;

class TransporteursController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transporteurs = Transporteurs::get();

        if ($transporteurs == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'transporteurs' => $transporteurs]);
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
      $id = Transporteurs::insertGetId([
        'nom' => $request->nom,
        'taux_gramme' => $request->taux_gramme,
        'taux_europe' => $request->taux_europe,
        'taux_asia' => $request->taux_asia,
        'taux_africa' => $request->taux_africa,
        'taux_oceania' => $request->taux_oceania,
        'taux_america' => $request->taux_america,
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
        $transporteurs = Transporteurs::find($id);

        if ($transporteurs == null) {
            return response()->json(['result' => 'transporteurs '.$id.' not found']);
        } else {
            return response()->json(['result' => 'transporteurs_'.$id , 'transporteurs' => $transporteurs]);
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
      $affected = DB::table('transporteurs')
            ->where('id', $id)
            ->update([
                'nom' => $request->nom,
                'taux_gramme' => $request->taux_gramme,
                'taux_europe' => $request->taux_europe,
                'taux_asia' => $request->taux_asia,
                'taux_africa' => $request->taux_africa,
                'taux_oceania' => $request->taux_oceania,
                'taux_america' => $request->taux_america,
                ]);

      if ($affected == null) {
          return response()->json(['result' => 'transporteurs '.$id.' not found']);
      } else {
          return response()->json(['result' => 'transporteurs_update' , 'transporteurs' => $affected]);
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
        $result = Transporteurs::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'transporteurs '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }
}
