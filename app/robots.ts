import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/matig-admin-tech/', '/portal/'] },
    sitemap: 'https://matigtechnologix.online/sitemap.xml',
  };
}
