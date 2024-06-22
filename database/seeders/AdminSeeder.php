<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::insert([
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'username' => 'superadmin',
            'province_id' => null,
            'regency_id' => null,
            'type' => 'super'
        ]);

        // Admin untuk setiap provinsi
        $provinces = Province::get();
        foreach ($provinces as $province) {
            Admin::insert([
                'email' => strtolower($province->name) . 'admin@example.com',
                'password' => Hash::make('password'),
                'username' => strtolower($province->name) . 'admin',
                'province_id' => $province->id,
                'regency_id' => null,
                'type' => 'province'
            ]);
        }

        // Admin untuk setiap kabupaten/kota
        $regencies = Regency::get();
        foreach ($regencies as $regency) {
            Admin::insert([
                'email' => strtolower($regency->name) . 'admin@example.com',
                'password' => Hash::make('password'),
                'username' => strtolower($regency->name) . 'admin',
                'province_id' => $regency->province_id,
                'regency_id' => $regency->id,
                'type' => 'regency'
            ]);
        }
    }
}
