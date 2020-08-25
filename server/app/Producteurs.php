<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producteurs extends Model
{
    public function articles()
    {
        return $this->hasMany(Articles::class);
    }
}
