<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ProjectsUsersRoles;

class RoleController extends Controller
{
    public function connectUserAndRole(Request $request) {
        
        $checkIfCreator = ProjectsUsersRoles::where('user_id', Auth::user()->id)->
        where('project_id', $request->project_id)->where('role_id', 1)->first();

        if (!$checkIfCreator) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $checkIfAlreadyWithRole = ProjectsUsersRoles::where('user_id', $request->user_id)->
        where('project_id', $request->project_id)->where('role_id', $request->role_id)->first();

        if ($checkIfAlreadyWithRole) {
            return response()->json(['message' => 'У данного пользователя уже есть роль']);
        }

        $user = User::find($request->user_id);

        $user->projects()->attach($request->project_id, ['role_id' => $request->role_id]);

        return response()->json(['message' => 'successfully connected']);
    }
}
