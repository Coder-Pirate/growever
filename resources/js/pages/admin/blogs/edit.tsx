import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

type Blog = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image: string | null;
    category: string;
    status: string;
};

type Props = {
    blog: Blog;
    categories: string[];
};

export default function EditBlog() {
    const { blog, categories } = usePage<Props>().props;
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || '',
        content: blog.content,
        image: blog.image || '',
        category: blog.category,
        status: blog.status,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/blogs/${blog.id}`);
    }

    function formatCategory(cat: string) {
        return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return (
        <>
            <Head title={`Edit: ${blog.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="inline-flex items-center rounded-md p-1.5 hover:bg-accent">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Edit Blog Post</h2>
                        <p className="text-muted-foreground">Update "{blog.title}".</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border"
                >
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
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
                        <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                        <textarea
                            id="excerpt"
                            rows={2}
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Content</label>
                        <textarea
                            id="content"
                            rows={10}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="image" className="text-sm font-medium">
                            Image URL <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">Category</label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>{formatCategory(c)}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/blogs"
                            className="rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

EditBlog.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Blogs', href: '/admin/blogs' },
        { title: 'Edit', href: '#' },
    ],
};
