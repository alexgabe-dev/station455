
import { Transmission, EchoSignal, Frequency, BurstMoment, SiteConfig } from '../types';

// GHOST CMS CONFIGURATION
const GHOST_URL = "https://demo.ghost.io";
const GHOST_KEY = "22444f78447824223cefc48062"; 

const api = {
  posts: `${GHOST_URL}/ghost/api/content/posts/`,
  tags: `${GHOST_URL}/ghost/api/content/tags/`,
  authors: `${GHOST_URL}/ghost/api/content/authors/`
};

// --- DEFAULT DATA ---
const DEFAULT_ECHOES: EchoSignal[] = [
  { id: 'e-01', title: 'Static Speaks: Decoding the Background...', episode: 'SIG-01', duration: '0:54' },
  { id: 'e-02', title: 'Lost Colony Reports: Sector 7G...', episode: 'SIG-02', duration: '1:02' },
  { id: 'e-03', title: 'Nebula Sounds: Music from the Gas...', episode: 'SIG-03', duration: '0:42' },
  { id: 'e-04', title: 'The Artificial Mind: Can AI Dream?', episode: 'SIG-04', duration: '0:42' },
  { id: 'e-05', title: 'Void Whispers: Audio Logs recovered...', episode: 'SIG-05', duration: '0:56' },
];

const DEFAULT_CONFIG: SiteConfig = {
  siteTitle: "Station445 | Cosmic Relay",
  siteDescription: "An ultra-minimalist, cosmic horror/sci-fi blog platform broadcasting signals from the void.",
  stationStatus: 'ONLINE',
  maintenanceMode: false,
  adminContact: "sys_admin@station445.void",
  enableHeroAlertColor: true,
  enableFooterPulse: true
};

const FREQUENCIES: Frequency[] = [
  { 
    id: 'f-1', 
    title: 'Auditory Hallucinations of Deep Space', 
    excerpt: 'Explore the work of Comms Officer H. Webb, who documented the singing of the stars before vanishing.', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 
    tags: ['Audio', 'Mystery', 'Logs'],
    date: 'Cycle 440.12'
  },
  { 
    id: 'f-2', 
    title: 'Visualizing the 4th Dimension', 
    excerpt: 'Rare imagery captured by the drone fleet near the wormhole entrance. Viewer discretion advised.', 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', 
    tags: ['Visual', 'Physics', 'Drone'],
    date: 'Cycle 442.88'
  },
];

const DEFAULT_MOMENTS: BurstMoment[] = [
  { 
    id: 'b-1', 
    title: 'Anomaly Detected in Sector 4', 
    caption: 'Sensors indicate a tear in the fabric of reality. Visual confirmation pending.', 
    image: 'https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=800&auto=format&fit=crop',
    mediaType: 'image',
    tags: ['Alert', 'Anomaly', 'Sector-4'],
    readTime: '02:00',
    date: 'Today'
  },
  { 
    id: 'b-2', 
    title: 'The Abandoned Station', 
    caption: 'Interior shots of Station 99. No life signs detected, but systems are active.', 
    image: 'https://images.unsplash.com/photo-1518544806352-a228605200bd?q=80&w=800&auto=format&fit=crop',
    mediaType: 'image',
    tags: ['Exploration', 'Ruins', 'Log'],
    readTime: '12:00',
    date: 'Yesterday'
  },
  { 
    id: 'b-3', 
    title: 'Tech Analysis: Alien Artifacts', 
    caption: 'Declassified blueprints of the recovered propulsion drive. It defies physics.', 
    image: 'https://images.unsplash.com/photo-1518005052357-e98475018297?q=80&w=800&auto=format&fit=crop',
    mediaType: 'image',
    tags: ['Tech', 'Xeno', 'Science'],
    readTime: '06:00',
    date: 'Cycle 444'
  },
];

// --- GHOST API HELPERS ---
const mapGhostPostToTransmission = (post: any): Transmission => {
    return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || post.custom_excerpt || "Signal intercepted...",
        content: post.html,
        coverImage: post.feature_image || 'https://images.unsplash.com/photo-1614730341194-75c60740a3d3?q=80&w=2000&auto=format&fit=crop', 
        readTime: `${post.reading_time || 5} min read`,
        tags: post.tags ? post.tags.map((t: any) => t.name) : [],
        publishDate: new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        slug: post.slug,
        author: post.primary_author?.name || 'Unknown'
    };
};

export const getLatestTransmission = async (): Promise<Transmission | null> => {
    try {
        const res = await fetch(`${api.posts}?key=${GHOST_KEY}&limit=1&include=tags,authors`);
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
            return mapGhostPostToTransmission(data.posts[0]);
        }
        return null;
    } catch (error) {
        console.error("Signal Lost: Failed to fetch latest transmission", error);
        return null;
    }
};

export const getAllTransmissions = async (): Promise<Transmission[]> => {
    try {
        const res = await fetch(`${api.posts}?key=${GHOST_KEY}&limit=15&include=tags,authors`);
        const data = await res.json();
        return data.posts.map(mapGhostPostToTransmission);
    } catch (error) {
        console.error("Signal Lost: Failed to fetch archive", error);
        return [];
    }
};

export const getTransmissionBySlug = async (slug: string): Promise<Transmission | undefined> => {
    try {
        const res = await fetch(`${api.posts}slug/${slug}/?key=${GHOST_KEY}&include=tags,authors`);
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
            return mapGhostPostToTransmission(data.posts[0]);
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};

// --- DYNAMIC DATA MANAGERS (ADMIN) ---

export const getEchoes = async (): Promise<EchoSignal[]> => {
  const local = localStorage.getItem('station_echoes');
  if (local) {
    return JSON.parse(local);
  }
  return DEFAULT_ECHOES;
};

export const saveEchoes = async (echoes: EchoSignal[]): Promise<void> => {
    localStorage.setItem('station_echoes', JSON.stringify(echoes));
};

export const getSiteConfig = async (): Promise<SiteConfig> => {
    const local = localStorage.getItem('station_config');
    if (local) {
        return JSON.parse(local);
    }
    return DEFAULT_CONFIG;
};

export const saveSiteConfig = async (config: SiteConfig): Promise<void> => {
    localStorage.setItem('station_config', JSON.stringify(config));
};

export const getMustSeeMoments = async (): Promise<BurstMoment[]> => {
  const local = localStorage.getItem('station_moments');
  if (local) {
    return JSON.parse(local);
  }
  return DEFAULT_MOMENTS;
};

export const saveMustSeeMoments = async (moments: BurstMoment[]): Promise<void> => {
    localStorage.setItem('station_moments', JSON.stringify(moments));
};

// Static data fetchers - optimized to remove artificial delay
export const getFrequencies = async (): Promise<Frequency[]> => {
  return Promise.resolve(FREQUENCIES);
};
