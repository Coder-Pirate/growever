import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';

type Blog = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image: string | null;
    category: string;
    published_at: string | null;
    created_at: string;
};

type RelatedBlog = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    image: string | null;
    category: string;
    published_at: string | null;
};

type Props = {
    blog: Blog;
    relatedBlogs: RelatedBlog[];
    canRegister: boolean;
};

function formatCategory(cat: string) {
    return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BlogShow() {
    const { blog, relatedBlogs } = usePage<Props>().props;

    return (
        <>
            <Head title={blog.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                {/* Content */}
                <article className="pt-24 pb-20">
                    <div className="mx-auto max-w-4xl px-6">
                        {/* Back link */}
                        <Link
                            href="/blogs"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>

                        {/* Header */}
                        <header className="mb-10">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                    <Tag className="mr-1 inline h-3 w-3" />
                                    {formatCategory(blog.category)}
                                </span>
                                {blog.published_at && (
                                    <span className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                )}
                            </div>
                            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                                {blog.title}
                            </h1>
                            {blog.excerpt && (
                                <p className="text-lg text-neutral-600 dark:text-neutral-400">{blog.excerpt}</p>
                            )}
                        </header>

                        {/* Featured image */}
                        {blog.image && (
                            <div className="mb-10 overflow-hidden rounded-2xl">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Body */}
                        <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-sky-600 dark:prose-a:text-sky-400">
                            {blog.content.split('\n').map((paragraph, i) => (
                                paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                            ))}
                        </div>
                    </div>
                </article>

                {/* Related blogs */}
                {relatedBlogs.length > 0 && (
                    <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <div className="mx-auto max-w-7xl px-6">
                            <h2 className="mb-8 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                Related Posts
                            </h2>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedBlogs.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-sky-700"
                                    >
                                        {post.image && (
                                            <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="mb-3 flex items-center gap-3">
                                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                                    {formatCategory(post.category)}
                                                </span>
                                                {post.published_at && (
                                                    <span className="text-xs text-neutral-500">
                                                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{post.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <PublicFooter />
            </div>
        </>
    );
}
