<?php

namespace Database\Seeders;

use App\Models\ReportStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            "Menuggu",
            "Ditinjau",
            "Diterima",
            "Perbaikan",
            "Selesai",
            "Ditolak",
        ];
        foreach ($statuses as $status) {
            ReportStatus::create([
                "name" => $status,
            ]);
        }
    }
}
