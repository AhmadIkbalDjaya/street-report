<?php

namespace Database\Seeders;

use App\Models\ReportType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ["Jalan", "Trotoar", "Rambu Lalu Lintas", "Drainase"];
        foreach ($types as $type) {
            ReportType::create([
                "name" => $type,
            ]);
        }
    }
}
