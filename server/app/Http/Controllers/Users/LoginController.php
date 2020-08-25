<?php


namespace App\Http\Controllers\Users;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController
{

    //front method => axios POST with params => {email, password}

    public function login(Request $request) //return JSON
    {

        $login = DB::table("users")->where('email', $request->email)->first();
        
        if (password_verify($request->password, $login->password)) {
            return response()->json(['result' => 'login_ok', 'token' => $login->token, 'role' => ($login->admin !== null) ? "admin" : "user"]);
        } else {
            return response()->json(['result' => 'login_failed'], 400);
        }
    }

    /**
     * Check if user.
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function check($token)
    {
        $check = DB::table("users")->where('token', $token)->first();
        $caracter = 'abcdefghijklmnopqrstuvwxyz0123456789&_-@=+';

        if (empty($check)) {
            if ($token === "undefined") {
                $token = '';
    
                for ($i = 0; $i < 50; $i++)
                {
                    $token .= $caracter[rand()%strlen($caracter)];
                }
    
                return response()->json(['token' => $token, 'role' => 'guest']);
            } else {
                return response()->json(['token' => $token, 'role' => 'guest']);
            }
        } else {
            return response()->json(['token' => $check->token, 'role' => ($check->admin !== null) ? "admin" : "user"]);
        }
    }
}
