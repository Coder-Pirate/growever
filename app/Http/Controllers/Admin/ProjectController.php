<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Project::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('client', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        $perPage = in_array((int) $request->input('perPage'), [10, 15, 25, 50]) ? (int) $request->input('perPage') : 10;

        $projects = $query->orderBy('sort_order')->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        $categories = Category::project()->pluck('slug')->toArray();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'status', 'category', 'perPage']),
            'categories' => $categories,
            'statuses' => Project::STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create', [
            'categories' => Category::project()->pluck('slug')->toArray(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects'],
            'description' => ['required', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'category' => ['required', Rule::in(Category::project()->pluck('slug')->toArray())],
            'client' => ['nullable', 'string', 'max:255'],
            'url' => ['nullable', 'url', 'max:500'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['string', 'max:100'],
            'status' => ['required', Rule::in(Project::STATUSES)],
            'sort_order' => ['integer', 'min:0'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $name = uniqid('project_') . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/projects'), $name);
                $imagePaths[] = '/uploads/projects/' . $name;
            }
        }
        $validated['images'] = $imagePaths ?: null;
        unset($validated['images.*']);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
            'categories' => Category::project()->pluck('slug')->toArray(),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('projects')->ignore($project->id)],
            'description' => ['required', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string'],
            'remove_images' => ['nullable', 'array'],
            'remove_images.*' => ['string'],
            'category' => ['required', Rule::in(Category::project()->pluck('slug')->toArray())],
            'client' => ['nullable', 'string', 'max:255'],
            'url' => ['nullable', 'url', 'max:500'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['string', 'max:100'],
            'status' => ['required', Rule::in(Project::STATUSES)],
            'sort_order' => ['integer', 'min:0'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
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
                $name = uniqid('project_') . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/projects'), $name);
                $newImagePaths[] = '/uploads/projects/' . $name;
            }
        }

        $allImages = array_values(array_merge($existingImages, $newImagePaths));
        $validated['images'] = $allImages ?: null;
        unset($validated['images.*'], $validated['existing_images'], $validated['existing_images.*'], $validated['remove_images'], $validated['remove_images.*']);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
