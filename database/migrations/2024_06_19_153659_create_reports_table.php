<?php

use App\Models\Province;
use App\Models\Regency;
use App\Models\ReportStatus;
use App\Models\ReportType;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->string('name');
            $table->foreignIdFor(ReportType::class)->nullable()->constrained()->references("id")->on("report_types")->onDelete("set null")->onUpdate("cascade");
            $table->string('latitude');
            $table->string('longitude');
            $table->longText('description')->nullable();
            $table->integer('damage_level')->unsigned();
            $table->foreignIdFor(ReportStatus::class)->nullable()->contrained()->references("id")->on("report_statuses")->onDelete("set null")->onUpdate("cascade");
            $table->integer('point')->nullable()->default(0);
            $table->foreignIdFor(Province::class)->constrained()->references("id")->on("provinces")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(Regency::class)->constrained()->references("id")->on("regencies")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
