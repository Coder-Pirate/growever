import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import {
    ArrowRight,
    Code,
    Globe,
    Megaphone,
    ShoppingCart,
    BarChart3,
    Search,
    Mail,
    Phone,
    MapPin,
    Menu,
    X,
    CheckCircle2,
    Rocket,
    Users,
    Star,
    ChevronRight,
    Layers,
    Palette,
    TrendingUp,
    Moon,
    Sun,
    Shield,
    type LucideIcon,
} from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import type { SiteContent } from '@/types/site-content';

const iconMap: Record<string, LucideIcon> = {
    ShoppingCart, Globe, Layers, Search, Megaphone, BarChart3,
    Code, Palette, TrendingUp, Users, Rocket, Mail, Phone,
    MapPin, Star, CheckCircle2, ArrowRight, Shield,
};

function getIcon(name: string): LucideIcon {
    return iconMap[name] || Code;
}

function Navbar({ auth, canRegister }: { auth: { user: unknown }; canRegister: boolean }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleDarkMode = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-neutral-950/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <button onClick={() => scrollTo('home')} className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-bold text-white">
                        G
                    </div>
                    <span className="text-neutral-900 dark:text-white">
                        Grow<span className="text-sky-600 dark:text-sky-400">Ever</span>
                    </span>
                </button>

                <div className="hidden items-center gap-8 md:flex">
                    {['home', 'about', 'services', 'contact'].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollTo(section)}
                            className="text-sm font-medium capitalize text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-300 dark:hover:text-sky-400"
                        >
                            {section}
                        </button>
                    ))}
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        aria-label="Toggle dark mode"
                    >
                        {resolvedAppearance === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-300 dark:hover:text-sky-400"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        aria-label="Toggle dark mode"
                    >
                        {resolvedAppearance === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="text-neutral-700 dark:text-neutral-200">
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="border-t border-neutral-200 bg-white px-6 py-4 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
                    {['home', 'about', 'services', 'contact'].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollTo(section)}
                            className="block w-full py-3 text-left text-sm font-medium capitalize text-neutral-600 dark:text-neutral-300"
                        >
                            {section}
                        </button>
                    ))}
                    <div className="mt-3 flex flex-col gap-2">
                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-lg border border-neutral-300 px-5 py-2.5 text-center text-sm font-medium dark:border-neutral-700"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

