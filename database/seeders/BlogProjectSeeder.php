<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Project;
use Illuminate\Database\Seeder;

class BlogProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Blog posts
        $blogs = [
            [
                'title' => '10 SEO Strategies That Actually Work in 2025',
                'excerpt' => 'Discover the most effective SEO strategies that are driving real results for businesses in 2025.',
                'content' => 'Search engine optimization continues to evolve rapidly. In 2025, the focus has shifted towards user experience, AI-generated content quality, and core web vitals. Here are 10 strategies that are delivering measurable results for our clients. First, prioritize E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Google continues to reward content that demonstrates genuine expertise. Second, optimize for voice search and conversational queries. With the rise of AI assistants, more users are searching in natural language. Third, invest in video content and optimize for YouTube search.',
                'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop',
                'category' => 'seo',
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Why Your Business Needs a Mobile-First Website',
                'excerpt' => 'Mobile traffic now accounts for over 60% of all web traffic. Here is why mobile-first design is no longer optional.',
                'content' => 'The shift to mobile-first is no longer a trend — it is the standard. With over 60% of global web traffic coming from mobile devices, businesses that do not prioritize mobile experiences are losing customers every day. A mobile-first approach means designing your website for mobile screens first, then scaling up to desktop. This ensures the best possible experience for the majority of your users. Key benefits include faster load times, better SEO rankings, higher conversion rates, and improved user engagement.',
                'image' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop',
                'category' => 'web-development',
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'The Complete Guide to Social Media Marketing',
                'excerpt' => 'Learn how to build a winning social media strategy that drives engagement and conversions.',
                'content' => 'Social media marketing is one of the most powerful tools available to modern businesses. But with so many platforms and strategies to choose from, it can be overwhelming. This guide breaks down everything you need to know about creating an effective social media strategy. We cover platform selection, content planning, audience targeting, analytics tracking, and paid advertising optimization. Whether you are just starting out or looking to improve your existing strategy, this guide has something for everyone.',
                'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
                'category' => 'social-media',
                'status' => 'published',
                'published_at' => now()->subDays(8),
            ],
            [
                'title' => 'E-Commerce Trends to Watch This Year',
                'excerpt' => 'From AI-powered personalization to sustainable shopping, these are the e-commerce trends shaping the future.',
                'content' => 'The e-commerce landscape is evolving faster than ever. AI-powered personalization is becoming standard, with businesses using machine learning to deliver tailored product recommendations and dynamic pricing. Augmented reality shopping experiences are gaining traction, allowing customers to visualize products before purchase. Sustainability is no longer just a buzzword — consumers are actively choosing brands that prioritize eco-friendly packaging and ethical sourcing. Live commerce and social shopping are bridging the gap between entertainment and shopping.',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
                'category' => 'e-commerce',
                'status' => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'How to Measure Your Digital Marketing ROI',
                'excerpt' => 'Track the right metrics and prove the value of your digital marketing investment.',
                'content' => 'Measuring digital marketing ROI can be challenging, but it is essential for making data-driven decisions. Start by defining clear KPIs for each channel. For SEO, track organic traffic growth, keyword rankings, and conversion rates. For paid advertising, monitor cost per acquisition, return on ad spend, and customer lifetime value. Social media metrics should include engagement rates, referral traffic, and social conversions. Use attribution models to understand how different channels work together to drive results.',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
                'category' => 'digital-marketing',
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
            [
                'title' => 'UI/UX Design Principles Every Developer Should Know',
                'excerpt' => 'Great design is not just about aesthetics. Learn the fundamental principles that create exceptional user experiences.',
                'content' => 'Understanding UI/UX design principles is essential for every developer. Good design starts with user research — understanding who your users are and what they need. Key principles include consistency (maintaining uniform patterns throughout), hierarchy (guiding users through content logically), accessibility (ensuring everyone can use your product), and feedback (letting users know what is happening). Whitespace is your friend — do not be afraid of empty space. It improves readability and creates a cleaner, more professional look.',
                'image' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
                'category' => 'design',
                'status' => 'published',
                'published_at' => now()->subDays(18),
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }

        // Projects
        $projects = [
            [
                'title' => 'TechVenture E-Commerce Platform',
                'description' => 'A modern e-commerce platform built for a tech startup, featuring real-time inventory management, AI-powered product recommendations, and a seamless checkout experience. The platform handles over 10,000 daily transactions.',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
                'category' => 'e-commerce',
                'client' => 'TechVenture Inc.',
                'url' => 'https://example.com',
                'technologies' => ['Laravel', 'React', 'Tailwind CSS', 'Stripe', 'Redis'],
                'status' => 'published',
                'sort_order' => 1,
            ],
            [
                'title' => 'HealthPlus Patient Portal',
                'description' => 'A comprehensive healthcare web application for managing patient records, appointment scheduling, and telemedicine consultations. Built with security and HIPAA compliance as top priorities.',
                'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
                'category' => 'web-development',
                'client' => 'HealthPlus Medical',
                'url' => 'https://example.com',
                'technologies' => ['Laravel', 'Vue.js', 'PostgreSQL', 'WebRTC', 'Docker'],
                'status' => 'published',
                'sort_order' => 2,
            ],
            [
                'title' => 'FoodieApp Mobile Application',
                'description' => 'A cross-platform food delivery application that connects local restaurants with customers. Features include real-time order tracking, push notifications, and integrated payment processing.',
                'image' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
                'category' => 'mobile-app',
                'client' => 'FoodieApp LLC',
                'url' => 'https://example.com',
                'technologies' => ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe'],
                'status' => 'published',
                'sort_order' => 3,
            ],
            [
                'title' => 'GreenLeaf Brand Identity',
                'description' => 'Complete brand identity and UI/UX design for an eco-friendly products company. Included logo design, color palette, typography system, and a full design system for their digital products.',
                'image' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
                'category' => 'ui-ux-design',
                'client' => 'GreenLeaf Co.',
                'technologies' => ['Figma', 'Adobe Illustrator', 'Design System', 'Prototyping'],
                'status' => 'published',
                'sort_order' => 4,
            ],
            [
                'title' => 'Metro Realty SEO Campaign',
                'description' => 'Executed a comprehensive SEO strategy that increased organic traffic by 340% in 6 months. Included technical SEO audits, content strategy, link building, and local SEO optimization.',
                'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop',
                'category' => 'seo',
                'client' => 'Metro Realty Group',
                'technologies' => ['Google Analytics', 'Ahrefs', 'Schema Markup', 'Content Strategy'],
                'status' => 'published',
                'sort_order' => 5,
            ],
            [
                'title' => 'SocialBuzz Marketing Campaign',
                'description' => 'A multi-channel digital marketing campaign for a SaaS startup. Managed paid ads across Google, Facebook, and LinkedIn resulting in 250% increase in qualified leads within 3 months.',
                'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
                'category' => 'digital-marketing',
                'client' => 'SocialBuzz Technologies',
                'technologies' => ['Google Ads', 'Meta Ads', 'LinkedIn', 'HubSpot', 'Analytics'],
                'status' => 'published',
                'sort_order' => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
