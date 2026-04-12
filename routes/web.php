<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ExportUsersController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Manager\DashboardController as ManagerDashboardController;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia\Inertia::render('welcome', [
        'siteContent' => \App\Models\SiteContent::getAllSections(),
    ]);
})->name('home');

Route::get('/about', function () {
    $content = \App\Models\SiteContent::getAllSections();
    return Inertia\Inertia::render('about', [
        'about' => $content['about'],
    ]);
})->name('about');

Route::get('/services', function () {
    $content = \App\Models\SiteContent::getAllSections();
    return Inertia\Inertia::render('services', [
        'services' => $content['services'],
    ]);
})->name('services');

Route::get('/contact', function () {
    $content = \App\Models\SiteContent::getAllSections();
    return Inertia\Inertia::render('contact', [
        'contact' => $content['contact'],
    ]);
})->name('contact');

Route::get('/blogs', function (\Illuminate\Http\Request $request) {
    $category = $request->query('category');
    $blogs = Blog::published()
        ->when($category, fn ($q) => $q->where('category', $category))
        ->latest('published_at')
        ->paginate(12)
        ->withQueryString();

    return Inertia\Inertia::render('blog/index', [
        'blogs' => $blogs,
        'categories' => Category::blog()->pluck('slug')->toArray(),
        'currentCategory' => $category ?? '',
    ]);
})->name('blogs.index');

Route::get('/projects', function (\Illuminate\Http\Request $request) {
    $category = $request->query('category');
    $projects = Project::published()
        ->when($category, fn ($q) => $q->where('category', $category))
        ->orderBy('sort_order')
        ->paginate(12)
        ->withQueryString();

    return Inertia\Inertia::render('project/index', [
        'projects' => $projects,
        'categories' => Category::project()->pluck('slug')->toArray(),
        'currentCategory' => $category ?? '',
    ]);
})->name('projects.index');

Route::get('/blog/{slug}', function (string $slug) {
    $blog = Blog::published()->where('slug', $slug)->firstOrFail();
    $relatedBlogs = Blog::published()
        ->where('id', '!=', $blog->id)
        ->where('category', $blog->category)
        ->latest('published_at')
        ->take(3)
        ->get();

    return Inertia\Inertia::render('blog/show', [
        'blog' => $blog,
        'relatedBlogs' => $relatedBlogs,
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('blog.show');

Route::get('/project/{slug}', function (string $slug) {
    $project = Project::published()->where('slug', $slug)->firstOrFail();
    $relatedProjects = Project::published()
        ->where('id', '!=', $project->id)
        ->where('category', $project->category)
        ->orderBy('sort_order')
        ->take(3)
        ->get();

    return Inertia\Inertia::render('project/show', [
        'project' => $project,
        'relatedProjects' => $relatedProjects,
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('project.show');

// Redirect /dashboard to the correct role-based dashboard
Route::middleware(['auth', 'verified'])->get('dashboard', function () {
    $url = match (auth()->user()->role) {
        User::ROLE_ADMIN => '/admin/dashboard',
        User::ROLE_MANAGER => '/manager/dashboard',
        default => '/user/dashboard',
    };

    return redirect($url);
})->name('dashboard');

// Admin routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', AdminDashboardController::class)->name('dashboard');
    Route::get('users/export/excel', [ExportUsersController::class, 'excel'])->name('users.export.excel');
    Route::get('users/export/pdf', [ExportUsersController::class, 'pdf'])->name('users.export.pdf');
    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('blogs', BlogController::class)->except(['show']);
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::get('site-content', [SiteContentController::class, 'index'])->name('site-content.index');
    Route::put('site-content/{section}', [SiteContentController::class, 'update'])->name('site-content.update');
});

// Manager routes
Route::middleware(['auth', 'verified', 'role:manager'])->prefix('manager')->name('manager.')->group(function () {
    Route::get('dashboard', ManagerDashboardController::class)->name('dashboard');
});

// User routes
Route::middleware(['auth', 'verified', 'role:user'])->prefix('user')->name('user.')->group(function () {
    Route::inertia('dashboard', 'user/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
