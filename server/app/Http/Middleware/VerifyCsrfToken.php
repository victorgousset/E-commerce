<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
      'http://127.0.0.1:8000/articles/store',
      'http://127.0.0.1:8000/articles/update/*',
      'http://127.0.0.1:8000/articles/onAvant/*',
      'http://127.0.0.1:8000/articles/delete/*',
      'http://127.0.0.1:8000/articles/stock/*',
      'http://127.0.0.1:8000/register',
      'http://127.0.0.1:8000/login',
      'http://127.0.0.1:8000/categories/store',
      'http://127.0.0.1:8000/categories/update/*',
      'http://127.0.0.1:8000/categories/delete/*',
      'http://127.0.0.1:8000/detail/store',
      'http://127.0.0.1:8000/detail/update/*',
      'http://127.0.0.1:8000/detail/delete/*',
      'http://127.0.0.1:8000/cart/delete/*',
      'http://127.0.0.1:8000/cart/store',
      'http://127.0.0.1:8000/cart/delete/*',
      'http://127.0.0.1:8000/cart/deletePanier/*',
      'http://127.0.0.1:8000/cart/update/*',
      'http://127.0.0.1:8000/searchbar',
      'http://127.0.0.1:8000/producteurs/store',
      'http://127.0.0.1:8000/producteurs/update/*',
      'http://127.0.0.1:8000/producteurs/delete/*',
      'http://127.0.0.1:8000/commandeProd/store',
      'http://127.0.0.1:8000/commandeProd/update/*',
      'http://127.0.0.1:8000/commandeProd/delete/*',
      'http://127.0.0.1:8000/transporteurs/store',
      'http://127.0.0.1:8000/transporteurs/update/*',
      'http://127.0.0.1:8000/transporteurs/delete/*',
      'http://127.0.0.1:8000/expeditions/store',
      'http://127.0.0.1:8000/expeditions/update/*',
      'http://127.0.0.1:8000/expeditions/delete/*',
      'http://127.0.0.1:8000/adresses/store',
      'http://127.0.0.1:8000/adresses/update/*',
      'http://127.0.0.1:8000/adresses/delete/*',
      'http://127.0.0.1:8000/carte_bleues/store',
      'http://127.0.0.1:8000/carte_bleues/update/*',
      'http://127.0.0.1:8000/carte_bleues/delete/*',
      'http://127.0.0.1:8000/commandes_clients/store',
      'http://127.0.0.1:8000/commandes_clients/update/*',
      'http://127.0.0.1:8000/commandes_clients/delete/*',
      'http://127.0.0.1:8000/cart/shipping/*',
      'http://127.0.0.1:8000/users/update/*',
      'http://127.0.0.1:8000/users/delete/*',
      'http://127.0.0.1:8000/users/getByToken/*',
      'http://127.0.0.1:8000/users/addMonth/*',
      'http://127.0.0.1:8000/users/addYear/*',
      'http://127.0.0.1:8000/search/prop',
    ];
}
