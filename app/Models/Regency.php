<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Regency extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function admins(): HasMany
    {
        return $this->hasMany(Admin::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}
