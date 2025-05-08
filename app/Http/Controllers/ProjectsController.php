<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Support\Facades\Hash;

class ProjectsController extends Controller
{
    public function showProjects() {
        $user = Auth::user();

        $projects = $user->projects()->get();

        return ProjectResource::collection($projects);
    }

    public function createProject(Request $request) {
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'description' => 'required|string|min:2|max:256',
        ]);

        $user = Auth::user();

        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
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

        Project::find('id', $request->id);

        return response()->json([
            'message' => 'Successfully deleted',
        ]);
    }

    public function updateProject(Request $request) {
        $request->validate([
            'title' => 'required|string|min:2|max:64',
            'description' => 'required|string|min:2|max:256',
        ]);

        $user = Auth::user();

        $project = Project::find('id', $request->id);

        $project->title = $request->title;
        $project->description = $request->description;
        $project->save();

        return response()->json([
            'message' => 'Successfully updated',
        ]);
    }
}
