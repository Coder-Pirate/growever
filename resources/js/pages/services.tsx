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
import type { ServicesContent } from '@/types/site-content';

const iconMap: Record<string, LucideIcon> = {
    ShoppingCart, Globe, Layers, Search, Megaphone, BarChart3,
    Code, Palette, TrendingUp, Users, Rocket, Mail, Phone,
    MapPin, Star, CheckCircle2, Shield,
};

function getIcon(name: string): LucideIcon {
    return iconMap[name] || Code;
}

type Props = {
    services: ServicesContent;
};

export default function Services() {
    const { services } = usePage<Props>().props;

    return (
        <>
            <Head title="Services — Grow Ever">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                                {services.badge}
                            </div>
                            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                                {services.title_prefix} <span className="text-sky-600 dark:text-sky-400">{services.title_highlight}</span>
                            </h1>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                {services.description}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {services.items.map((service) => {
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

                <PublicFooter />
            </div>
        </>
    );
}