function HeroSection({ content }: { content: SiteContent['hero'] }) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
            <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-600/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        <Rocket className="h-4 w-4" />
                        {content.badge}
                    </div>

                    <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
                        {content.title_line1}
                        <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"> {content.title_highlight} </span>
                        {content.title_line2}
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                        {content.description}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => scrollTo('contact')}
                            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-500/30"
                        >
                            {content.cta_primary} <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => scrollTo('services')}
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            {content.cta_secondary} <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {content.stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-sky-600 lg:text-3xl dark:text-sky-400">{stat.value}</div>
                                <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutSection({ content }: { content: SiteContent['about'] }) {
    return (
        <section id="about" className="bg-neutral-50 py-20 lg:py-28 dark:bg-neutral-900/50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                            {content.badge}
                        </div>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                            {content.title_prefix} <span className="text-sky-600 dark:text-sky-400">{content.title_highlight}</span> {content.title_suffix}
                        </h2>
                        <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {content.paragraph1}
                        </p>
                        <p className="mb-8 leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {content.paragraph2}
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {content.features.map(({ icon, text }) => {
                                const Icon = getIcon(icon);
                                return (
                                    <div key={text} className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-8 text-white lg:p-12">
                            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
                            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
                            <div className="relative">
                                <h3 className="mb-4 text-2xl font-bold">{content.why_title}</h3>
                                <ul className="space-y-4">
                                    {content.why_items.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-200" />
                                            <span className="text-white/90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServicesSection({ content }: { content: SiteContent['services'] }) {
    return (
        <section id="services" className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {content.badge}
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                        {content.title_prefix} <span className="text-sky-600 dark:text-sky-400">{content.title_highlight}</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        {content.description}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((service) => {
                        const Icon = getIcon(service.icon);
                        return (
                            <div
                                key={service.title}
                                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-sky-700"
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-900/50 dark:text-sky-400 dark:group-hover:bg-sky-600 dark:group-hover:text-white">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">{service.title}</h3>
                                <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection({ content }: { content: SiteContent['testimonials'] }) {
    return (
        <section className="bg-neutral-50 py-20 lg:py-28 dark:bg-neutral-900/50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {content.badge}
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                        {content.title_prefix} <span className="text-sky-600 dark:text-sky-400">{content.title_highlight}</span>
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {content.items.map((t) => (
                        <div key={t.name} className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-4 flex gap-1">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">&ldquo;{t.text}&rdquo;</p>
                            <div>
                                <div className="font-semibold text-neutral-900 dark:text-white">{t.name}</div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ContactSection({ content }: { content: SiteContent['contact'] }) {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section id="contact" className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {content.badge}
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                        {content.title_prefix} <span className="text-sky-600 dark:text-sky-400">{content.title_highlight}</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        {content.description}
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-900 dark:text-white">Email Us</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{content.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-900 dark:text-white">Call Us</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{content.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-900 dark:text-white">Visit Us</h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {content.address_title}
                                        <br />
                                        {content.address_line}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-6 text-white">
                            <h4 className="mb-2 text-lg font-bold">{content.consultation_title}</h4>
                            <p className="text-sm text-white/80">
                                {content.consultation_text}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
                        >
                            {submitted && (
                                <div className="mb-6 flex items-center gap-2 rounded-lg bg-sky-50 p-4 text-sm font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                    <CheckCircle2 className="h-5 w-5" />
                                    Thank you! We&rsquo;ll get back to you within 24 hours.
                                </div>
                            )}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-700"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-700"
                                        placeholder="hello@example.com"
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    required
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-700"
                                    placeholder="I need an e-commerce website"
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full resize-none rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-700"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 sm:w-auto"
                            >
                                Send Message <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer({ content }: { content: SiteContent['footer'] }) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-neutral-200 bg-neutral-950 text-white dark:border-neutral-800">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-2 text-xl font-bold">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-bold text-white">
                                G
                            </div>
                            Grow<span className="text-sky-400">Ever</span>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
                            {content.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {['home', 'about', 'services', 'contact'].map((section) => (
                                <li key={section}>
                                    <button
                                        onClick={() => scrollTo(section)}
                                        className="text-sm capitalize text-neutral-400 transition-colors hover:text-sky-400"
                                    >
                                        {section}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">Services</h4>
                        <ul className="space-y-2">
                            {content.services_list.map((service) => (
                                <li key={service}>
                                    <button
                                        onClick={() => scrollTo('services')}
                                        className="text-sm text-neutral-400 transition-colors hover:text-sky-400"
                                    >
                                        {service}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
                    <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} Grow Ever. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-sm text-neutral-500 transition-colors hover:text-sky-400">Privacy Policy</span>
                        <span className="text-sm text-neutral-500 transition-colors hover:text-sky-400">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Welcome({ canRegister = true, siteContent }: { canRegister?: boolean; siteContent: SiteContent }) {
    const { auth } = usePage().props as { auth?: { user: unknown } };

    return (
        <>
            <Head title="Grow Ever — Digital Agency">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <Navbar auth={auth ?? { user: null }} canRegister={canRegister} />
                {siteContent?.hero && <HeroSection content={siteContent.hero} />}
                {siteContent?.about && <AboutSection content={siteContent.about} />}
                {siteContent?.services && <ServicesSection content={siteContent.services} />}
                {siteContent?.testimonials && <TestimonialsSection content={siteContent.testimonials} />}
                {siteContent?.contact && <ContactSection content={siteContent.contact} />}
                {siteContent?.footer && <Footer content={siteContent.footer} />}
            </div>
        </>
    );
}
