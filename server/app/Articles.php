<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    public function categories()
    {
        return $this->belongsTo(Categories::class);
    }

    public function caracteristiques_produits()
    {
        return $this->hasMany(Caracteristiques_produits::class);
    }

    public function producteurs()
    {
        return $this->belongsTo(Producteurs::class);
    }
}
