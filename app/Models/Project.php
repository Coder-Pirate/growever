<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'description', 'images', 'category', 'client', 'url', 'technologies', 'status', 'sort_order'])]
class Project extends Model
{
    public const STATUSES = ['draft', 'published'];

    public const CATEGORIES = [
        'web-development',
        'e-commerce',
        'mobile-app',
        'ui-ux-design',
        'digital-marketing',
        'seo',
    ];

    protected $casts = [
        'technologies' => 'array',
        'images' => 'array',
    ];

    public static function booted(): void
    {
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });

        static::deleting(function (Project $project) {
            foreach ($project->images ?? [] as $path) {
                $fullPath = public_path($path);
                if (file_exists($fullPath)) {
                    unlink($fullPath);
                }
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
