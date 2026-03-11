export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  featured: boolean;
  content: string;
  relatedGuides: string[];
}
