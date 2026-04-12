import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';

type Project = {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    client: string | null;
    url: string | null;
    technologies: string[] | null;
    created_at: string;
};

type RelatedProject = {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    client: string | null;
    technologies: string[] | null;
};

type Props = {
    project: Project;
    relatedProjects: RelatedProject[];
    canRegister: boolean;
};

function formatCategory(cat: string) {
    return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProjectShow() {
    const { project, relatedProjects } = usePage<Props>().props;

    return (
        <>
            <Head title={project.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                {/* Content */}
                <div className="pt-24 pb-20">
                    <div className="mx-auto max-w-5xl px-6">
                        {/* Back link */}
                        <Link
                            href="/projects"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>

                        {/* Header */}
                        <header className="mb-10">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                    {formatCategory(project.category)}
                                </span>
                                {project.client && (
                                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Client: <span className="font-medium text-neutral-700 dark:text-neutral-300">{project.client}</span>
                                    </span>
                                )}
                            </div>
                            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                                {project.title}
                            </h1>
                        </header>

                        {/* Featured image */}
                        {project.image && (
                            <div className="mb-10 overflow-hidden rounded-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Details grid */}
                        <div className="grid gap-10 lg:grid-cols-3">
                            {/* Description */}
                            <div className="lg:col-span-2">
                                <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">About This Project</h2>
                                <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-sky-400">
                                    {project.description.split('\n').map((paragraph, i) => (
                                        paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">
                                {/* Technologies */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
                                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Project info */}
                                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
                                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Project Info
                                    </h3>
                                    <dl className="space-y-3 text-sm">
                                        <div>
                                            <dt className="text-neutral-500 dark:text-neutral-400">Category</dt>
                                            <dd className="font-medium text-neutral-900 dark:text-white">{formatCategory(project.category)}</dd>
                                        </div>
                                        {project.client && (
                                            <div>
                                                <dt className="text-neutral-500 dark:text-neutral-400">Client</dt>
                                                <dd className="font-medium text-neutral-900 dark:text-white">{project.client}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                {/* Live link */}
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-500/30"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Visit Live Site
                                    </a>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>

                {/* Related projects */}
                {relatedProjects.length > 0 && (
                    <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <div className="mx-auto max-w-7xl px-6">
                            <h2 className="mb-8 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                Related Projects
                            </h2>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedProjects.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/project/${p.slug}`}
                                        className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-sky-700"
                                    >
                                        {p.image && (
                                            <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                                    {formatCategory(p.category)}
                                                </span>
                                                {p.client && (
                                                    <span className="text-xs text-neutral-500">for {p.client}</span>
                                                )}
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{p.title}</h3>
                                            {p.technologies && p.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {p.technologies.slice(0, 4).map((tech) => (
                                                        <span key={tech} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
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
