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
            'image' => ['nullable', 'string', 'max:500'],
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
            'image' => ['nullable', 'string', 'max:500'],
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

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
