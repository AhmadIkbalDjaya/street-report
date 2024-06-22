<?php

namespace App\Http\Resources\User;

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
            "date" => $this->created_at,
            "name" => $this->name,
            "status" => $this->report_status->name,
            "type" => $this->report_type->name,
            "latitude" => $this->latitude,
            "longitude" => $this->longitude,
            "description" => $this->description,
            "damage_level" => $this->damage_level,
            "point" => $this->point,
            "media" => MediaResource::collection($this->report_media),
        ];
    }
}
