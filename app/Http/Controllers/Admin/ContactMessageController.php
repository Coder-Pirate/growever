<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ContactMessage::query()->latest();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $perPage = (int) $request->input('perPage', 10);

        return Inertia::render('admin/messages/index', [
            'messages' => $query->paginate($perPage)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'perPage']),
            'statuses' => ['unread', 'read', 'replied'],
        ]);
    }

    public function show(ContactMessage $message): Response
    {
        if ($message->status === 'unread' && ! session()->has('success')) {
            $message->update(['status' => 'read']);
        }

        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }

    public function edit(ContactMessage $message): Response
    {
        return Inertia::render('admin/messages/edit', [
            'message' => $message,
        ]);
    }

    public function update(Request $request, ContactMessage $message): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'status' => ['required', 'in:unread,read,replied'],
        ]);

        $message->update($validated);

        return redirect()->route('admin.messages.show', $message)->with('success', 'Message updated successfully.');
    }

    public function destroy(ContactMessage $message): \Illuminate\Http\RedirectResponse
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
