<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\ReportStatus;
use App\Models\ReportType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::whereBetween('id', [2, 4])->get(); // Ambil user dengan id 2-4
        $reportTypes = ReportType::whereIn('id', [1, 2, 3, 4])->get(); // Ambil report types dengan id 1-4
        $reportStatuses = ReportStatus::whereIn('id', [1, 2, 3, 4, 5, 6])->get(); // Ambil report statuses dengan id 1-6

        foreach ($users as $user) {
            // Generate 2 report untuk setiap user
            for ($i = 0; $i < 2; $i++) {
                $latitude = '-5.135399'; // Latitude di Makassar
                $longitude = '119.455711'; // Longitude di Makassar
                $description = $this->generateDescription(); // Generate deskripsi random

                Report::create([
                    'user_id' => $user->id,
                    'name' => 'Dummy Report',
                    'report_type_id' => $reportTypes->random()->id,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'description' => $description,
                    'damage_level' => rand(1, 5),
                    'report_status_id' => $reportStatuses->random()->id,
                    'point' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function generateDescription()
    {
        $words = [
            'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
            'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
            'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'
        ];

        $numberOfWords = rand(15, 20);
        shuffle($words);
        $description = implode(' ', array_slice($words, 0, $numberOfWords));

        return $description;
    }
}
