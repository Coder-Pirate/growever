import { Head } from '@inertiajs/react';
import { Rocket } from 'lucide-react';

export default function UserDashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 items-center justify-center p-4">
                <div className="mx-auto max-w-lg text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                        <Rocket className="h-10 w-10 text-sky-500" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
                    <p className="mt-3 text-lg text-muted-foreground">
                        We're working hard to bring you an amazing dashboard experience. Stay tuned!
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-400">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                        </span>
                        Under Development
                    </div>
                </div>
            </div>
        </>
    );
}

UserDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/user/dashboard',
        },
    ],
};
