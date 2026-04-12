<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            'hero' => [
                'badge' => 'Digital Agency That Delivers Results',
                'title_line1' => 'We Build Digital',
                'title_highlight' => 'Experiences',
                'title_line2' => 'That Grow Your Business',
                'description' => 'From modern e-commerce platforms to powerful web applications and result-driven digital marketing — we help businesses scale and succeed in the digital world.',
                'cta_primary' => 'Start Your Project',
                'cta_secondary' => 'Our Services',
                'stats' => [
                    ['value' => '150+', 'label' => 'Projects Delivered'],
                    ['value' => '50+', 'label' => 'Happy Clients'],
                    ['value' => '5+', 'label' => 'Years Experience'],
                    ['value' => '99%', 'label' => 'Client Satisfaction'],
                ],
            ],
            'about' => [
                'badge' => 'About Us',
                'title_prefix' => 'We Are',
                'title_highlight' => 'Grow Ever',
                'title_suffix' => '— Your Digital Growth Partner',
                'paragraph1' => 'Grow Ever is a full-service digital agency dedicated to helping businesses thrive online. We combine cutting-edge technology with creative strategy to deliver web solutions and marketing campaigns that drive real, measurable results.',
                'paragraph2' => 'Whether you need a high-converting e-commerce store, a custom web application, or a comprehensive digital marketing strategy — our team of passionate developers, designers, and marketers have got you covered.',
                'features' => [
                    ['icon' => 'Code', 'text' => 'Expert Development Team'],
                    ['icon' => 'Palette', 'text' => 'Modern UI/UX Design'],
                    ['icon' => 'TrendingUp', 'text' => 'Data-Driven Marketing'],
                    ['icon' => 'Users', 'text' => 'Dedicated Support'],
                ],
                'why_title' => 'Why Choose Us?',
                'why_items' => [
                    'Custom solutions tailored to your business',
                    'Transparent communication & on-time delivery',
                    'SEO-optimized & performance-focused builds',
                    'Post-launch support & maintenance',
                    'Competitive pricing with premium quality',
                ],
            ],
            'services' => [
                'badge' => 'Our Services',
                'title_prefix' => 'Everything You Need to',
                'title_highlight' => 'Grow Online',
                'description' => 'We offer a comprehensive range of web development and digital marketing services to help your business succeed in the digital landscape.',
                'items' => [
                    [
                        'icon' => 'ShoppingCart',
                        'title' => 'E-Commerce Web Apps',
                        'description' => 'Build modern, scalable e-commerce platforms with seamless payment integration, inventory management, and beautiful storefronts that convert visitors into customers.',
                        'features' => ['Custom Storefront Design', 'Payment Gateway Integration', 'Inventory & Order Management', 'Mobile-Responsive'],
                    ],
                    [
                        'icon' => 'Globe',
                        'title' => 'Business Web Applications',
                        'description' => 'Custom web applications tailored to your specific business needs — from CRM systems and dashboards to booking platforms and SaaS products.',
                        'features' => ['Custom CRM & Dashboards', 'SaaS Product Development', 'API Development & Integration', 'Cloud-Based Solutions'],
                    ],
                    [
                        'icon' => 'Layers',
                        'title' => 'Portfolio & Corporate Websites',
                        'description' => 'Stunning, fast-loading websites for businesses, startups, and professionals that establish credibility and capture leads effectively.',
                        'features' => ['Modern Landing Pages', 'WordPress & Custom CMS', 'Blog & Content Systems', 'Brand-Aligned Design'],
                    ],
                    [
                        'icon' => 'Search',
                        'title' => 'SEO Optimization',
                        'description' => 'Rank higher on Google and drive organic traffic with our proven SEO strategies including on-page, off-page, and technical SEO.',
                        'features' => ['On-Page & Off-Page SEO', 'Technical SEO Audits', 'Keyword Research', 'Content Strategy'],
                    ],
                    [
                        'icon' => 'Megaphone',
                        'title' => 'Social Media Marketing',
                        'description' => 'Grow your brand presence across social platforms with targeted campaigns, engaging content, and community management that builds loyal audiences.',
                        'features' => ['Facebook & Instagram Ads', 'Content Creation', 'Community Management', 'Analytics & Reporting'],
                    ],
                    [
                        'icon' => 'BarChart3',
                        'title' => 'PPC & Digital Advertising',
                        'description' => 'Maximize your ROI with data-driven paid advertising campaigns on Google Ads, Meta, and other platforms that bring quality leads and sales.',
                        'features' => ['Google Ads Management', 'Meta Ads Campaigns', 'Conversion Tracking', 'A/B Testing & Optimization'],
                    ],
                ],
            ],
            'testimonials' => [
                'badge' => 'Testimonials',
                'title_prefix' => 'What Our',
                'title_highlight' => 'Clients Say',
                'items' => [
                    [
                        'name' => 'Rahul Sharma',
                        'role' => 'CEO, TechStore Bangladesh',
                        'text' => 'Grow Ever built an incredible e-commerce platform for us. Our online sales increased by 200% within the first 3 months!',
                        'rating' => 5,
                    ],
                    [
                        'name' => 'Priya Patel',
                        'role' => 'Founder, StyleHub',
                        'text' => 'Their digital marketing team transformed our social media presence. We went from 500 to 15,000 followers in just 6 months.',
                        'rating' => 5,
                    ],
                    [
                        'name' => 'Amit Verma',
                        'role' => 'Director, CloudSync',
                        'text' => 'The custom web application they developed streamlined our operations completely. Professional, responsive, and highly skilled team.',
                        'rating' => 5,
                    ],
                ],
            ],
            'contact' => [
                'badge' => 'Contact Us',
                'title_prefix' => "Let's Build Something",
                'title_highlight' => 'Amazing Together',
                'description' => "Ready to take your business to the next level? Get in touch with us and let's discuss your project.",
                'email' => 'hello@growever.com',
                'phone' => '+880 1XXX XXXXXX',
                'address_title' => 'Grow Ever Digital Agency',
                'address_line' => 'Dhaka, Bangladesh',
                'consultation_title' => 'Free Consultation',
                'consultation_text' => "Not sure what you need? Book a free 30-minute consultation and we'll help you figure out the best strategy for your business.",
            ],
            'footer' => [
                'description' => 'Your trusted digital growth partner. We build modern web solutions and run result-driven marketing campaigns to help your business grow online.',
                'services_list' => [
                    'E-Commerce Development',
                    'Web Applications',
                    'SEO Optimization',
                    'Social Media Marketing',
                    'PPC Advertising',
                ],
            ],
            'settings' => [
                'gtm_id' => '',
                'meta_pixel_id' => '',
                'meta_pixel_access_token' => '',
                'meta_description' => 'GrowEver - Your trusted digital growth partner for web development, SEO, and digital marketing.',
                'meta_keywords' => 'web development, SEO, digital marketing, e-commerce, social media',
            ],
        ];

        foreach ($sections as $section => $content) {
            SiteContent::updateOrCreate(
                ['section' => $section],
                ['content' => $content],
            );
        }
    }
}
