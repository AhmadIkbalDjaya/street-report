<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\RankResource;
use App\Models\User;
use Illuminate\Http\Request;

class RankController extends Controller
{
    public function index()
    {
        $users = User::where("is_admin", false)
            ->select("id", "name", "point")
            ->orderBy("point", "desc")
            ->get();
        return response()->json([
            "success" => true,
            "data" => RankResource::collection($users),
        ], 200);
    }
}
