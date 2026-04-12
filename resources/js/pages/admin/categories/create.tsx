import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function CreateCategory() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        type: 'blog',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/categories');
    }

    return (
        <>
            <Head title="Create Category" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/categories" className="inline-flex items-center rounded-md p-1.5 hover:bg-accent">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Create Category</h2>
                        <p className="text-muted-foreground">Add a new blog or project category.</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border"
                >
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="slug" className="text-sm font-medium">
                            Slug <span className="text-muted-foreground">(auto-generated if empty)</span>
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">Type</label>
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="blog">Blog</option>
                            <option value="project">Project</option>
                        </select>
                        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Category'}
                        </button>
                        <Link
                            href="/admin/categories"
                            className="inline-flex items-center rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateCategory.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Create', href: '/admin/categories/create' },
    ],
};
