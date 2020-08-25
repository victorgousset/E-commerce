<?php

namespace App\Exports;

use App\Caracteristiques_produits;
use Maatwebsite\Excel\Concerns\FromCollection;

class CarProdExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Caracteristiques_produits::all();
    }
}
