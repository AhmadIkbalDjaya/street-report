<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReportDetailResource;
use App\Http\Resources\Admin\ReportResource;
use App\Http\Resources\Admin\ReportStatusFilter;
use App\Http\Resources\IdNameResource;
use App\Models\Report;
use App\Models\ReportStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $auth_user = $request->user("admin");

        $page = $request->input("page", 1);
        $search = $request->input("search", "");
        $statusFilter = $request->input("statusFilter", []);

        $reports_query = Report::query();
        if ($auth_user->type == "province") {
            $reports_query->where("province_id", $auth_user->province_id);
        } else if ($auth_user->type == "regency") {
            $reports_query->where("regency_id", $auth_user->regency_id);
        }
        if ($search) {
            $reports_query->where("name", "LIKE", "%$search%")
                ->orWhereHas("user", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%");
                });
        }
        if (!empty($statusFilter)) {
            $reports_query->whereIn("report_status_id", $statusFilter);
        }
        $reports = $reports_query->latest()->paginate(10, ["*"], 'page', $page);
        $meta = [
            "page" => $reports->currentPage(),
            "perpage" => $reports->perPage(),
            "total_page" => $reports->lastPage(),
            "total_item" => $reports->total(),
            "search" => $search,
            "start_item" => ($reports->currentPage() - 1) * $reports->perPage() + 1,
            "end_item" => min($reports->currentPage() * $reports->perPage(), $reports->total()),
        ];
        $statuses = ReportStatus::all();
        return Inertia::render("admin/report/Index", [
            "reports" => ReportResource::collection($reports),
            "meta" => $meta,
            "statuses" => ReportStatusFilter::collection($statuses),
        ]);
    }

    public function show(Report $report)
    {
        $statuses = ReportStatus::all();
        return Inertia::render("admin/report/Show", [
            "report" => (new ReportDetailResource($report))->resolve(),
            "statuses" => IdNameResource::collection($statuses)->resolve(),
        ]);
    }

    public function set_status(Report $report, Request $request)
    {
        $validated = $request->validate([
            "status_id" => "required|exists:report_statuses,id",
        ]);
        $report->update([
            "report_status_id" => $validated["status_id"],
        ]);
        return to_route("admin.report.show", ["report" => $report->id]);
    }

    public function set_point(Report $report, Request $request)
    {
        $validated = $request->validate([
            "point" => "required",
        ]);
        DB::transaction(function () use ($validated, $report) {
            $report->update([
                "point" => $validated["point"],
            ]);
            $report->user->update([
                "point" => $report->user->point + $validated["point"],
            ]);
        });
        return to_route("admin.report.show", ["report" => $report->id]);
    }
}
