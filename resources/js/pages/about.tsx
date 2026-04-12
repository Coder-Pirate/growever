import { Head, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    Code,
    Globe,
    Megaphone,
    ShoppingCart,
    BarChart3,
    Search,
    Mail,
    Phone,
    MapPin,
    Rocket,
    Users,
    Star,
    Layers,
    Palette,
    TrendingUp,
    Shield,
    type LucideIcon,
} from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';
import type { AboutContent } from '@/types/site-content';

const iconMap: Record<string, LucideIcon> = {
    ShoppingCart, Globe, Layers, Search, Megaphone, BarChart3,
    Code, Palette, TrendingUp, Users, Rocket, Mail, Phone,
    MapPin, Star, CheckCircle2, Shield,
};

function getIcon(name: string): LucideIcon {
    return iconMap[name] || Code;
}

type Props = {
    about: AboutContent;
};

export default function About() {
    const { about } = usePage<Props>().props;

    return (
        <>
            <Head title="About">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                <section className="bg-neutral-50 pt-28 pb-20 lg:pt-36 lg:pb-28 dark:bg-neutral-900/50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                                    {about.badge}
                                </div>
                                <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                                    {about.title_prefix} <span className="text-sky-600 dark:text-sky-400">{about.title_highlight}</span> {about.title_suffix}
                                </h1>
                                <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
                                    {about.paragraph1}
                                </p>
                                <p className="mb-8 leading-relaxed text-neutral-600 dark:text-neutral-400">
                                    {about.paragraph2}
                                </p>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {about.features.map(({ icon, text }) => {
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
                                        <h3 className="mb-4 text-2xl font-bold">{about.why_title}</h3>
                                        <ul className="space-y-4">
                                            {about.why_items.map((item) => (
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

                <PublicFooter />
            </div>
        </>
    );
}
