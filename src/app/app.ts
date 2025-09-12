import { Component, ElementRef, viewChild, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Loading } from './components/loading/loading';
import { Menu } from './components/menu/menu';
import { Introduction } from './sections/introduction/introduction';
import { Roles } from './sections/roles/roles';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';
import { Scrollbar } from './components/scrollbar/scrollbar';
import { environment } from '../environments/environment';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Loading, Menu, Introduction, Roles, Projects, Skills, Scrollbar, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);

  ref = viewChild.required<ElementRef<HTMLElement>>('container');

  constructor() {
    this.setSEOMetadata();
    this.setStructuredData();
  }

  private setSEOMetadata(): void {
    const baseUrl = environment.baseUrl;
    const title = 'Portfolio - Mohammad Saeed | Full-Stack Developer';
    const description =
      'Full-stack developer specializing in SaaS platforms, dashboards, and cloud-native apps using Next.js, NestJS, PostgreSQL, and Stripe. Building fast MVPs for startups from $2.5k+.';
    const ogImageUrl = `${baseUrl}/og_image.png`;
    const canonicalUrl = `${baseUrl}/`;

    // Set page title
    this.title.setTitle(title);

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: description,
    });

    // Set meta keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Mohammad Saeed, portfolio, full-stack developer, Angular, web development',
    });

    // Set meta author
    this.meta.updateTag({
      name: 'author',
      content: 'Mohammad Saeed',
    });

    // Set canonical URL
    this.meta.updateTag({
      rel: 'canonical',
      href: canonicalUrl,
    });

    // Open Graph / Facebook meta tags
    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:url',
      content: canonicalUrl,
    });

    this.meta.updateTag({
      property: 'og:title',
      content: title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: description,
    });

    this.meta.updateTag({
      property: 'og:image',
      content: ogImageUrl,
    });

    // Twitter meta tags
    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      property: 'twitter:url',
      content: canonicalUrl,
    });

    this.meta.updateTag({
      property: 'twitter:title',
      content: title,
    });

    this.meta.updateTag({
      property: 'twitter:description',
      content: description,
    });

    this.meta.updateTag({
      property: 'twitter:image',
      content: ogImageUrl,
    });

    // Add meta robots for indexing
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow',
    });

    // Add language meta
    this.meta.updateTag({
      name: 'language',
      content: 'en',
    });
  }

  private setStructuredData(): void {
    const baseUrl = environment.baseUrl;
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mohammad Saeed',
      jobTitle: 'Full-Stack Developer',
      url: `${baseUrl}/`,
      image: `${baseUrl}/myself.png`,
      description:
        'Full-stack developer specializing in SaaS platforms, dashboards, and cloud-native apps using Next.js, NestJS, PostgreSQL, and Stripe. Building fast MVPs for startups from $2.5k+.',
      email: 'contact@msaeedsaeedi.com',
    };

    // Create script element for structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }
}
