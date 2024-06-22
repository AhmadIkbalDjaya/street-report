<?php

namespace App\Http\Resources\User;

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
        if ($this->report_media->count() > 0) {
            $photo = url("storage/" . $this->report_media[0]->file_path);
        } else {
            $photo = null;

        }
        return [
            "id" => $this->id,
            "date" => $this->created_at,
            "photo" => $photo,
            "status" => $this->report_status->name,
            "type" => $this->report_type->name,
        ];
    }
}
