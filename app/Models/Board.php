<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $table = 'boards';

    protected $fillable = [
        'x',
        'y',
        'name',
        'description',
    ];

    public function projects() {
        $this->belongsToMany(Project::class, 'projects_boards');
    }

    public function cards() {
        $this->belongsToMany(Card::class, 'boards_cards');
    }
}
