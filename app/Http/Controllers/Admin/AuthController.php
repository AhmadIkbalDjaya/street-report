<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render("admin/login/Index");
    }
    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8",
        ]);

        if (Auth::guard('admin')->attempt($validated)) {
            $request->session()->regenerate();
            return to_route("admin.home");
        }
        session()->flash("error", "Email / Password Salah");
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route("admin.login");
    }
}
