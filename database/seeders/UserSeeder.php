<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "email" => "ikbal@gmail.com",
                "name" => "Ikbal Djaya",
                "password" => Hash::make("password"),
            ],
            [
                "email" => "ikrar@gmail.com",
                "name" => "Ikrar Restu",
                "password" => Hash::make("password"),
            ],
            [
                "email" => "caca@gmail.com",
                "name" => "Fitria Salsabila",
                "password" => Hash::make("password"),
            ],
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
