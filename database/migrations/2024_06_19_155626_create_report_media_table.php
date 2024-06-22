<?php

use App\Models\Report;
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
        Schema::create('report_media', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Report::class)->constrained()->references("id")->on("reports")->onDelete("cascade")->onUpdate("cascade");
            $table->string('file_path');
            $table->enum('media_type', ['image', 'videos'])->nullable()->default('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_media');
    }
};
