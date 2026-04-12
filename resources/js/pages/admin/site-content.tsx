import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, FormEvent } from 'react';
import { CheckCircle2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type {
    SiteContent,
    HeroContent,
    AboutContent,
    ServicesContent,
    TestimonialsContent,
    ContactContent,
    FooterContent,
    ServiceItem,
    TestimonialItem,
} from '@/types/site-content';

const ICON_OPTIONS = [
    'ShoppingCart', 'Globe', 'Layers', 'Search', 'Megaphone', 'BarChart3',
    'Code', 'Palette', 'TrendingUp', 'Users', 'Rocket', 'Mail', 'Phone',
    'MapPin', 'Star', 'CheckCircle2', 'ArrowRight', 'Shield',
];

function SectionWrapper({
    title,
    description,
    open,
    onToggle,
    children,
}: {
    title: string;
    description: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between p-6"
            >
                <div className="text-left">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {open && <div className="border-t px-6 pb-6 pt-4">{children}</div>}
        </div>
    );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
            {children}
        </label>
    );
}

function TextInput({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="space-y-1">
            <FieldLabel>{label}</FieldLabel>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
        </div>
    );
}

function TextArea({
    label,
    value,
    onChange,
    rows = 3,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    rows?: number;
}) {
    return (
        <div className="space-y-1">
            <FieldLabel>{label}</FieldLabel>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
        </div>
    );
}

function IconSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
            {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
            ))}
        </select>
    );
}

function SaveButton({ processing, label = 'Save Changes' }: { processing: boolean; label?: string }) {
    return (
        <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:opacity-50"
        >
            {processing ? 'Saving...' : label}
        </button>
    );
}

