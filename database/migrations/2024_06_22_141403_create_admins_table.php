<?php

use App\Models\Province;
use App\Models\Regency;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->string('username');
            $table->enum('type', ['super', 'province', 'regency']);
            $table->foreignIdFor(Province::class)->nullable()->constrained()->references("id")->on("provinces")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(Regency::class)->nullable()->constrained()->references("id")->on("regencies")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
