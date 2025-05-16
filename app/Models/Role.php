<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    
    public function users() {
        return $this->belongsToMany(User::class, 'project_users_roles');
    }

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_users_roles');
    }
}
