<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $reports = Report::latest()->limit(5)->get();
        return Inertia::render("admin/home/Index", [
            "reports" => ReportResource::collection($reports),
            "counts" => [
                "new_report_count" => Report::where("report_status_id", 1)->count(),
                "road_report_count" => Report::where("report_type_id", 1)->count(),
                "troto_report_count" => Report::where("report_type_id", 2)->count(),
                "rambu_report_count" => Report::where("report_type_id", 3)->count(),
            ],
        ]);
    }
}
