// 구조화 데이터(JSON-LD) 빌더 — 화면에 표시되는 값과 일치하는 것만 생성.
// 가짜 평점·리뷰·조회수 schema 금지. 실제 영상이 있을 때만 VideoObject.
import { SITE_TITLE, SITE_DESCRIPTION, CATEGORIES } from '../consts';

export const SITE_URL = 'https://money.pointchecknote.com';
const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// 뉴스성(속보/발표)으로 볼 카테고리 → NewsArticle, 그 외 → BlogPosting
export const NEWS_CATEGORIES = new Set([]);

function abs(path: string): string {
  if (!path) return '';
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// 조직(발행자) — 사이트 전역 1회
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_TITLE,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    founder: { '@type': 'Person', name: '이광희' },
    publishingPrinciples: `${SITE_URL}/editorial-policy/`,
  };
}

// 웹사이트 + 실제 동작하는 검색(SearchAction → /search/?q=) — 사이트 전역 1회
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'ko',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

// 빵부스러기(Breadcrumb)
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

// 게시글(NewsArticle/BlogPosting 분기)
export function articleSchema(opts: {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  pubDate: Date;
  updatedDate?: Date;
  urlPath: string;      // /posts/{id}/
  ogPath?: string;      // /og/{id}.png 또는 대표 이미지
}) {
  const isNews = NEWS_CATEGORIES.has(opts.category);
  const published = opts.pubDate.toISOString();
  const modified = (opts.updatedDate ?? opts.pubDate).toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': isNews ? 'NewsArticle' : 'BlogPosting',
    headline: opts.title.slice(0, 110),
    description: opts.description,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Person', name: '이광희', url: `${SITE_URL}/authors/editorial/` },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: abs(opts.urlPath),
    ...(opts.ogPath ? { image: [abs(opts.ogPath)] } : {}),
    articleSection: CATEGORIES[opts.category] ?? opts.category,
    inLanguage: 'ko',
    ...(opts.tags && opts.tags.length ? { keywords: opts.tags.join(', ') } : {}),
  };
}

// 영상(실제 재생 가능한 자체 영상이 있을 때만)
export function videoSchema(opts: {
  name: string;
  description: string;
  thumbnailPath: string;
  contentPath: string;   // /videos/{slug}-slideshow.mp4
  uploadDate: Date;
  durationSec?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name.slice(0, 110),
    description: opts.description,
    thumbnailUrl: [abs(opts.thumbnailPath)],
    contentUrl: abs(opts.contentPath),
    uploadDate: opts.uploadDate.toISOString(),
    ...(opts.durationSec ? { duration: `PT${opts.durationSec}S` } : {}),
  };
}
