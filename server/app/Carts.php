<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    public function caracteristiques_produits()
    {
        return $this->belongsTo(Caracteristiques_produits::class);
    }
}
