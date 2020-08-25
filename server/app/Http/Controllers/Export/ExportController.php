<?php

namespace App\Http\Controllers\Export;

use App\Exports\UsersExport;
use App\Exports\AdressesExport;
use App\Exports\ArticlesExport;
use App\Exports\CarProdExport;
use App\Exports\CategoriesExport;
use App\Exports\ComClientExport;
use App\Exports\ComProdsExport;
use App\Exports\ExpeditionsExport;
use App\Exports\ProducteursExport;
use App\Exports\TransporteursExport;
use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Http\Request;

class ExportController
{
    public function getExport(){
        $serverURL = "http://127.0.0.1:8000";
        $getURL = ["/export/users", "/export/adresses", "/export/articles", "/export/caracteristiques_produits","/export/categories","/export/commandes_clients","/export/commandes_producteurs","/export/expeditions","/export/producteurs","/export/transporteurs"];
        $getname = [];
        array_push($getname, "users");

        for ($i = 1; $i < count($getURL); $i++){
            $urlArr = explode("/",$getURL[$i]);
            $underscore = strstr($urlArr[2], "_");
            $ok = isset($underscore);
            if ($ok === false){
                $typedName = ucfirst($urlArr[2]);
                array_push($getname, $typedName);
            }
            else
            {
                $second = explode("_", $urlArr[2]);
                $typedName = implode(" ", $second);
                array_push($getname, $typedName);
            }
        }
        $datas = [$serverURL, $getURL];
        return response()->json(['result' => $datas, "name" => $getname]);
    }
    
    public function userExport(){
        return Excel::download(new UsersExport, 'Users.csv');
    }

    public function adressesExport(){
        return Excel::download(new AdressesExport, 'Adresses.csv');
    }

    public function articlesExport(){
        return Excel::download(new ArticlesExport, 'Articles.csv');
    }

    public function carprodExport(){
        return Excel::download(new CarProdExport, 'Caracteristiques_Produits.csv');
    }

    public function categoriesExport(){
        return Excel::download(new CategoriesExport, 'Categories.csv');
    }

    public function comclientsExport(){
        return Excel::download(new ComClientExport, 'Commandes_Clients.csv');
    }

    public function comprodsExport(){
        return Excel::download(new ComProdsExport, 'Commandes_Producteurs.csv');
    }

    public function expeditionsExport(){
        return Excel::download(new ExpeditionsExport, 'Expeditions.csv');
    }

    public function producteursExport(){
        return Excel::download(new ProducteursExport, 'Producteurs.csv');
    }

    public function transporteursExport(){
        return Excel::download(new TransporteursExport, 'Transporteurs.csv');
    }
}
