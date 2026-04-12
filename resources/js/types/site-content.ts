export type HeroContent = {
    badge: string;
    title_line1: string;
    title_highlight: string;
    title_line2: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
    stats: { value: string; label: string }[];
};

export type AboutContent = {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    paragraph1: string;
    paragraph2: string;
    features: { icon: string; text: string }[];
    why_title: string;
    why_items: string[];
};

export type ServiceItem = {
    icon: string;
    title: string;
    description: string;
    features: string[];
};

export type ServicesContent = {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    description: string;
    items: ServiceItem[];
};

export type TestimonialItem = {
    name: string;
    role: string;
    text: string;
    rating: number;
};

export type TestimonialsContent = {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    items: TestimonialItem[];
};

export type ContactContent = {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    description: string;
    email: string;
    phone: string;
    address_title: string;
    address_line: string;
    consultation_title: string;
    consultation_text: string;
};

export type FooterContent = {
    description: string;
    services_list: string[];
};

export type SettingsContent = {
    gtm_id: string;
    meta_pixel_id: string;
    meta_pixel_access_token: string;
    meta_description: string;
    meta_keywords: string;
};

export type SiteContent = {
    hero: HeroContent;
    about: AboutContent;
    services: ServicesContent;
    testimonials: TestimonialsContent;
    contact: ContactContent;
    footer: FooterContent;
    settings: SettingsContent;
};
