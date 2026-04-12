import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEvent } from 'react';
import { useFlashToast } from '@/hooks/use-flash-toast';

type Message = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: string;
    created_at: string;
};

type Props = {
    message: Message;
};

export default function MessageEdit() {
    const { message } = usePage<Props>().props;
    const { data, setData, put, processing, errors } = useForm({
        name: message.name,
        email: message.email,
        phone: message.phone || '',
        subject: message.subject,
        message: message.message,
        status: message.status,
    });

    useFlashToast();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/messages/${message.id}`);
    };

    return (
        <>
            <Head title={`Edit Message from ${message.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/messages/${message.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Edit Message</h2>
                        <p className="text-muted-foreground">Edit message from {message.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="+91 98765 43210"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="mt-5">
                            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                        </div>

                        <div className="mt-5">
                            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                rows={6}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                        </div>

                        <div className="mt-5">
                            <label htmlFor="status" className="mb-1.5 block text-sm font-medium">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                            </select>
                            {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={`/admin/messages/${message.id}`}
                            className="rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

MessageEdit.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Messages', href: '/admin/messages' },
        { title: 'Edit Message' },
    ],
};
