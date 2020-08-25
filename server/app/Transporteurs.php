<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transporteurs extends Model
{
    public function expeditions()
    {
        return $this->hasMany(Expeditions::class);
    }
}
