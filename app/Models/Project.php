<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'projects_users');
    }
}
