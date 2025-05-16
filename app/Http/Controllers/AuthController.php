<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Mail\ConfirmEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginUserRequest;

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
            return redirect()->route('register');
        }

        if ($user->tokenEmailExpiration < Carbon::now()) {
            $user->delete();
            return redirect()->route('register');
        }

        $user->email_verified_at = Carbon::now();
        $user->tokenEmailExpiration = null;
        $user->tokenEmailConfirm = null;
        $user->save();

        return redirect()->route('login');
    }

    public function login(LoginUserRequest $request) {
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();

            if ($user->email_verified_at === null) {
                return response()->json([
                    'message' => 'Ваша электронная почта не подтверждена',
                ], 401);
            }

            $username = $user->name;
            $token = $user->createToken("Auth token for $username")->plainTextToken;

            return response()->json([
                'status' => 200,
                'message' => 'Successfully authorized',
                'token' => $token,
            ]);
        }

        return response()->json([
            'message' => 'Неправильный пароль или почта',
        ], 401);

    }

    public function logout() {
        Auth::user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfull logout']);
    }

    public function showPersonalInfo() {
        $user = Auth::user()->get();

        return UserResource::collection($user);
    }
}
