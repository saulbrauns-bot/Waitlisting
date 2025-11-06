import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/confirmation-test/', '/_next/'],
    },
    sitemap: 'https://bridge.app/sitemap.xml', // TODO: Update with your actual domain
  }
}
