<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\ReportDetailResource;
use App\Http\Resources\User\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::get();
        return response()->json([
            "data" => ReportResource::collection($reports),
        ], 200);
    }

    public function show(Report $report)
    {
        return response()->json([
            "data" => new ReportDetailResource($report),
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "lotitude" => "required",
            "longitude" => "required",
            "description" => "nullable",
            "damage_level" => "required|in:1,2,3,4,5",
            "report_type_id" => "required|exists:report_types,id",
            "province_id" => "required|exists:provinces,id",
            "regency_id" => "required|exists:regencies,id",
            // "report_status_id" => "required|exists:report_statuses,id",
            "images" => "required|array|min:1",
        ]);
        foreach ($request->images as $index => $image) {
            if (gettype($image) == "object") {
                $validated["images"][] = $image->storePublicly("report_media", "public");
            }
        }
        try {
            $newReport = null;
            DB::transaction(function () use ($validated, &$newReport) {
                Report::create([
                    "user_id" => Auth::user()->id,
                    "name" => $validated["name"],
                    "latitude" => $validated["latitude"],
                    "longitude" => $validated["longitude"],
                    "decsription" => $validated["decsription"],
                    "damage_level" => $validated["damage_level"],
                    "report_type_id" => $validated["report_type_id"],
                ]);
            });
            return response()->json([
                "success" => true,
                "data" => new ReportDetailResource($newReport),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Gagal menambahkan laporan",
                "error" => $th->getMessage(),
            ], 500);
        }
    }
}
