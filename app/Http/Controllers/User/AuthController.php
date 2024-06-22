<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8",
        ]);
        if (Auth::attempt($validated)) {
            $user = Auth::user();
            return response()->json([
                "success" => true,
                "message" => "Login Berhasil",
                "token" => $user->createToken("token")->plainTextToken,
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "photo" => $user->photo ? url("storage/" . $user->photo) : null,
                "point" => $user->point,
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Email / password salah"
            ], 400);
        }
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:8",
        ]);

        try {
            $validated["password"] = Hash::make($validated["password"]);
            $newUser = User::create($validated);
            return response()->json([
                "success" => true,
                "message" => "Registrasi Berhasil",
                "data" => new UserResource($newUser),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage(),
            ], 500);
        }
    }
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                "success" => true,
                "message" => "Logout Berhasil",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Logout gagal",
                "error" => $th->getMessage(),
            ], 500);
        }
    }
}
