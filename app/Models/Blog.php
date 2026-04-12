<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'excerpt', 'content', 'image', 'category', 'status', 'published_at'])]
class Blog extends Model
{
    public const STATUSES = ['draft', 'published'];

    public const CATEGORIES = [
        'general',
        'web-development',
        'e-commerce',
        'seo',
        'digital-marketing',
        'social-media',
        'design',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public static function booted(): void
    {
        static::creating(function (Blog $blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
