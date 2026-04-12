<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\MetaConversionsApi;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($validated);

        // Server-side Meta Conversions API Lead event
        $event = MetaConversionsApi::buildLeadEvent(
            url: $request->headers->get('referer', $request->fullUrl()),
            userAgent: $request->userAgent() ?? '',
            ip: $request->ip(),
            email: $validated['email'],
            phone: $validated['phone'] ?? null,
            fbp: $request->cookie('_fbp'),
            fbc: $request->cookie('_fbc') ?? $request->query('fbclid'),
        );
        MetaConversionsApi::sendEvent($event);

        return back()->with('success', 'Thank you! We\'ll get back to you within 24 hours.');
    }
}
