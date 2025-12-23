
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface GroundingSource {
  uri: string;
  title?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}
