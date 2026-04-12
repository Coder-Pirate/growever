<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'description', 'image', 'category', 'client', 'url', 'technologies', 'status', 'sort_order'])]
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
    ];

    public static function booted(): void
    {
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
