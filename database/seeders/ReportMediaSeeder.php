<?php

namespace Database\Seeders;

use App\Models\ReportMedia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                "file_path" => "report_media/p1.jpg",
                "media_type" => "image",
                "report_id" => "1",
            ],
            [
                "file_path" => "report_media/p2.jpg",
                "media_type" => "image",
                "report_id" => "1",
            ],
            [
                "file_path" => "report_media/m1.jpg",
                "media_type" => "image",
                "report_id" => "2",
            ],
            [
                "file_path" => "report_media/m2.jpg",
                "media_type" => "image",
                "report_id" => "2",
            ],
            [
                "file_path" => "report_media/m3.jpg",
                "media_type" => "image",
                "report_id" => "2",
            ],
            [
                "file_path" => "report_media/m3.jpg",
                "media_type" => "image",
                "report_id" => "2",
            ],
        ];
        foreach ($images as $index => $image) {
            ReportMedia::create($image);
        }
    }
}
