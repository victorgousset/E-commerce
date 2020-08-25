<?php

namespace App\Http\Controllers\Expeditions;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Transporteurs;
use App\Expeditions;

class ExpeditionsController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expeditions = Expeditions::get();

        if ($expeditions == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'expeditions' => $expeditions]);
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
      $id = Expeditions::insertGetId([
        'transporteurs_id' => $request->transporteurs_id,
        'nom' => $request->nom,
        'description' => $request->description,
        'estimations' => $request->estimations,
        'prix' => $request->prix,
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
        $expeditions = Expeditions::find($id);

        if ($expeditions == null) {
            return response()->json(['result' => 'expeditions '.$id.' not found']);
        } else {
            return response()->json(['result' => 'expeditions_'.$id , 'expeditions' => $expeditions]);
        }
    }

    /**
     * Display the specified resource by categories.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByTransporteurs($id)
    {
        $expeditions = Expeditions::where('transporteurs_id', $id)->get();

        return response()->json(['expeditions' => $expeditions]);
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
      $affected = DB::table('expeditions')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'expeditions '.$id.' not found']);
      } else {
          return response()->json(['result' => 'expeditions_update' , 'expeditions' => $affected]);
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
        $result = Expeditions::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'expeditions '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }
}
