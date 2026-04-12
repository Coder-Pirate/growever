import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';

type Project = {
    id: number;
    title: string;
    slug: string;
    description: string;
    images: string[] | null;
    category: string;
    client: string | null;
    url: string | null;
    technologies: string[] | null;
};

type PaginatedProjects = {
    data: Project[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    projects: PaginatedProjects;
    categories: string[];
    currentCategory: string;
};

function formatCategory(cat: string) {
    return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProjectsIndex() {
    const { projects, categories, currentCategory } = usePage<Props>().props;

    return (
        <>
            <Head title="Projects">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                <section className="pt-28 pb-20 lg:pt-36">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Our <span className="text-sky-600 dark:text-sky-400">Projects</span>
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                Explore our portfolio of work and the results we've delivered for our clients.
                            </p>
                        </div>

                        {/* Category filter */}
                        <div className="mb-10 flex flex-wrap justify-center gap-2">
                            <Link
                                href="/projects"
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
                                    href={`/projects?category=${cat}`}
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

                        {/* Projects grid */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.data.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/project/${project.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-sky-700"
                                >
                                    {project.images && project.images.length > 0 && (
                                        <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                            <img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                                                {formatCategory(project.category)}
                                            </span>
                                            {project.client && (
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    for {project.client}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{project.title}</h3>
                                        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {project.description.length > 150 ? project.description.slice(0, 150) + '...' : project.description}
                                        </p>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="mb-4 flex flex-wrap gap-1.5">
                                                {project.technologies.map((tech) => (
                                                    <span key={tech} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300">
                                            View Details <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {projects.data.length === 0 && (
                            <p className="py-20 text-center text-neutral-500">No projects found.</p>
                        )}

                        {/* Pagination */}
                        {projects.last_page > 1 && (
                            <div className="mt-12 flex justify-center gap-1">
                                {projects.links.map((link, i) => (
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
