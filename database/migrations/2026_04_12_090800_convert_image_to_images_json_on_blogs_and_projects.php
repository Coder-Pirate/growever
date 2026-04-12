<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->json('images')->nullable()->after('content');
        });

        // Migrate existing data
        DB::table('blogs')->whereNotNull('image')->where('image', '!=', '')->orderBy('id')->each(function ($blog) {
            DB::table('blogs')->where('id', $blog->id)->update(['images' => json_encode([$blog->image])]);
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->json('images')->nullable()->after('description');
        });

        DB::table('projects')->whereNotNull('image')->where('image', '!=', '')->orderBy('id')->each(function ($project) {
            DB::table('projects')->where('id', $project->id)->update(['images' => json_encode([$project->image])]);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('image')->nullable()->after('content');
        });

        DB::table('blogs')->whereNotNull('images')->orderBy('id')->each(function ($blog) {
            $images = json_decode($blog->images, true);
            if (!empty($images)) {
                DB::table('blogs')->where('id', $blog->id)->update(['image' => $images[0]]);
            }
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn('images');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('image')->nullable()->after('description');
        });

        DB::table('projects')->whereNotNull('images')->each(function ($project) {
            $images = json_decode($project->images, true);
            if (!empty($images)) {
                DB::table('projects')->where('id', $project->id)->update(['image' => $images[0]]);
            }
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};
