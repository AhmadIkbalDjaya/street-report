<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function report_type(): BelongsTo
    {
        return $this->belongsTo(ReportType::class);
    }
    public function report_status(): BelongsTo
    {
        return $this->belongsTo(ReportStatus::class);
    }

    public function report_media(): HasMany
    {
        return $this->hasMany(ReportMedia::class);
    }
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }
    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }
}
