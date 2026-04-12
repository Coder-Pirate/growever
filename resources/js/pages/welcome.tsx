import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Rocket,
    ChevronRight,
} from 'lucide-react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';
import type { SiteContent } from '@/types/site-content';

function HeroSection({ content }: { content: SiteContent['hero'] }) {
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
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-500/30"
                        >
                            {content.cta_primary} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            {content.cta_secondary} <ChevronRight className="h-4 w-4" />
                        </Link>
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

export default function Welcome({ siteContent }: { siteContent: SiteContent }) {
    return (
        <>
            <Head title="Grow Ever — Digital Agency">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />
                {siteContent?.hero && <HeroSection content={siteContent.hero} />}
                <PublicFooter />
            </div>
        </>
    );
}
