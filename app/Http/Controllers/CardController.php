<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectsUsersRoles;
use App\Models\Board;
use App\Models\Card;
use App\Http\Resources\CardResource;

class CardController extends Controller
{
    public function showCards(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::find($request->board_id);

        $cards = $board->cards()->orderBy('order')->get();

        return CardResource::collection($cards);
    }

    public function createCard(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|string',
            'status' => 'required|string',
        ]);

        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::find($request->board_id);

        $count_of_cards = $board->cards()->count();

        $card = Card::create([
            'name' => $request->name,
            'description' => $request->description,
            'priority' => $request->priority,
            'status' => $request->status,
        ]);

        $board->cards()->attach($card->id, ['order' => $count_of_cards + 1]);

        return response()->json(['message' => 'successfully created']);
    }

    public function deleteCard(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $card = Card::find($request->card_id);

        $board = Board::find($request->board_id);

        $order = $board->cards()->where('card_id', $card->id)->first()->pivot->order;

        $card->delete();

        $cardsToUpdate = $board->cards()->where('order', '>', $order)->get();

        foreach ($cardsToUpdate as $cardToUpdate) {
            $newOrder = $cardToUpdate->pivot->order - 1;
            $board->cards()->updateExistingPivot($cardToUpdate->id, ['order' => $newOrder]);
        }

        return response()->json(['message' => 'successfully deleted']);
    }

    public function updateCard(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|string',
            'status' => 'required|string',
        ]);

        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $card = Card::find($request->card_id);

        $card->name = $request->name;
        $card->description = $request->description;
        $card->priority = $request->priority;
        $card->status = $request->status;
        $card->save();

        return response()->json(['message' => 'successfully updated']);
    }

    public function switchCards(Request $request) {
        $user = Auth::user();

        $checkIfUserInProject = ProjectsUsersRoles::where('user_id', $user->id)->
        where('project_id', $request->project_id)->first();

        if (!$checkIfUserInProject) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $board = Board::find($request->board_id);

        $switchedCard = Card::find($request->card_id);
        $orderSwitchedCard = $board->cards()->where('card_id', $switchedCard->id)->first()->pivot->order;

        $direction = $request->direction;
        $newOrderSwitchedCardWith = $orderSwitchedCard;

        if ($direction == 'down') {
            $switchedCardWith = $board->cards()->where('order', $orderSwitchedCard + 1)->first();
            $newOrderSwitchedCard = $orderSwitchedCard + 1;
        }

        else if ($direction == 'up') {
            $switchedCardWith = $board->cards()->where('order', $orderSwitchedCard - 1)->first();
            $newOrderSwitchedCard = $orderSwitchedCard - 1;
        }

        else {
            return response()->json(['message' => 'invalid direction'], 404);
        }

        $board->cards()->updateExistingPivot($switchedCardWith->id, ['order' => $newOrderSwitchedCardWith]);
        $board->cards()->updateExistingPivot($switchedCard->id, ['order' => $newOrderSwitchedCard]);

        return response()->json(['message' => 'successfully switched']);
    }
}
