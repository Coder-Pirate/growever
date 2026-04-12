import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dashboard, login, register } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
];

export default function PublicNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { auth } = usePage().props as { auth?: { user: unknown } };
    const safeAuth = auth ?? { user: null };

    const toggleDarkMode = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-neutral-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 font-bold text-white">
                            G
                        </div>
                        <span className="text-neutral-900 dark:text-white">
                            Grow<span className="text-sky-600 dark:text-sky-400">Ever</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-300 dark:hover:text-sky-400"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={toggleDarkMode}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            aria-label="Toggle dark mode"
                        >
                            {resolvedAppearance === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        <div className="flex items-center gap-3">
                            {safeAuth.user ? (
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
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={toggleDarkMode}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            aria-label="Toggle dark mode"
                        >
                            {resolvedAppearance === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="flex h-9 w-9 items-center justify-center text-neutral-700 dark:text-neutral-200"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile drawer - slides in from right */}
            <aside
                className={`fixed top-0 right-0 z-[70] flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-80 lg:hidden dark:bg-neutral-950 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-lg font-bold tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white">
                            G
                        </div>
                        <span className="text-neutral-900 dark:text-white">
                            Grow<span className="text-sky-600 dark:text-sky-400">Ever</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Drawer nav links */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-3 py-3 text-[15px] font-medium text-neutral-700 transition-colors hover:bg-sky-50 hover:text-sky-600 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-sky-400"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Drawer footer / auth buttons */}
                <div className="border-t border-neutral-200 px-5 py-5 dark:border-neutral-800">
                    {safeAuth.user ? (
                        <Link
                            href={dashboard()}
                            onClick={() => setMobileOpen(false)}
                            className="block w-full rounded-lg bg-sky-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            <Link
                                href={login()}
                                onClick={() => setMobileOpen(false)}
                                className="block w-full rounded-lg border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                onClick={() => setMobileOpen(false)}
                                className="block w-full rounded-lg bg-sky-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
