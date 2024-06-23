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
        $users = User::whereBetween('id', [1, 3])->get();
        $reportTypes = ReportType::whereIn('id', [1, 2, 3, 4])->get();
        $reportStatuses = ReportStatus::whereIn('id', [1, 2, 3, 4, 5, 6])->get();

        $reports = [
            [
                "name" => "Jl Mustafa Dg. Bunga",
                "latitude" => "-5.201060414893995",
                "longitude" => "119.48821956532262",
                "description" => $this->generateDescription(),
                'damage_level' => rand(1, 5),
                'report_status_id' => $reportStatuses->random()->id,
                'report_type_id' => $reportTypes->random()->id,
                'province_id' => 6,
                'regency_id' => 2,
                "user_id" => $users->random()->id,
            ],
            [
                "name" => "Jl Malino",
                "latitude" => "-5.2403403",
                "longitude" => "119.6086516",
                "description" => $this->generateDescription(),
                'damage_level' => rand(1, 5),
                'report_status_id' => $reportStatuses->random()->id,
                'report_type_id' => $reportTypes->random()->id,
                'province_id' => rand(1, 6),
                'regency_id' => rand(1, 18),
                "user_id" => $users->random()->id,
            ],
        ];
        foreach ($reports as $index => $report) {
            Report::create(
                $report
            );
        }

        foreach ($users as $user) {
            for ($i = 0; $i < 2; $i++) {
                $latitude = '-5.135399';
                $longitude = '119.455711';
                $description = $this->generateDescription();

                Report::create([
                    'user_id' => $user->id,
                    'name' => 'Dummy Report',
                    'report_type_id' => $reportTypes->random()->id,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'description' => $description,
                    'damage_level' => rand(1, 5),
                    'report_status_id' => $reportStatuses->random()->id,
                    'province_id' => rand(1, 6),
                    'regency_id' => rand(1, 18),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function generateDescription()
    {
        $words = [
            'Lorem',
            'ipsum',
            'dolor',
            'sit',
            'amet',
            'consectetur',
            'adipiscing',
            'elit',
            'sed',
            'do',
            'eiusmod',
            'tempor',
            'incididunt',
            'ut',
            'labore',
            'et',
            'dolore',
            'magna',
            'aliqua'
        ];

        $numberOfWords = rand(15, 20);
        shuffle($words);
        $description = implode(' ', array_slice($words, 0, $numberOfWords));

        return $description;
    }
}
