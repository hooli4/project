<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $table = 'boards';

    protected $fillable = [
        'x',
        'y',
        'title',
        'description',
    ];

    public function projects() {
        return $this->belongsToMany(Project::class, 'projects_boards');
    }

    public function cards() {
        return $this->belongsToMany(Card::class, 'boards_cards')->withPivot('order');
    }
}
