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
        return $this->belongsToMany(Board::class, 'boards_cards')->withPivot('order');
    }
}
