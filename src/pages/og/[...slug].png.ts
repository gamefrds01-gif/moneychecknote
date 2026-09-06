// 빌드 타임 OG 썸네일 생성 — 대표 이미지 + 그라데이션 + 제목 + 후킹 문구 + 카테고리
// satori(HTML→SVG) + resvg(SVG→PNG). 폰트는 Pretendard(OFL) 로컬 파일.
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { CATEGORIES, SITE_TITLE } from '../../consts';

// 빌드 시 cwd = 프로젝트 루트 (import.meta.url은 번들 후 chunk 위치라 사용 불가)
const fontDir = path.join(process.cwd(), 'src', 'assets', 'fonts');
const fontBold = fs.readFileSync(path.join(fontDir, 'Pretendard-Bold.ttf'));
const fontMedium = fs.readFileSync(path.join(fontDir, 'Pretendard-Medium.ttf'));

const CHIP_COLORS: Record<string, string> = {
  'ai-tools': '#06b6d4',
  'new-tech': '#8b5cf6',
  'bigtech-news': '#10b981',
  'guide': '#f59e0b',
  'life-info': '#f43f5e',
  'idea': '#65a30d',
  'hot-issue': '#ef4444',
};

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data, id }) => !data.draft && !id.includes('/'));
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

function heroDataUri(ogImage: string | undefined): string | null {
  if (!ogImage) return null;
  const file = path.join(process.cwd(), 'public', ogImage.replace(/^\//, ''));
  if (!fs.existsSync(file)) return null;
  const ext = path.extname(file).slice(1) === 'png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${fs.readFileSync(file).toString('base64')}`;
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: any };
  const { title, description, category, hook, ogImage } = post.data;
  const hookText = hook ?? description.split('. ')[0].slice(0, 60);
  const img = heroDataUri(ogImage);
  const chip = CHIP_COLORS[category] ?? '#06b6d4';

  const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
    type,
    props: { style, children },
  });

  const tree = el(
    'div',
    {
      width: '1200px', height: '630px', display: 'flex', position: 'relative',
      backgroundColor: '#0a0a0a', fontFamily: 'Pretendard',
    },
    [
      img
        ? { type: 'img', props: { src: img, style: { position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', objectFit: 'cover' } } }
        : el('div', { position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', backgroundImage: 'linear-gradient(135deg, #0e7490 0%, #0a0a0a 70%)' }),
      // 다크 그라데이션 오버레이 (하단 가독성)
      el('div', { position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', backgroundImage: 'linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 100%)' }),
      el(
        'div',
        { position: 'absolute', left: '64px', right: '64px', bottom: '56px', display: 'flex', flexDirection: 'column' },
        [
          el('div', { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }, [
            el('div', { display: 'flex', backgroundColor: chip, color: '#ffffff', fontSize: '26px', fontWeight: 700, padding: '8px 22px', borderRadius: '999px' }, CATEGORIES[category] ?? category),
            el('div', { display: 'flex', color: 'rgba(255,255,255,0.75)', fontSize: '26px', fontWeight: 500 }, SITE_TITLE),
          ]),
          el('div', { display: 'flex', color: '#ffffff', fontSize: '62px', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-1px' }, title),
          el('div', { display: 'flex', color: 'rgba(255,255,255,0.85)', fontSize: '30px', fontWeight: 500, marginTop: '18px' }, hookText),
        ],
      ),
    ],
  );

  const svg = await satori(tree as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Pretendard', data: fontBold, weight: 700, style: 'normal' },
      { name: 'Pretendard', data: fontMedium, weight: 500, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
