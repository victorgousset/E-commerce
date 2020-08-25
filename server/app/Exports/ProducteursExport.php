<?php

namespace App\Exports;

use App\Producteurs;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProducteursExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Producteurs::all();
    }
}
