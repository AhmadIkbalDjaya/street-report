<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminAccountResource;
use App\Http\Resources\ProvinceResource;
use App\Http\Resources\RegencyResource;
use App\Models\Admin;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $auth_user = $request->user("admin");

        $page = $request->input("page", 1);
        $search = $request->input("search", "");

        $admin_query = Admin::query();
        if ($search) {
            $admin_query->where("username", "LIKE", "%$search%")
                ->orWhere("email", "LIKE", "%$search%")
                ->orWhereHas("province", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%");
                });
        }
        if ($auth_user->type == "super") {
            $admin_query = Admin::where("type", "province");
        } else if ($auth_user->type == "province") {
            $admin_query = Admin::where("type", "regency")->where("province_id", $auth_user->province_id);
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
        $regencies = Regency::limit(3)->get();
        if (Auth::guard('admin')->user()->type == "province") {
            $regencies = Regency::where("province_id", Auth::guard('admin')->user()->province_id)->get();
        }
        $provinces = Province::all();
        return Inertia::render("admin/account/Create", [
            "provinces" => ProvinceResource::collection($provinces),
            "regencies" => RegencyResource::collection($regencies),
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            "email" => "required|email",
            "password" => "required|min:8",
            "username" => "required|unique:admins,username",
            // "province_id" => "required|exists:provinces,id",
        ];
        if (Auth::guard('admin')->user()->type == "province") {
            $rules["regency_id"] = "required|exists:regencies,id";
        } else {
            $rules["province_id"] = "required|exists:provinces,id";

        }
        $validated = $request->validate($rules);
        $validated["password"] = Hash::make($validated["password"]);
        $validated["type"] = "province";
        if (Auth::guard('admin')->user()->type == "province") {
            $validated["province_id"] = Auth::guard('admin')->user()->province_id;
            $validated["type"] = "regency";
        }
        Admin::create($validated);
        return to_route("admin.account");
    }

    public function edit(Admin $account)
    {
        $regencies = Regency::limit(3)->get();
        if (Auth::guard('admin')->user()->type == "province") {
            $regencies = Regency::where("province_id", Auth::guard('admin')->user()->province_id)->get();
        }
        $provinces = Province::all();
        return Inertia::render("admin/account/Edit", [
            "account" => new AdminAccountResource($account),
            "provinces" => ProvinceResource::collection($provinces),
            "regencies" => RegencyResource::collection($regencies),
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
        return to_route("admin.account");
    }

    public function destroy(Admin $account)
    {
        $account->delete();
        return to_route("admin.account");

    }
}
