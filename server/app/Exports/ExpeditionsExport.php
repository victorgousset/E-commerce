<?php

namespace App\Exports;

use App\Expeditions;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExpeditionsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Expeditions::all();
    }
}
