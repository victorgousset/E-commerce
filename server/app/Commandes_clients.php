<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commandes_clients extends Model
{
    public function caracteristiques_produits()
    {
        return $this->belongsTo(Caracteristiques_produits::class);
    }

    public function expeditions()
    {
        return $this->belongsTo(Expeditions::class);
    }
}
