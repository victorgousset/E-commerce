<?php

use Illuminate\Support\Facades\Route;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// ARTICLE //
Route::get('/articles', 'Articles\ArticlesController@index');
Route::get('/articles/devant', 'Articles\ArticlesController@showDevant');
Route::get('/articles/promo', 'Articles\ArticlesController@showInPromo');
Route::get('/articles/{id}', 'Articles\ArticlesController@show');
Route::post('/articles/store', 'Articles\ArticlesController@store');
Route::post('/articles/update/{id}', 'Articles\ArticlesController@update');
Route::post('/articles/onAvant/{id}', 'Articles\ArticlesController@onAvant');
Route::post('/articles/delete/{id}', 'Articles\ArticlesController@destroy');
Route::get('/articles/categorie/{id}', 'Articles\ArticlesController@showByCategories');
Route::get('/articles/search/popular', 'Articles\ArticlesController@getPopularArticle');
Route::post('/articles/stock/{id}', 'Articles\ArticlesController@stock');
Route::post('/searchbar', 'Articles\SearchbarController@search');

// REGISTER LOGIN //
Route::post('/register', 'Users\RegisterController@register');
Route::post('/login', 'Users\LoginController@login');
Route::get('/check/{token}', 'Users\LoginController@check');

// CRUD USER//
Route::get('/users', 'Users\CrudController@index');
Route::get('/users/{id}', 'Users\CrudController@show');
Route::post('/users/update/{id}', 'Users\CrudController@update');
Route::post('/users/delete/{id}', 'Users\CrudController@destroy');
Route::get('/users/getByToken/{id}', 'Users\CrudController@getByToken');
Route::post('/users/addMonth/{id}', 'Users\CrudController@addMonth');
Route::post('/users/addYear/{id}', 'Users\CrudController@addYear');
Route::get('/users/testDate/{id}', 'Users\CrudController@testDate');

// CATEGORIE //
Route::get('/categories', 'Categories\CategoriesController@index');
Route::get('/categories/{id}', 'Categories\CategoriesController@show');
Route::post('/categories/store', 'Categories\CategoriesController@store');
Route::post('/categories/update/{id}', 'Categories\CategoriesController@update');
Route::post('/categories/delete/{id}', 'Categories\CategoriesController@destroy');
Route::get('/categories/search/popular', 'Categories\CategoriesController@getPopularCategory');

// CARACTERISTIQUE
Route::get('/getRuptureArticle', 'caracteristiques_produits\caracteristiques_produitsController@getRuptureArticle');
Route::get('/getPromoArticle', 'caracteristiques_produits\caracteristiques_produitsController@getPromoArticle');
Route::get('/detail', 'caracteristiques_produits\caracteristiques_produitsController@index');
Route::get('/detail/{id}', 'caracteristiques_produits\caracteristiques_produitsController@show');
Route::get('/detail/articles/{id}', 'caracteristiques_produits\caracteristiques_produitsController@showByArticleId');
Route::post('/detail/store', 'caracteristiques_produits\caracteristiques_produitsController@store');
Route::post('/detail/update/{id}', 'caracteristiques_produits\caracteristiques_produitsController@update');
Route::post('/detail/delete/{id}', 'caracteristiques_produits\caracteristiques_produitsController@destroy');

// CART //
Route::get('/cart', 'Carts\CartsController@index');
Route::post('/cart/store', 'Carts\CartsController@store');
Route::get('/cart/{token}', 'Carts\CartsController@show');
Route::post('/cart/shipping/{token}', 'Carts\CartsController@showShippingPrice');
Route::post('/cart/delete/{id}', 'Carts\CartsController@destroy');
Route::post('/cart/deletePanier/{token}', 'Carts\CartsController@destroyPanier');
Route::post('/cart/update/{id}', 'Carts\CartsController@update');

// SEARCH //
Route::post('/searchbar', 'Articles\SearchbarController@search');
Route::post('/search/prop', 'Articles\SearchbarController@searchByProp');

// PRODUCTEURS //
Route::get('/producteurs', 'Producteurs\ProducteursController@index');
Route::get('/producteurs/{id}', 'Producteurs\ProducteursController@show');
Route::get('/producteurs/articles/{id}', 'Producteurs\ProducteursController@showArticles');
Route::post('producteurs/store', 'Producteurs\ProducteursController@store');
Route::post('producteurs/update/{id}', 'Producteurs\ProducteursController@update');
Route::post('producteurs/delete/{id}', 'Producteurs\ProducteursController@destroy');

