<?php

namespace App\Exports;

use App\Commandes_prods;
use Maatwebsite\Excel\Concerns\FromCollection;

class ComProdsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Commandes_prods::all();
    }
}
