// 2026년 세율·요율 상수 — 한 곳에서 관리(고시 변경 시 이 파일만 수정)
// 출처·확인일을 함께 보관해 계산기 페이지에서 그대로 노출한다(원본성·신뢰).
export const RATES_ASOF = '2026-09-06';

// 4대보험 근로자 부담 요율 (2026년). 국민연금은 2026 연금개혁으로 9%→9.5% 인상(근로자 4.75%).
export const INSURANCE = {
  pension: 0.0475, // 국민연금 근로자 4.75%
  health: 0.03595, // 건강보험 근로자 3.595%
  employment: 0.009, // 고용보험(실업급여) 근로자 0.9%
  longTermCareOfHealth: 0.1295, // 장기요양 = 건강보험료의 12.95%(고시 확인 권장, 일부 자료 13.14%)
  // 국민연금 기준소득월액 상·하한(2025.7~2026.6 적용치, 매년 7월 변동) — 확인 후 갱신
  pensionBaseMax: 6170000,
  pensionBaseMin: 390000,
  note: '국민연금 상·하한은 매년 7월 조정되며 표시값은 확인일 기준 적용분입니다.',
  sources: [
    'https://asiatop.co.kr/insurance-labor/four-insurance-rate-2026-summary/',
    'https://cutlinecheck.com/four-insurance-premium/',
  ],
};

// 근로소득세 과세표준 구간(누진공제) — 2023년 개정 이후 현행. 지방소득세는 소득세의 10%.
export const INCOME_TAX_BRACKETS: [number, number, number][] = [
  // [상한(원), 세율, 누진공제(원)]
  [14000000, 0.06, 0],
  [50000000, 0.15, 1260000],
  [88000000, 0.24, 5760000],
  [150000000, 0.35, 15440000],
  [300000000, 0.38, 19940000],
  [500000000, 0.40, 25940000],
  [1000000000, 0.42, 35940000],
  [Infinity, 0.45, 65940000],
];

// 근로소득공제(연) 구간 [총급여 상한, 공제율, 누진식 기준]
export const EARNED_INCOME_DEDUCTION: [number, number, number][] = [
  [5000000, 0.70, 0],
  [15000000, 0.40, 3500000],
  [45000000, 0.15, 7500000],
  [100000000, 0.05, 12000000],
  [Infinity, 0.02, 14750000],
];

export const TAX_META = {
  asof: RATES_ASOF,
  note: '소득세는 연말정산 기준 추정(간이세액표 원천징수와 월별로 다를 수 있음). 인적공제·비과세만 반영한 간이 계산이며 실제 결정세액은 각종 공제·감면에 따라 달라집니다.',
};

// 실업급여(구직급여) 2026 — 상·하한, 소정급여일수, 최저임금
export const UNEMPLOYMENT = {
  rate: 0.6, // 평균임금의 60%
  dailyMax: 68100, // 1일 상한액
  dailyMin: 66048, // 1일 하한액(최저임금 10,320 × 8h × 80%)
  minWageHour: 10320, // 2026 최저임금 시급
  payCycleDays: 28, // 실업인정 주기(4주=28일)마다 지급 — 통상 28일분
  // 소정급여일수: [가입기간 상한(년), 50세미만 일수, 50세이상/장애인 일수]
  durations: [
    [1, 120, 120],
    [3, 150, 180],
    [5, 180, 210],
    [10, 210, 240],
    [Infinity, 240, 270],
  ] as [number, number, number][],
  asof: '2026-09-06',
};

// 각 계산기의 근거·출처(공식 발행처 + 적용연도). 계산기 페이지에 그대로 노출.
export const SOURCE_META: Record<string, { label: string; items: { name: string; org: string; url: string }[]; authority?: string }> = {
  salary: {
    label: '4대보험 요율·소득세 (2026년 적용 기준)',
    items: [
      { name: '국민연금 4.75%(2026 연금개혁 9.5%)', org: '국민연금공단', url: 'https://www.nps.or.kr' },
      { name: '건강보험 3.595%·장기요양 건보료의 12.95%', org: '국민건강보험공단', url: 'https://www.nhis.or.kr' },
      { name: '고용보험(실업급여) 0.9%', org: '고용노동부·근로복지공단', url: 'https://www.comwel.or.kr' },
      { name: '근로소득세·지방소득세(소득세의 10%)', org: '국세청(소득세법)', url: 'https://www.nts.go.kr' },
    ],
  },
  unemployment: {
    label: '구직급여 상·하한·소정급여일수 (2026년 적용)',
    items: [
      { name: '1일 상한 68,100원·하한 66,048원', org: '고용노동부(2026년 적용 고시)', url: 'https://www.moel.go.kr' },
      { name: '최저임금 시급 10,320원', org: '최저임금위원회·고용노동부(2026년)', url: 'https://www.minimumwage.go.kr' },
      { name: '소정급여일수 120~270일', org: '고용보험법 시행령', url: 'https://www.ei.go.kr' },
    ],
    authority: '실업급여 신청·지급은 거주지 관할 고용센터(고용노동부) 담당이며, 정확한 수급액·인정은 고용보험 홈페이지 모의계산·고용센터 심사로 확정됩니다.',
  },
  loan: {
    label: '표준 금융 상각식(별도 고시 없음)',
    items: [
      { name: '원리금균등: P·r·(1+r)ⁿ ÷ ((1+r)ⁿ−1) / 원금균등 / 만기일시', org: '금융권 표준 계산식', url: '' },
    ],
    authority: '은행 전산은 원 단위 절사·이자 계산 방식에 따라 소액 차이가 있을 수 있어, 실행 전 대출 상품 안내서 기준으로 확인하세요.',
  },
  severance: {
    label: '평균임금 기준 퇴직금 (근로기준법)',
    items: [
      { name: '평균임금 산정(퇴직 전 3개월 임금 ÷ 91.25 × 30 × 재직일수/365)', org: '근로기준법 제2조·고용노동부', url: 'https://www.moel.go.kr' },
    ],
  },
};