// COMMANDES //
Route::get('/commandeProd', 'Commandes_prods\Commandes_prodsController@index');
Route::get('/commandeProd/test', 'Commandes_prods\Commandes_prodsController@testDate');
Route::get('/commandeProd/{id}', 'Commandes_prods\Commandes_prodsController@show');
Route::post('commandeProd/store', 'Commandes_prods\Commandes_prodsController@store');
Route::post('commandeProd/update/{id}', 'Commandes_prods\Commandes_prodsController@update');
Route::post('commandeProd/delete/{id}', 'Commandes_prods\Commandes_prodsController@destroy');

// TRANSPORTEURS //
Route::get('/transporteurs', 'Transporteurs\TransporteursController@index');
Route::post('/transporteurs/store', 'Transporteurs\TransporteursController@store');
Route::get('/transporteurs/{token}', 'Transporteurs\TransporteursController@show');
Route::post('/transporteurs/delete/{id}', 'Transporteurs\TransporteursController@destroy');
Route::post('/transporteurs/update/{id}', 'Transporteurs\TransporteursController@update');

// EXPEDITIONS //
Route::get('/expeditions', 'Expeditions\ExpeditionsController@index');
Route::post('/expeditions/store', 'Expeditions\ExpeditionsController@store');
Route::get('/expeditions/{id}', 'Expeditions\ExpeditionsController@show');
Route::post('/expeditions/delete/{id}', 'Expeditions\ExpeditionsController@destroy');
Route::post('/expeditions/update/{id}', 'Expeditions\ExpeditionsController@update');
Route::get('/expeditions/transporteurs/{id}', 'Expeditions\ExpeditionsController@showByTransporteurs');

// ADRESSES //
Route::get('/adresses', 'Adresses\AdressesController@index');
Route::post('/adresses/store', 'Adresses\AdressesController@store');
Route::get('/adresses/{token}', 'Adresses\AdressesController@show');
Route::get('/adresses/user/{token}', 'Adresses\AdressesController@showByUserId');
Route::post('/adresses/delete/{id}', 'Adresses\AdressesController@destroy');
Route::post('/adresses/update/{id}', 'Adresses\AdressesController@update');

// CARTE_BLEUES //
Route::get('/carte_bleues', 'Carte_bleues\Carte_bleuesController@index');
Route::post('/carte_bleues/store', 'Carte_bleues\Carte_bleuesController@store');
Route::get('/carte_bleues/user/{token}', 'Carte_bleues\Carte_bleuesController@showByToken');
Route::get('/carte_bleues/{id}', 'Carte_bleues\Carte_bleuesController@show');
Route::post('/carte_bleues/delete/{id}', 'Carte_bleues\Carte_bleuesController@destroy');
Route::post('/carte_bleues/update/{id}', 'Carte_bleues\Carte_bleuesController@update');

// COMMANDE_CLIENTS //
Route::get('/commandes_clients', 'Commandes_clients\Commandes_clientsController@index');
Route::post('/commandes_clients/store', 'Commandes_clients\Commandes_clientsController@store');
Route::get('/commandes_clients/{id}', 'Commandes_clients\Commandes_clientsController@show');
Route::get('/commandes_clients/user/{token}', 'Commandes_clients\Commandes_clientsController@showByToken');
Route::post('/commandes_clients/delete/{id}', 'Commandes_clients\Commandes_clientsController@destroy');
Route::post('/commandes_clients/update/{id}', 'Commandes_clients\Commandes_clientsController@update');

// EXPORTS //
Route::get("/export", 'Export\ExportController@getExport');
Route::get("/export/users", 'Export\ExportController@userExport');
Route::get("/export/adresses", 'Export\ExportController@adressesExport');
Route::get("/export/articles", 'Export\ExportController@articlesExport');
Route::get("/export/caracteristiques_produits", 'Export\ExportController@carprodExport');
Route::get("/export/categories", 'Export\ExportController@categoriesExport');
Route::get("/export/commandes_clients", 'Export\ExportController@comclientsExport');
Route::get("/export/commandes_producteurs", 'Export\ExportController@comprodsExport');
Route::get("/export/expeditions", 'Export\ExportController@expeditionsExport');
Route::get("/export/producteurs", 'Export\ExportController@producteursExport');
Route::get("/export/transporteurs", 'Export\ExportController@transporteursExport');
