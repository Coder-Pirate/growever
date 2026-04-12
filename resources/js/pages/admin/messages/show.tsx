import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    updated_at: string;
};

type Props = {
    message: Message;
};

const statusBadgeColors: Record<string, string> = {
    unread: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    read: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    replied: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

export default function MessageShow() {
    const { message } = usePage<Props>().props;
    const [showDelete, setShowDelete] = useState(false);
    const { data, setData, put, processing } = useForm({
        name: message.name,
        email: message.email,
        phone: message.phone || '',
        subject: message.subject,
        message: message.message,
        status: message.status,
    });

    useFlashToast();

    const handleStatusUpdate = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/messages/${message.id}`);
    };

    function confirmDelete() {
        router.delete(`/admin/messages/${message.id}`);
    }

    return (
        <>
            <Head title={`Message from ${message.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/messages"
                            className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Message Details</h2>
                            <p className="text-muted-foreground">From {message.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/messages/${message.id}/edit`}
                            className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                            <Edit className="h-4 w-4" />
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowDelete(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive/90"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Name</label>
                                    <p className="mt-1 font-medium">{message.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                                    <p className="mt-1">
                                        <a href={`mailto:${message.email}`} className="font-medium text-sky-600 hover:underline dark:text-sky-400">
                                            {message.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                            {message.phone && (
                                <div className="mb-6">
                                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                                    <p className="mt-1">
                                        <a href={`tel:${message.phone}`} className="font-medium text-sky-600 hover:underline dark:text-sky-400">
                                            {message.phone}
                                        </a>
                                    </p>
                                </div>
                            )}
                            <div className="mb-6">
                                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                                <p className="mt-1 font-medium">{message.subject}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Message</label>
                                <div className="mt-2 whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                            <h3 className="mb-4 text-sm font-semibold">Status</h3>
                            <form onSubmit={handleStatusUpdate} className="space-y-4">
                                <div>
                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeColors[message.status] || ''}`}>
                                        {message.status}
                                    </span>
                                </div>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="unread">Unread</option>
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                </select>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                >
                                    Update Status
                                </button>
                            </form>

                            <div className="mt-6 space-y-2 border-t pt-4 text-xs text-muted-foreground">
                                <p>Received: {new Date(message.created_at).toLocaleString()}</p>
                                <p>Updated: {new Date(message.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this message from {message.name}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-white hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

MessageShow.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Messages', href: '/admin/messages' },
        { title: 'View Message' },
    ],
};
