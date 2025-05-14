<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    protected $table = 'stickers';

    protected $fillable = [
        'x',
        'y',
        'name',
    ];

    public function projects() {
        $this->belongsToMany(Project::class, 'projects_stickers');
    }
}
