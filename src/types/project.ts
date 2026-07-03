export interface ProjectRole {
  label: string;
  content: string;
}

export interface ProjectTool {
  name: string;
  description?: string;
}

export interface ProjectRouteStep {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  label: string;
  alt: string;
}

export interface ProjectStage {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ProjectShowcaseData {
  index: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  tags: string[];
  overview: string[];
  roles: ProjectRole[];
  tools: ProjectTool[];
  route: ProjectRouteStep[];
  video: string;
  videoPoster?: string;
  images: ProjectImage[];
  // Optional: for projects with stages (like Sensitive Light)
  stages?: ProjectStage[];
  teamNote?: string;
  // Optional: English title + slogan
  englishTitle?: string;
  slogan?: string;
  // Optional: online scrollable images for left area
  onlineImages?: ProjectImage[];
  // Optional: QR code image
  qrcode?: string;
}
