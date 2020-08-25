<?php

namespace App\Http\Middleware;

use Closure;

class cors
{
  
 /**
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    *
    * @return mixed
    */
    public function handle($request, \Closure $next)
    {
        $response = $next($request);

        if(method_exists($response, 'header'))
        {
            $response
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers',' Origin, Content-Type, Accept, Authorization, X-Request-With')
                ->header('Access-Control-Allow-Credentials',' true');
        }
        else {
            $response->headers->set('Access-Control-Allow-Origin' , '*');
            $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application');
            $response->headers->set('Access-Control-Allow-Credentials',' true');
        }

        return ($response);
    }
}