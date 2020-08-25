<?php

namespace App\Exports;

use App\Adresses;
use Maatwebsite\Excel\Concerns\FromCollection;

class AdressesExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Adresses::all();
    }
}
