<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminAccountResource;
use App\Http\Resources\ProvinceResource;
use App\Models\Admin;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $search = $request->input("search", "");

        $admin_query = Admin::where("type", "province");
        if ($search) {
            $admin_query->where("name", "LIKE", "%$search%")
                ->orWhereHas("user", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%");
                });
        }
        $admins = $admin_query->latest()->paginate(10, ["*"], 'page', $page);
        $meta = [
            "page" => $admins->currentPage(),
            "perpage" => $admins->perPage(),
            "total_page" => $admins->lastPage(),
            "total_item" => $admins->total(),
            "search" => $search,
            "start_item" => ($admins->currentPage() - 1) * $admins->perPage() + 1,
            "end_item" => min($admins->currentPage() * $admins->perPage(), $admins->total()),
        ];
        return Inertia::render("admin/account/Index", [
            "admins" => AdminAccountResource::collection($admins),
            "meta" => $meta,
        ]);
    }

    public function show(Admin $account)
    {
        return Inertia::render("admin/account/Show", [
            "account" => new AdminAccountResource($account),
        ]);
    }

    public function create()
    {
        $provinces = Province::all();
        return Inertia::render("admin/proposal/Create", [
            "provinces" => ProvinceResource::collection($provinces),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "required|min:8",
            "username" => "required|unique:admins,username",
            "province_id" => "required|exists:provinces,id",
        ]);
        $validated["password"] = Hash::make($validated["password"]);
        $validated["type"] = "province";
        Admin::create($validated);
        return to_route("admin.account.index");
    }

    public function edit(Admin $account)
    {
        $provinces = Province::all();
        return Inertia::render("admin/proposal/Create", [
            "account" => new AdminAccountResource($account),
            "provinces" => ProvinceResource::collection($provinces),
        ]);
    }

    public function update(Admin $account, Request $request)
    {
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "nullable|min:8",
            "username" => "required|unique:admins,username,$account->id",
            "province_id" => "required|exists:provinces,id",
        ]);
        if ($request->password) {
            $validated["password"] = Hash::make($validated["password"]);
        } else {
            unset($validated["password"]);
        }
        $account->update($validated);
        return to_route("admin.account.show", ["account" => $account->id]);
    }

    public function destroy(Admin $account)
    {
        $account->delete();
        return to_route("admin.account.index");

    }
}
