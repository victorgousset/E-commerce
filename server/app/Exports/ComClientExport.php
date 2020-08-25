<?php

namespace App\Exports;

use App\Commandes_clients;
use Maatwebsite\Excel\Concerns\FromCollection;

class ComClientExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Commandes_clients::all();
    }
}
