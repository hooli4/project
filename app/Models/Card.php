<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = 'cards';

    protected $fillable = [
        'name',
        'description',
        'priority',
        'status',
        'order',
    ];

    public function boards() {
        $this->belongsToMany(Board::class, 'boards_cards');
    }
}
