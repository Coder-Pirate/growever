import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    status: string;
    sort_order: number;
    created_at: string;
};

type PaginatedProjects = {
    data: Project[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    projects: PaginatedProjects;
    filters: { search?: string; status?: string; category?: string; perPage?: string };
    categories: string[];
    statuses: string[];
};

const perPageOptions = [10, 15, 25, 50];

export default function ProjectsIndex() {
    const { projects, filters, categories, statuses } = usePage<Props>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [perPage, setPerPage] = useState(filters.perPage || '10');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstRender = useRef(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useFlashToast();

    const fetchProjects = useCallback(
        (params: Record<string, string>) => {
            router.get('/admin/projects', params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        },
        [],
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchProjects({ search, status: statusFilter, category: categoryFilter, perPage });
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search, statusFilter, categoryFilter, perPage, fetchProjects]);

    function confirmDelete() {
        if (deleteId !== null) {
            router.delete(`/admin/projects/${deleteId}`, {
                onFinish: () => setDeleteId(null),
            });
        }
    }

    const statusBadgeColors: Record<string, string> = {
        published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        draft: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    };

    function formatCategory(cat: string) {
        return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return (
        <>
            <Head title="Manage Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                        <p className="text-muted-foreground">Manage your portfolio projects.</p>
                    </div>
                    <Link
                        href="/admin/projects/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        New Project
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative min-w-50 flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by title or client..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{formatCategory(c)}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="">All Status</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(e.target.value)}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {perPageOptions.map((n) => (
                            <option key={n} value={String(n)}>{n} per page</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Title</th>
                                <th className="px-4 py-3 text-left font-medium">Category</th>
                                <th className="px-4 py-3 text-left font-medium">Client</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Order</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {projects.data.map((project) => (
                                <tr key={project.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium">{project.title}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{formatCategory(project.category)}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{project.client || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusBadgeColors[project.status] || ''}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{project.sort_order}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="inline-flex items-center rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(project.id)}
                                                className="inline-flex items-center rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No projects found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        {projects.from && projects.to
                            ? `Showing ${projects.from} to ${projects.to} of ${projects.total} results`
                            : `${projects.total} results`}
                    </p>
                    {projects.last_page > 1 && (
                        <div className="flex gap-1">
                            {projects.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`rounded-md px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : link.url
                                              ? 'hover:bg-accent'
                                              : 'cursor-not-allowed opacity-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveState
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this project? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

ProjectsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
    ],
};
