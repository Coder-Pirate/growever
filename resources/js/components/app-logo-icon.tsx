import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="url(#growever-gradient)" />
            <text
                x="50%"
                y="52%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="white"
                fontFamily="system-ui, sans-serif"
            >
                G
            </text>
            <defs>
                <linearGradient id="growever-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
            </defs>
        </svg>
    );
}
