<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectsUsersRoles;
use App\Models\Sticker;
use App\Models\Project;
use App\Http\Resources\StickerResource;

class StickerController extends Controller
{
    public function showStickers(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $project = Project::find($request->project_id);

        $stickers = $project->stickers()->get();

        return StickerResource::collection($stickers);
    }

    public function createSticker(Request $request) {
        $request->validate([
            'name' => 'required|string',
        ]);

        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $sticker = Sticker::create([
            'x' => $request->x,
            'y' => $request->y,
            'name' => $request->name,
        ]);

        $project = Project::find($request->project_id);

        $project->stickers()->attach($sticker->id);

        return response()->json(['message' => 'successfully created']);
    }

    public function deleteSticker(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $sticker = Sticker::find($request->sticker_id);

        $sticker->delete();

        return response()->json(['message' => 'successfully deleted']);
    }

    public function updateCoordinates(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $sticker = Sticker::find($request->sticker_id);

        $sticker->x = $request->x;
        $sticker->y = $request->y;
        $sticker->save();

        return response()->json(['message' => 'successfully updated']);
    }
}
