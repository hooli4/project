<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'title',
        'description',
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'projects_users_roles');
    }

    public function roles() {
        return $this->belongsToMany(Role::class, 'projects_users_roles');
    }

    public function stickers() {
        return $this->belongsToMany(Sticker::class, 'projects_stickers');
    }

    public function boards() {
        return $this->belongsToMany(Board::class, 'projects_boards');
    }

}
