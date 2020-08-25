<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expeditions extends Model
{
    public function transporteurs()
    {
        return $this->belongsTo(Transporteurs::class);
    }
}
