import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-950 py-10 text-white dark:border-neutral-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-bold text-white">
                            G
                        </div>
                        Grow<span className="text-sky-400">Ever</span>
                    </Link>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">Home</Link>
                        <Link href="/about" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">About</Link>
                        <Link href="/services" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">Services</Link>
                        <Link href="/projects" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">Projects</Link>
                        <Link href="/blogs" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">Blog</Link>
                        <Link href="/contact" className="text-sm text-neutral-400 transition-colors hover:text-sky-400">Contact</Link>
                    </div>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-8 text-center">
                    <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} Grow Ever. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
