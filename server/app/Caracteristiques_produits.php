<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class caracteristiques_produits extends Model
{
    public function articles()
    {
        return $this->belongsTo(Articles::class);
    }
}
