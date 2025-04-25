<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Mail\ConfirmEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request) {

        $token = urlencode(Str::random(60));
        $tokenExpiration = Carbon::now()->addMinutes(60);

        $user = User::create([
            'name' => $request->name,
            'password' => $request->password,
            'email' => $request->email,
            'tokenEmailConfirm' => $token,
            'tokenEmailExpiration' => $tokenExpiration,
        ]);

        $confirmationUrl = route('api_email_confirm', ['token' => $token]);

        Mail::to($user->email)->send(new ConfirmEmail($confirmationUrl));

        return response()->json(['success' => true]);
    }

    public function confirmEmail(Request $request) {
        $user = User::where('tokenEmailConfirm', $request->token)->first();

        if (!$user) {
            return response()->json(['message' => 'URL has been expired'], 400);
        }

        if ($user->tokenEmailExpiration < Carbon::now()) {
            $user->delete();
            return response()->json(['message' => 'URL has been expired'], 400);
        }

        $user->email_verified_at = Carbon::now();
        $user->tokenEmailExpiration = null;
        $user->tokenEmailConfirm = null;
        $user->save();

        return response()->json(['message' => 'Successfully registered']);
    }

    public function deleteEmails() {
        User::whereNull('email_verified_at')->delete();
        return response()->json(['message' => 'successfuly deleted']);
    }
}
