import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Plus, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';

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
};

type Props = {
    project: Project;
    categories: string[];
};

export default function EditProject() {
    const { project, categories } = usePage<Props>().props;
    const [existingImages, setExistingImages] = useState<string[]>(project.images || []);
    const [removeImages, setRemoveImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, processing, errors } = useForm({
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        client: project.client || '',
        url: project.url || '',
        technologies: project.technologies || ([] as string[]),
        status: project.status,
        sort_order: project.sort_order,
    });

    const [techInput, setTechInput] = useState('');

    function addTech() {
        const tech = techInput.trim();
        if (tech && !data.technologies.includes(tech)) {
            setData('technologies', [...data.technologies, tech]);
            setTechInput('');
        }
    }

    function removeTech(index: number) {
        setData('technologies', data.technologies.filter((_, i) => i !== index));
    }

    function handleTechKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTech();
        }
    }

    function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prev) => [...prev, ...files]);
        const newPreviews = files.map((f) => URL.createObjectURL(f));
        setPreviews((prev) => [...prev, ...newPreviews]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    function removeNewFile(index: number) {
        URL.revokeObjectURL(previews[index]);
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    }

    function removeExistingImage(path: string) {
        setExistingImages((prev) => prev.filter((p) => p !== path));
        setRemoveImages((prev) => [...prev, path]);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('client', data.client);
        formData.append('url', data.url);
        data.technologies.forEach((tech) => formData.append('technologies[]', tech));
        formData.append('status', data.status);
        formData.append('sort_order', String(data.sort_order));
        existingImages.forEach((img) => formData.append('existing_images[]', img));
        removeImages.forEach((img) => formData.append('remove_images[]', img));
        selectedFiles.forEach((file) => formData.append('images[]', file));
        router.post(`/admin/projects/${project.id}`, formData as any, { forceFormData: true });
    }

    function formatCategory(cat: string) {
        return cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return (
        <>
            <Head title={`Edit: ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="inline-flex items-center rounded-md p-1.5 hover:bg-accent">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
                        <p className="text-muted-foreground">Update "{project.title}".</p>
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
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Images <span className="text-muted-foreground">(optional, max 5MB each)</span>
                        </label>

                        {existingImages.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">Current images:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {existingImages.map((src) => (
                                        <div key={src} className="group relative">
                                            <img src={src} alt="" className="h-28 w-full rounded-lg border object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(src)}
                                                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input p-6 transition-colors hover:border-primary hover:bg-accent/50"
                        >
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload more images</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFilesSelected}
                                className="hidden"
                            />
                        </div>

                        {previews.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">New images to upload:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {previews.map((src, i) => (
                                        <div key={i} className="group relative">
                                            <img src={src} alt="" className="h-28 w-full rounded-lg border object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeNewFile(i)}
                                                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {errors['images.0'] && <p className="text-sm text-destructive">{errors['images.0']}</p>}
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
                            <label htmlFor="client" className="text-sm font-medium">
                                Client <span className="text-muted-foreground">(optional)</span>
                            </label>
                            <input
                                id="client"
                                type="text"
                                value={data.client}
                                onChange={(e) => setData('client', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {errors.client && <p className="text-sm text-destructive">{errors.client}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="url" className="text-sm font-medium">
                            Project URL <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                            id="url"
                            type="url"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            placeholder="https://..."
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={handleTechKeyDown}
                                placeholder="Type and press Enter..."
                                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                                type="button"
                                onClick={addTech}
                                className="inline-flex items-center rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        {data.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {data.technologies.map((tech, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                        {tech}
                                        <button type="button" onClick={() => removeTech(i)} className="hover:text-destructive">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        {errors.technologies && <p className="text-sm text-destructive">{errors.technologies}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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

                        <div className="space-y-2">
                            <label htmlFor="sort_order" className="text-sm font-medium">Sort Order</label>
                            <input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {errors.sort_order && <p className="text-sm text-destructive">{errors.sort_order}</p>}
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
                            href="/admin/projects"
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

EditProject.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
        { title: 'Edit', href: '#' },
    ],
};
