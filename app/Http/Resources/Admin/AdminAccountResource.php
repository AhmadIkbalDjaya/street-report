<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminAccountResource extends JsonResource
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
            "email" => $this->email,
            "username" => $this->username,
            "province" => $this->province ? $this->province->name : null,
            "regency" => $this->regency ? $this->regency->name : null,
            "province_id" => $this->province_id ?? null,
            "regency_id" => $this->regency_id ?? null,
        ];
    }
}
