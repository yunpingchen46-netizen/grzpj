// Content type definitions for studio-size.com clone

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ServiceItem {
  title: string;
  posterUrl: string;
  videoUrl: string;
}

export interface FeaturedProject {
  title: string;
  subtitle?: string;
  category: string;
  thumbnailUrl: string;
  posterUrl: string;
  videoUrl: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SliderItem {
  imageUrl: string;
  title?: string;
  description?: string;
}

export interface MarqueeItem {
  text: string;
  imageUrl: string;
}
