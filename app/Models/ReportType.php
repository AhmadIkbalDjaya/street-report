<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReportType extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}
