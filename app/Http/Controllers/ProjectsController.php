<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectsUsers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProjectsController extends Controller
{
    public function showProjects() {
        $user = Auth::user();

        $projects = $user->projects()->where('invited', 0)->get();

        return ProjectResource::collection($projects);
    }

    public function showInvitations() {
        $user = Auth::user();

        $projects = $user->projects()->where('invited', 1)->get();

        return ProjectResource::collection($projects);
    }

    public function createProject(Request $request) {
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'description' => 'required|string|min:2|max:256'
        ]);

        $user = Auth::user();

        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description
        ]);

        $user->projects()->attach($project->id);

        return response()->json([
            'message' => 'successfully created'
        ]);
            
    }

    public function deleteProject(Request $request) {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Incorrect password',
            ], 401);
        }

        $project = Project::find($request->id);

        if (!$project) {
            return response()->json(['message' => 'Unable to find project'], 404);
        }

        $project->delete();
        return response()->json([
            'message' => 'Successfully deleted',
        ]);
    }

    public function updateProject(Request $request) {
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'description' => 'required|string|min:2|max:256',
        ]);

        $project = Project::find($request->id);

        $project->title = $request->title;
        $project->description = $request->description;
        $project->save();

        return response()->json([
            'message' => 'Successfully updated',
        ]);
    }

    public function inviteToProject(Request $request) {
        $request->validate([
            'email' => 'required|string|email:rfc',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Данного пользователя не существует'], 404);
        }

        $project = Project::find($request->id);

        if (!$project) {
            return response()->json(['message' => 'Данного проекта не существует'], 404);
        }

        $projectUsers = ProjectsUsers::where('project_id', $project->id)->
        where('user_id', $user->id)->first();

        if ($projectUsers) {
            return response()->json(['message' => 'Пользователь уже является участником данного проекта или он не принял приглашение']);
        }
        
        $user->projects()->attach($project->id);

        $projectUsers = ProjectsUsers::where('project_id', $project->id)->
        where('user_id', $user->id)->first();

        $projectUsers->invited = 1;
        $projectUsers->save();

        return response()->json(['message' => 'successfully invited']);
    }

    public function leaveProject(Request $request) {
        $user = Auth::user();

        $projectUsers = ProjectsUsers::where('project_id', $request->id)->
        where('user_id', $user->id)->first();

        $projectUsers->delete();

        $projectUsers = ProjectsUsers::where('project_id', $request->id)->first();

        if (!$projectUsers) {
            Project::find($request->id)->delete();
        }

        return response()->json(['message' => 'Вы успешно покинули проект']);
    }

    public function acceptInvitation(Request $request) {
        $user = Auth::user();

        $projectUsers = ProjectsUsers::where('project_id', $request->id)->
        where('user_id', $user->id)->first();

        $projectUsers->invited = 0;
        $projectUsers->save();

        return response()->json(['message' => 'Приглашение принято']);
    }
}
