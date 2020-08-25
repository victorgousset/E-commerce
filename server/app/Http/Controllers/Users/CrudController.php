<?php


namespace App\Http\Controllers\Users;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Adresses;

class CrudController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();

        if ($users == null) {
            return response()->json(['result' => 'null']);
        } else {
            return response()->json(['result' => 'succes' , 'users' => $users]);
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
        $user = User::find($id);

        // $user->adresses;/
        if ($user == null) {
            return response()->json(['result' => 'user '.$id.' not found']);
        } else {
            return response()->json(['result' => 'user_'.$id , 'user' => $user, 'adresses' => $user->adresses]);
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
      $affected = DB::table('users')
            ->where('id', $id)
            ->update($request->params);

      if ($affected == null) {
          return response()->json(['result' => 'user '.$id.' not found']);
      } else {
          return response()->json(['result' => 'categorie_update' , 'user' => $affected]);
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
        $result = User::where('id', $id)->delete();

        if (!$result) {
          return response()->json(['result' => 'user '.$id.' not found']);
        } else {
          return response()->json(['result' => 'deletion_ok', 'id' => $id]);
        }
    }

    /**
     * get the specified resource from storage by token.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getByToken($id)
    {
        $result = User::where('token', $id)->first();
    
        // print_r($result->carte_bleues);

        if (!$result) {
          return response()->json(['result' => 'user '.$id.' not found']);
        } else {
          return response()->json(
            [
                'result' => 'user find',
                'user' => $result,
                'adresses' => $result->adresses,
                'carte_bleues' => $result->carte_bleues
            ]);
        }
    }


    /**
     * add an abonement for month.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addMonth($id)
    {
        $user = User::where('token', $id)->first();

        if (!$user) {
          return response()->json(['result' => 'user not found']);
        } else {
            if ($user->mensuel == 1 || $user->annuel == 1 ) {
                return response()->json(['result' => 'this user is already sub']);
            } else {
                $affected = DB::table('users')
                ->where('token', $id)
                ->update([
                    'mensuel' => 1,
                    'mensuel_date' =>  date('Y-m-d', strtotime('+1 month'))
                    ]);  

                return response()->json(['result' => 'user '. $user->id . ' is now sub for month']);
            }
        }
    }

    /**
     * add an abonement for year.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addYear($id)
    {
        $user = User::where('token', $id)->first();

        if (!$user) {
          return response()->json(['result' => 'user not found']);
        } else {
            if ($user->mensuel == 1) {
                $affected = DB::table('users')
                ->where('token', $id)
                ->update([
                    'annuel' => 1,
                    'mensuel' => null,
                    'mensuel_date' => null
                    ]);  
                return response()->json(['result' => 'user '. $user->id . ' changed sub month to year']);
            } 

            if ($user->annuel == 1 ) {
                return response()->json(['result' => 'this user is already sub']);
            } else {
                $affected = DB::table('users')
                ->where('token', $id)
                ->update([
                    'annuel' => 1,
                    'annuel_date' =>  date('Y-m-d', strtotime('+1 year'))
                    ]);  

                return response()->json(['result' => 'user '. $user->id . ' is now sub for year']);
            }
        }
    }

    /**
     * Test date of delivery.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function testDate($id)
    {
        $user = User::where('token', $id)->first();

        // si il est pas aboner
        if ($user->mensuel_date == 0 && $user->annuel_date == 0) {
            return response()->json(['result' => 'user not sub']);

        } 
        // si abonement mensuel fini
        if ($user->mensuel_date < date('Y-m-d') && $user->annuel != 1) {
            $affected = DB::table('users')
                ->where('token', $id)
                ->update([
                    'mensuel' => null,
                    'mensuel_date' => null
                    ]);  
                return response()->json(['result' => 'subscribe for month finish']);
                
            } 
            // si abonement annuel fini
        if ($user->annuel_date < date('Y-m-d') && $user->mensuel != 1) {
            $affected = DB::table('users')
                ->where('token', $id)
                ->update([
                    'annuel' => null,
                    'annuel_date' => null
                    ]);  
                return response()->json(['result' => 'subscribe for year finish']);
        }
        
        // si il est toujour abone
        return response()->json(['result' => 'subscribe']);

    }
}
