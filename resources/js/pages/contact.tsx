import { Head, usePage, useForm } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import PublicNavbar from '@/components/public-navbar';
import PublicFooter from '@/components/public-footer';
import type { ContactContent } from '@/types/site-content';

type Props = {
    contact: ContactContent;
};

export default function Contact() {
    const { contact } = usePage<Props>().props;
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
                setTimeout(() => setSubmitted(false), 5000);

                // GTM conversion event
                const w = window as any;
                if (w.dataLayer) {
                    w.dataLayer.push({
                        event: 'generate_lead',
                        event_category: 'Contact',
                        event_label: 'Contact Form Submission',
                    });
                }

                // Meta Pixel Lead event
                if (typeof w.fbq === 'function') {
                    w.fbq('track', 'Lead', {
                        content_name: 'Contact Form',
                    });
                }
            },
        });
    };

    return (
        <>
            <Head title="Contact">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <PublicNavbar />

                <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
                                {contact.badge}
                            </div>
                            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl dark:text-white">
                                {contact.title_prefix} <span className="text-sky-600 dark:text-sky-400">{contact.title_highlight}</span>
                            </h1>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                {contact.description}
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
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-neutral-900 dark:text-white">Call Us</h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-neutral-900 dark:text-white">Visit Us</h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {contact.address_title}
                                                <br />
                                                {contact.address_line}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-6 text-white">
                                    <h4 className="mb-2 text-lg font-bold">{contact.consultation_title}</h4>
                                    <p className="text-sm text-white/80">
                                        {contact.consultation_text}
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
                                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
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
                                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-700"
                                            placeholder="+880 1XXX XXXXXX"
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
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
                                        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
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
                                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 disabled:opacity-50 sm:w-auto"
                                    >
                                        Send Message <ArrowRight className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <PublicFooter />
            </div>
        </>
    );
}
