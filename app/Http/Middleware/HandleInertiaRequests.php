<?php

namespace App\Http\Middleware;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $new_count = Report::where("report_status_id", 1)->count();
        if ($request->user("admin")) {
            if ($request->user("admin")->type == "province") {
                $new_count = Report::where("report_status_id", 1)
                    ->where("province_id", $request->user("admin")->province_id)
                    ->count();
            } elseif ($request->user("admin")->type == "regency") {
                $new_count = Report::where("report_status_id", 1)
                    ->where("regency_id", $request->user("admin")->regency_id)
                    ->count();
            }
        }
        return array_merge(parent::share($request), [
            "flash" => [
                "success" => fn() => $request->session()->get("success"),
                "error" => fn() => $request->session()->get("error"),
                "warning" => fn() => $request->session()->get("warning"),
                "info" => fn() => $request->session()->get("info"),
                "message" => fn() => $request->session()->get("message"),
            ],
            "auth.user" => fn() => $request->user("admin") ? $request->user("admin")->only("id", "username", "email", "type", "province_id", "regency_id") : null,
            "url" => env("APP_URL"),
            "new_report_count" => $new_count,
        ]);
    }
}