// ============ HERO SECTION FORM ============
function HeroForm({ data: initial }: { data: HeroContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof HeroContent, value: unknown) => {
        setData('content', { ...data.content, [key]: value });
    };

    const updateStat = (index: number, field: 'value' | 'label', value: string) => {
        const stats = [...data.content.stats];
        stats[index] = { ...stats[index], [field]: value };
        update('stats', stats);
    };

    const addStat = () => {
        update('stats', [...data.content.stats, { value: '', label: '' }]);
    };

    const removeStat = (index: number) => {
        update('stats', data.content.stats.filter((_: unknown, i: number) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/hero');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Badge Text" value={data.content.badge} onChange={(v) => update('badge', v)} />
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Title Line 1" value={data.content.title_line1} onChange={(v) => update('title_line1', v)} />
                <TextInput label="Title Highlight" value={data.content.title_highlight} onChange={(v) => update('title_highlight', v)} />
            </div>
            <TextInput label="Title Line 2" value={data.content.title_line2} onChange={(v) => update('title_line2', v)} />
            <TextArea label="Description" value={data.content.description} onChange={(v) => update('description', v)} />
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Primary Button Text" value={data.content.cta_primary} onChange={(v) => update('cta_primary', v)} />
                <TextInput label="Secondary Button Text" value={data.content.cta_secondary} onChange={(v) => update('cta_secondary', v)} />
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <FieldLabel>Stats</FieldLabel>
                    <button type="button" onClick={addStat} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Stat
                    </button>
                </div>
                {data.content.stats.map((stat: { value: string; label: string }, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="text" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)}
                            placeholder="Value (e.g. 150+)"
                            className="w-1/3 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <input
                            type="text" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)}
                            placeholder="Label"
                            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button type="button" onClick={() => removeStat(i)} className="p-1.5 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ ABOUT SECTION FORM ============
function AboutForm({ data: initial }: { data: AboutContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof AboutContent, value: unknown) => {
        setData('content', { ...data.content, [key]: value });
    };

    const updateFeature = (index: number, field: 'icon' | 'text', value: string) => {
        const features = [...data.content.features];
        features[index] = { ...features[index], [field]: value };
        update('features', features);
    };

    const addFeature = () => {
        update('features', [...data.content.features, { icon: 'Code', text: '' }]);
    };

    const removeFeature = (index: number) => {
        update('features', data.content.features.filter((_: unknown, i: number) => i !== index));
    };

    const updateWhyItem = (index: number, value: string) => {
        const items = [...data.content.why_items];
        items[index] = value;
        update('why_items', items);
    };

    const addWhyItem = () => {
        update('why_items', [...data.content.why_items, '']);
    };

    const removeWhyItem = (index: number) => {
        update('why_items', data.content.why_items.filter((_: unknown, i: number) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/about');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Badge Text" value={data.content.badge} onChange={(v) => update('badge', v)} />
            <div className="grid gap-4 sm:grid-cols-3">
                <TextInput label="Title Prefix" value={data.content.title_prefix} onChange={(v) => update('title_prefix', v)} />
                <TextInput label="Title Highlight" value={data.content.title_highlight} onChange={(v) => update('title_highlight', v)} />
                <TextInput label="Title Suffix" value={data.content.title_suffix} onChange={(v) => update('title_suffix', v)} />
            </div>
            <TextArea label="Paragraph 1" value={data.content.paragraph1} onChange={(v) => update('paragraph1', v)} />
            <TextArea label="Paragraph 2" value={data.content.paragraph2} onChange={(v) => update('paragraph2', v)} />

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <FieldLabel>Features</FieldLabel>
                    <button type="button" onClick={addFeature} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Feature
                    </button>
                </div>
                {data.content.features.map((f: { icon: string; text: string }, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-1/3">
                            <IconSelect value={f.icon} onChange={(v) => updateFeature(i, 'icon', v)} />
                        </div>
                        <input
                            type="text" value={f.text} onChange={(e) => updateFeature(i, 'text', e.target.value)}
                            placeholder="Feature text"
                            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button type="button" onClick={() => removeFeature(i)} className="p-1.5 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            <TextInput label="Why Choose Us Title" value={data.content.why_title} onChange={(v) => update('why_title', v)} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <FieldLabel>Why Choose Us Items</FieldLabel>
                    <button type="button" onClick={addWhyItem} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Item
                    </button>
                </div>
                {data.content.why_items.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="text" value={item} onChange={(e) => updateWhyItem(i, e.target.value)}
                            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button type="button" onClick={() => removeWhyItem(i)} className="p-1.5 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ SERVICES SECTION FORM ============
function ServicesForm({ data: initial }: { data: ServicesContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof ServicesContent, value: unknown) => {
        setData('content', { ...data.content, [key]: value });
    };

    const updateService = (index: number, field: keyof ServiceItem, value: unknown) => {
        const items = [...data.content.items];
        items[index] = { ...items[index], [field]: value };
        update('items', items);
    };

    const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
        const items = [...data.content.items];
        const features = [...items[serviceIndex].features];
        features[featureIndex] = value;
        items[serviceIndex] = { ...items[serviceIndex], features };
        update('items', items);
    };

    const addServiceFeature = (serviceIndex: number) => {
        const items = [...data.content.items];
        items[serviceIndex] = { ...items[serviceIndex], features: [...items[serviceIndex].features, ''] };
        update('items', items);
    };

    const removeServiceFeature = (serviceIndex: number, featureIndex: number) => {
        const items = [...data.content.items];
        items[serviceIndex] = {
            ...items[serviceIndex],
            features: items[serviceIndex].features.filter((_: unknown, i: number) => i !== featureIndex),
        };
        update('items', items);
    };

    const addService = () => {
        update('items', [
            ...data.content.items,
            { icon: 'Code', title: '', description: '', features: [''] },
        ]);
    };

    const removeService = (index: number) => {
        update('items', data.content.items.filter((_: unknown, i: number) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/services');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Badge Text" value={data.content.badge} onChange={(v) => update('badge', v)} />
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Title Prefix" value={data.content.title_prefix} onChange={(v) => update('title_prefix', v)} />
                <TextInput label="Title Highlight" value={data.content.title_highlight} onChange={(v) => update('title_highlight', v)} />
            </div>
            <TextArea label="Description" value={data.content.description} onChange={(v) => update('description', v)} />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Services</h4>
                    <button type="button" onClick={addService} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Service
                    </button>
                </div>
                {data.content.items.map((service: ServiceItem, si: number) => (
                    <div key={si} className="space-y-3 rounded-lg border border-dashed border-sidebar-border p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Service {si + 1}</span>
                            <button type="button" onClick={() => removeService(si)} className="p-1 text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-1">
                                <FieldLabel>Icon</FieldLabel>
                                <IconSelect value={service.icon} onChange={(v) => updateService(si, 'icon', v)} />
                            </div>
                            <TextInput label="Title" value={service.title} onChange={(v) => updateService(si, 'title', v)} />
                        </div>
                        <TextArea label="Description" value={service.description} onChange={(v) => updateService(si, 'description', v)} rows={2} />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <FieldLabel>Features</FieldLabel>
                                <button type="button" onClick={() => addServiceFeature(si)} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                                    <Plus className="h-3 w-3" /> Add
                                </button>
                            </div>
                            {service.features.map((feature: string, fi: number) => (
                                <div key={fi} className="flex items-center gap-2">
                                    <input
                                        type="text" value={feature} onChange={(e) => updateServiceFeature(si, fi, e.target.value)}
                                        className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <button type="button" onClick={() => removeServiceFeature(si, fi)} className="p-1.5 text-red-500 hover:text-red-700">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ TESTIMONIALS SECTION FORM ============
function TestimonialsForm({ data: initial }: { data: TestimonialsContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof TestimonialsContent, value: unknown) => {
        setData('content', { ...data.content, [key]: value });
    };

    const updateTestimonial = (index: number, field: keyof TestimonialItem, value: unknown) => {
        const items = [...data.content.items];
        items[index] = { ...items[index], [field]: value };
        update('items', items);
    };

    const addTestimonial = () => {
        update('items', [...data.content.items, { name: '', role: '', text: '', rating: 5 }]);
    };

    const removeTestimonial = (index: number) => {
        update('items', data.content.items.filter((_: unknown, i: number) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/testimonials');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Badge Text" value={data.content.badge} onChange={(v) => update('badge', v)} />
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Title Prefix" value={data.content.title_prefix} onChange={(v) => update('title_prefix', v)} />
                <TextInput label="Title Highlight" value={data.content.title_highlight} onChange={(v) => update('title_highlight', v)} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Testimonials</h4>
                    <button type="button" onClick={addTestimonial} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Testimonial
                    </button>
                </div>
                {data.content.items.map((t: TestimonialItem, i: number) => (
                    <div key={i} className="space-y-3 rounded-lg border border-dashed border-sidebar-border p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Testimonial {i + 1}</span>
                            <button type="button" onClick={() => removeTestimonial(i)} className="p-1 text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <TextInput label="Name" value={t.name} onChange={(v) => updateTestimonial(i, 'name', v)} />
                            <TextInput label="Role / Company" value={t.role} onChange={(v) => updateTestimonial(i, 'role', v)} />
                        </div>
                        <TextArea label="Testimonial Text" value={t.text} onChange={(v) => updateTestimonial(i, 'text', v)} rows={2} />
                        <div className="space-y-1">
                            <FieldLabel>Rating</FieldLabel>
                            <select
                                value={t.rating}
                                onChange={(e) => updateTestimonial(i, 'rating', parseInt(e.target.value))}
                                className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ CONTACT SECTION FORM ============
function ContactForm({ data: initial }: { data: ContactContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof ContactContent, value: string) => {
        setData('content', { ...data.content, [key]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/contact');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Badge Text" value={data.content.badge} onChange={(v) => update('badge', v)} />
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Title Prefix" value={data.content.title_prefix} onChange={(v) => update('title_prefix', v)} />
                <TextInput label="Title Highlight" value={data.content.title_highlight} onChange={(v) => update('title_highlight', v)} />
            </div>
            <TextArea label="Description" value={data.content.description} onChange={(v) => update('description', v)} />

            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Email" value={data.content.email} onChange={(v) => update('email', v)} />
                <TextInput label="Phone" value={data.content.phone} onChange={(v) => update('phone', v)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Address Title" value={data.content.address_title} onChange={(v) => update('address_title', v)} />
                <TextInput label="Address Line" value={data.content.address_line} onChange={(v) => update('address_line', v)} />
            </div>
            <TextInput label="Consultation Title" value={data.content.consultation_title} onChange={(v) => update('consultation_title', v)} />
            <TextArea label="Consultation Text" value={data.content.consultation_text} onChange={(v) => update('consultation_text', v)} />
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ FOOTER SECTION FORM ============
function FooterForm({ data: initial }: { data: FooterContent }) {
    const { data, setData, put, processing } = useForm({ content: { ...initial } });

    const update = (key: keyof FooterContent, value: unknown) => {
        setData('content', { ...data.content, [key]: value });
    };

    const updateServiceItem = (index: number, value: string) => {
        const list = [...data.content.services_list];
        list[index] = value;
        update('services_list', list);
    };

    const addServiceItem = () => {
        update('services_list', [...data.content.services_list, '']);
    };

    const removeServiceItem = (index: number) => {
        update('services_list', data.content.services_list.filter((_: unknown, i: number) => i !== index));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/site-content/footer');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextArea label="Footer Description" value={data.content.description} onChange={(v) => update('description', v)} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <FieldLabel>Services List</FieldLabel>
                    <button type="button" onClick={addServiceItem} className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <Plus className="h-3 w-3" /> Add Service
                    </button>
                </div>
                {data.content.services_list.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="text" value={item} onChange={(e) => updateServiceItem(i, e.target.value)}
                            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button type="button" onClick={() => removeServiceItem(i)} className="p-1.5 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <SaveButton processing={processing} />
        </form>
    );
}

// ============ MAIN PAGE ============
type Props = {
    sections: SiteContent;
};

export default function SiteContentPage() {
    const { sections, flash } = usePage<Props & { flash: { success: string | null } }>().props;
    const [openSection, setOpenSection] = useState<string | null>('hero');

    const toggle = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            <Head title="Site Content" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Site Content</h2>
                    <p className="text-muted-foreground">Manage all content displayed on the landing page.</p>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <CheckCircle2 className="h-5 w-5" />
                        {flash.success}
                    </div>
                )}

                <div className="space-y-4">
                    {sections?.hero && (
                        <SectionWrapper title="Hero Section" description="Main banner area with headline, stats, and call-to-action buttons" open={openSection === 'hero'} onToggle={() => toggle('hero')}>
                            <HeroForm data={sections.hero} />
                        </SectionWrapper>
                    )}

                    {sections?.about && (
                        <SectionWrapper title="About Section" description="Company info, features, and 'Why Choose Us' items" open={openSection === 'about'} onToggle={() => toggle('about')}>
                            <AboutForm data={sections.about} />
                        </SectionWrapper>
                    )}

                    {sections?.services && (
                        <SectionWrapper title="Services Section" description="Service cards with icons, descriptions, and feature lists" open={openSection === 'services'} onToggle={() => toggle('services')}>
                            <ServicesForm data={sections.services} />
                        </SectionWrapper>
                    )}

                    {sections?.testimonials && (
                        <SectionWrapper title="Testimonials Section" description="Client reviews with names, roles, and ratings" open={openSection === 'testimonials'} onToggle={() => toggle('testimonials')}>
                            <TestimonialsForm data={sections.testimonials} />
                        </SectionWrapper>
                    )}

                    {sections?.contact && (
                        <SectionWrapper title="Contact Section" description="Contact details, address, and consultation text" open={openSection === 'contact'} onToggle={() => toggle('contact')}>
                            <ContactForm data={sections.contact} />
                        </SectionWrapper>
                    )}

                    {sections?.footer && (
                        <SectionWrapper title="Footer Section" description="Footer description and services list" open={openSection === 'footer'} onToggle={() => toggle('footer')}>
                            <FooterForm data={sections.footer} />
                        </SectionWrapper>
                    )}
                </div>
            </div>
        </>
    );
}

SiteContentPage.layout = {
    breadcrumbs: [
        { title: 'Admin Dashboard', href: '/admin/dashboard' },
        { title: 'Site Content', href: '/admin/site-content' },
    ],
};
