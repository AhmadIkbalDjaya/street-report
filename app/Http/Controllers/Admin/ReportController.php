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
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $search = $request->input("search", "");
        $statusFilter = $request->input("statusFilter", []);

        $reports_query = Report::query();
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
        return Inertia::render("admin/report/Show", [
            "report" => (new ReportDetailResource($report))->resolve(),
        ]);
    }
}
