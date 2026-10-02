import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://matigtechnologix.online', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://matigtechnologix.online/services', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://matigtechnologix.online/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://matigtechnologix.online/work', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://matigtechnologix.online/case-studies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://matigtechnologix.online/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://matigtechnologix.online/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://matigtechnologix.online/team', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://matigtechnologix.online/testimonials', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
