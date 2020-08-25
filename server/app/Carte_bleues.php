<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carte_bleues extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
