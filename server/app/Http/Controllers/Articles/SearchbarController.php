<?php


namespace App\Http\Controllers\Articles;


use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchbarController
{

    public function search(Request $request)
    {
        $result = DB::table('articles')
            ->where('titre','LIKE', $request->value.'%')
            ->get();

        if (count($result) == 0) {
            return response()->json(['result' => 'Aucun résultat']);
        } else {
            return response()->json(['result' => $result]);
        }
    }

    public function searchByProp(Request $request)
    {
        $result = DB::table('articles')
            ->where('proprietes','LIKE', '%'.$request->value.'%')
            ->get();

        if (count($result) == 0) {
            return response()->json(['result' => 'Aucun résultat']);
        } else {
            return response()->json(['result' => $result]);
        }
    }

}
