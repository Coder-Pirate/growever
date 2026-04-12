<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Blog::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        $perPage = in_array((int) $request->input('perPage'), [10, 15, 25, 50]) ? (int) $request->input('perPage') : 10;

        $blogs = $query->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        $categories = Category::blog()->pluck('slug')->toArray();

        return Inertia::render('admin/blogs/index', [
            'blogs' => $blogs,
            'filters' => $request->only(['search', 'status', 'category', 'perPage']),
            'categories' => $categories,
            'statuses' => Blog::STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/blogs/create', [
            'categories' => Category::blog()->pluck('slug')->toArray(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:blogs'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'category' => ['required', Rule::in(Category::blog()->pluck('slug')->toArray())],
            'status' => ['required', Rule::in(Blog::STATUSES)],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $name = uniqid('blog_') . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/blogs'), $name);
                $imagePaths[] = '/uploads/blogs/' . $name;
            }
        }
        $validated['images'] = $imagePaths ?: null;
        unset($validated['images.*']);

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully.');
    }

    public function edit(Blog $blog): Response
    {
        return Inertia::render('admin/blogs/edit', [
            'blog' => $blog,
            'categories' => Category::blog()->pluck('slug')->toArray(),
        ]);
    }

    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('blogs')->ignore($blog->id)],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string'],
            'remove_images' => ['nullable', 'array'],
            'remove_images.*' => ['string'],
            'category' => ['required', Rule::in(Category::blog()->pluck('slug')->toArray())],
            'status' => ['required', Rule::in(Blog::STATUSES)],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($validated['status'] === 'published' && ! $blog->published_at) {
            $validated['published_at'] = now();
        }

        // Remove specified images from disk
        $removeImages = $validated['remove_images'] ?? [];
        foreach ($removeImages as $path) {
            $fullPath = public_path(ltrim($path, '/'));
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }

        // Keep existing images that weren't removed
        $existingImages = $validated['existing_images'] ?? [];
        $existingImages = array_diff($existingImages, $removeImages);

        // Upload new images
        $newImagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $name = uniqid('blog_') . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/blogs'), $name);
                $newImagePaths[] = '/uploads/blogs/' . $name;
            }
        }

        $allImages = array_values(array_merge($existingImages, $newImagePaths));
        $validated['images'] = $allImages ?: null;
        unset($validated['images.*'], $validated['existing_images'], $validated['existing_images.*'], $validated['remove_images'], $validated['remove_images.*']);

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(Blog $blog): RedirectResponse
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully.');
    }
}
