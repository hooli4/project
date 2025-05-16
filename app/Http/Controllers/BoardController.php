<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\ProjectsUsersRoles;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\BoardResource;

class BoardController extends Controller
{
    public function showBoards(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $project = Project::find($request->project_id);

        $boards = $project->boards()->get();

        return BoardResource::collection($boards);
    }

    public function createBoard(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::create([
            'x' => $request->x,
            'y' => $request->y,
            'name' => $request->name,
            'description' => $request->description,
        ]);

        $project = Project::find($request->project_id);

        $project->boards()->attach($board->id);

        return response()->json(['message' => 'successfully created']);
    }

    public function deleteBoard(Request $request) {

        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::find($request->board_id);

        $board->delete();

        return response()->json(['message' => 'successfully deleted']);
    }

    public function updateCoordinates(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::find($request->board_id);

        $board->x = $request->x;
        $board->y = $request->y;
        $board->save();

        return response()->json(['message' => 'successfully updated']);

    }
}
