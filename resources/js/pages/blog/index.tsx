import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';

type Blog = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    images: string[] | null;
    category: string;
    published_at: string | null;
};

type PaginatedBlogs = {
    data: Blog[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    blogs: PaginatedBlogs;
    categories: string[];
    currentCategory: string;
};

function formatCategory(cat: string) {
    return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BlogsIndex() {
    const { blogs, categories, currentCategory } = usePage<Props>().props;

    return (
        <>
            <Head title="Blog">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                <section className="pt-28 pb-20 lg:pt-36">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Our <span className="text-sky-600 dark:text-sky-400">Blog</span>
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                Stay updated with the latest trends, tips, and insights from our team.
                            </p>
                        </div>

                        {/* Category filter */}
                        <div className="mb-10 flex flex-wrap justify-center gap-2">
                            <Link
                                href="/blogs"
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    !currentCategory
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                }`}
                            >
                                All
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/blogs?category=${cat}`}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        currentCategory === cat
                                            ? 'bg-sky-600 text-white'
                                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                    }`}
                                >
                                    {formatCategory(cat)}
                                </Link>
                            ))}
                        </div>

                        {/* Blog grid */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.data.map((blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-sky-700"
                                >
                                    {blog.images && blog.images.length > 0 && (
                                        <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                            <img
                                                src={blog.images[0]}
                                                alt={blog.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-3">
                                            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                                {formatCategory(blog.category)}
                                            </span>
                                            {blog.published_at && (
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{blog.title}</h3>
                                        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {blog.excerpt || (blog.content.length > 150 ? blog.content.slice(0, 150) + '...' : blog.content)}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300">
                                            Read More <ChevronRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {blogs.data.length === 0 && (
                            <p className="py-20 text-center text-neutral-500">No blog posts found.</p>
                        )}

                        {/* Pagination */}
                        {blogs.last_page > 1 && (
                            <div className="mt-12 flex justify-center gap-1">
                                {blogs.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-4 py-2 text-sm ${
                                            link.active
                                                ? 'bg-sky-600 text-white'
                                                : link.url
                                                  ? 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                                                  : 'cursor-not-allowed text-neutral-300 dark:text-neutral-600'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <PublicFooter />
            </div>
        </>
    );
}
