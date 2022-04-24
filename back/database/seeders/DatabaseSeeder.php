<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Task::factory(50)
                ->state(new Sequence(
                    ['priority' => 'low'],
                    ['priority' => 'normal'],
                    ['priority' => 'high'],
                ))
                ->state(new Sequence(
                    ['marks' => ['research', 'design']],
                    ['marks' => ['research', 'development']],
                    ['marks' => ['development', 'design']],
                    ['marks' => ['research', 'development', 'design']],
                ))
                ->sequence(fn ($sequence) => ['name' => 'Задача № '.$sequence->index])
                ->create();
    }
}
