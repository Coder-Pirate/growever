import { createInertiaApp, router } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'GrowEver';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name === 'about':
            case name === 'services':
            case name === 'contact':
            case name.startsWith('blog/'):
            case name.startsWith('project/'):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster richColors position="top-right" />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#0ea5e9',
    },
});

// This will set light / dark mode on load...
initializeTheme();

// Push virtual pageview to GTM dataLayer and Meta Pixel on every Inertia navigation
router.on('navigate', (event) => {
    const w = window as any;
    if (w.dataLayer) {
        w.dataLayer.push({
            event: 'virtualPageview',
            page: event.detail.page.url,
        });
    }
    if (typeof w.fbq === 'function') {
        w.fbq('track', 'PageView');
    }
});
