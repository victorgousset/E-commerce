<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commandes_prods extends Model
{
    protected $fillable = ['done'];

    public function caracteristiques_produits()
    {
        return $this->belongsTo(Caracteristiques_produits::class);
    }

    public function producteurs()
    {
        return $this->belongsTo(Producteurs::class);
    }
}
