<?php

namespace App\Exports;

use App\Transporteurs;
use Maatwebsite\Excel\Concerns\FromCollection;

class TransporteursExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Transporteurs::all();
    }
}
