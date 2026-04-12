<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['section', 'content'])]
class SiteContent extends Model
{
    protected $casts = [
        'content' => 'array',
    ];

    public static function getSection(string $section): ?array
    {
        return static::where('section', $section)->first()?->content;
    }

    public static function getAllSections(): array
    {
        return static::all()->pluck('content', 'section')->toArray();
    }
}
