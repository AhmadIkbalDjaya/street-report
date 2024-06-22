<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\User\MediaResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportDetailResource extends JsonResource
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
            "name" => $this->name,
            "date" => Carbon::parse($this->created_at)->translatedFormat("d F Y"),
            "reporter_name" => $this->user->name,
            "status" => $this->report_status->name,
            "status_id" => $this->report_status_id,
            "type" => $this->report_type->name,
            "description" => $this->description,
            "damage_level" => $this->damage_level,
            "point" => $this->point,
            "latitude" => $this->latitude,
            "longitude" => $this->longitude,
            "province" => $this->province->name,
            "regency" => $this->regency->name,
            "media" => (MediaResource::collection($this->report_media))->resolve(),
        ];
    }
}
