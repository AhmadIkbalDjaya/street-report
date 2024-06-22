<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProvinceResource;
use App\Http\Resources\RegencyResource;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function province()
    {
        $provinces = Province::all();
        return response()->json([
            "data" => ProvinceResource::collection($provinces),
        ], 200);
    }
    public function regency(Province $province)
    {
        $regencies = Regency::where("province_id", $province->id)->get();
        return response()->json([
            "data" => RegencyResource::collection($regencies),
        ], 200);
    }
}
