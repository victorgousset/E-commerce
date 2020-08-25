<?php


namespace App\Http\Controllers\Users;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterController
{

    //front method => axios POST with params => {username, email, password}

    public function register(Request $request) //return JSON
    {
        $token = '';
        $caracter = 'abcdefghijklmnopqrstuvwxyz0123456789&_-@=+';

        for ($i = 0; $i < 50; $i++)
        {
            $token .= $caracter[rand()%strlen($caracter)];
        }
        
        $id = DB::table('users')->insertGetId([
            'username' => $request->username, 
            'email' => $request->email,
            'password' => password_hash($request->password, PASSWORD_DEFAULT),
            'created_at' => date('Y-m-d H:i:s')]);

        $storeToken = DB::table('users')->where('id', $id)->update(['token' => $token."^".$id]);

        if ($id == null) {
            return response()->json(['result' => 'register_failed'], 400);
        } else {
            return response()->json(['result' => 'register_ok', 'id' => $id], 200);
        }
    }
}
