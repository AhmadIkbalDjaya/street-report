<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "location_name" => $this->name,
            "reporter_name" => $this->user->name,
            "report_type" => $this->report_type->name,
            "report_status" => $this->report_status->name,
            "date" => Carbon::parse($this->created_at)->format("d/m/y"),
        ];
    }
}
