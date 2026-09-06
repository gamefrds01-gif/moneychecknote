// 사이트 전역 상수 — 문구·카테고리는 여기서만 관리 (브랜드 변경 시 이 파일만)
export const SITE_TITLE = '머니체크노트';
export const SITE_TAGLINE = 'Money Check Note';
export const SITE_DESCRIPTION =
  '연봉 실수령액·퇴직금·대출이자 계산기와 정부지원금·환급·세금 정보를 공식 자료로 확인해 정리하는 돈 계산·혜택 허브. 내 돈이 얼마인지, 어떻게 받는지 바로 확인하세요.';

// 하위 카테고리 = 안내글 분류 (계산기는 카테고리가 아니라 /calc/ 별도 허브)
export const CATEGORY_GROUPS = [
  {
    key: 'money',
    name: '돈·혜택',
    categories: {
      'gov-support': '정부지원금',
      'refund': '숨은 돈·환급',
      'tax': '세금',
      'money-guide': '돈 가이드',
    } as Record<string, string>,
  },
];

// 하위 카테고리 평면 맵 (slug → 표시명) — 컴포넌트 호환용
export const CATEGORIES: Record<string, string> = {
  'gov-support': '정부지원금',
  'refund': '숨은 돈·환급',
  'tax': '세금',
  'money-guide': '돈 가이드',
};

// 카테고리 칩 색상 (썸네일·카드용)
export const CATEGORY_COLORS: Record<string, string> = {
  'gov-support': 'bg-emerald-500',
  'refund': 'bg-cyan-500',
  'tax': 'bg-rose-500',
  'money-guide': 'bg-amber-500',
};
