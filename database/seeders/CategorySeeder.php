<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $blogCategories = ['general', 'web-development', 'e-commerce', 'seo', 'digital-marketing', 'social-media', 'design'];
        $projectCategories = ['web-development', 'e-commerce', 'mobile-app', 'ui-ux-design', 'digital-marketing', 'seo'];

        foreach ($blogCategories as $slug) {
            Category::firstOrCreate(
                ['slug' => $slug, 'type' => 'blog'],
                ['name' => ucwords(str_replace('-', ' ', $slug)), 'slug' => $slug, 'type' => 'blog']
            );
        }

        foreach ($projectCategories as $slug) {
            Category::firstOrCreate(
                ['slug' => $slug, 'type' => 'project'],
                ['name' => ucwords(str_replace('-', ' ', $slug)), 'slug' => $slug, 'type' => 'project']
            );
        }
    }
}
