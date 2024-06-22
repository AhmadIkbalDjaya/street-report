<?php

namespace Database\Seeders;

use App\Models\Regency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Regency::insert([
            ['name' => 'Bandung', 'province_id' => 1],
            ['name' => 'Bogor', 'province_id' => 1],
            ['name' => 'Bekasi', 'province_id' => 1],
            ['name' => 'Semarang', 'province_id' => 2],
            ['name' => 'Surakarta', 'province_id' => 2],
            ['name' => 'Magelang', 'province_id' => 2],
            ['name' => 'Surabaya', 'province_id' => 3],
            ['name' => 'Malang', 'province_id' => 3],
            ['name' => 'Kediri', 'province_id' => 3],
            ['name' => 'Medan', 'province_id' => 4],
            ['name' => 'Binjai', 'province_id' => 4],
            ['name' => 'Pematangsiantar', 'province_id' => 4],
            ['name' => 'Denpasar', 'province_id' => 5],
            ['name' => 'Badung', 'province_id' => 5],
            ['name' => 'Gianyar', 'province_id' => 5],
            ['name' => 'Makassar', 'province_id' => 6],
            ['name' => 'Gowa', 'province_id' => 6],
            ['name' => 'Pangkep', 'province_id' => 6],
        ]);
    }
}
