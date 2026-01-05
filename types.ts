
export interface Transmission {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Full HTML content simulation
  coverImage: string;
  readTime: string;
  tags: string[];
  publishDate: string;
  slug: string;
  author?: string;
}

export interface EchoSignal {
  id: string;
  title: string;
  episode: string;
  duration: string;
  image?: string;
}

export interface Frequency {
  id: string;
  title: string; 
  excerpt: string;
  image: string;
  tags: string[];
  date: string;
}

export interface BurstMoment {
  id: string;
  title: string;
  image: string; // Used for both Image URL and Video URL
  mediaType?: 'image' | 'video';
  caption: string;
  tags: string[];
  readTime: string;
  date: string;
}

export interface SiteConfig {
  siteTitle: string;
  siteDescription: string;
  stationStatus: 'ONLINE' | 'OFFLINE' | 'CRITICAL' | 'SILENT';
  maintenanceMode: boolean;
  adminContact: string;
  enableHeroAlertColor: boolean;
  enableFooterPulse: boolean;
}
