<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteContentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/site-content', [
            'sections' => SiteContent::getAllSections(),
        ]);
    }

    public function update(Request $request, string $section): \Illuminate\Http\RedirectResponse
    {
        $allowedSections = ['hero', 'about', 'services', 'testimonials', 'contact', 'footer', 'settings'];

        if (! in_array($section, $allowedSections, true)) {
            abort(404);
        }

        $validated = $request->validate([
            'content' => ['required', 'array'],
        ]);

        SiteContent::updateOrCreate(
            ['section' => $section],
            ['content' => $validated['content']],
        );

        return back()->with('success', ucfirst($section).' section updated successfully.');
    }
}
