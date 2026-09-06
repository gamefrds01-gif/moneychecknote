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

// 주휴수당 — 근로기준법 제55조·시행령 제30조. 시급은 2026 최저임금(10,320) 참조.
export const HOURLY = {
  minWageHour: 10320, // 2026 최저임금 시급
  weeklyHolidayThreshold: 15, // 주 소정근로시간 15시간 이상이어야 주휴수당 발생
  fullWeekHours: 40, // 주 40시간 기준(초과분은 주휴 산정에 미포함)
  holidayHours: 8, // 주 40시간 기준 주휴 8시간분
  asof: '2026-09-06',
};

// 자동차세(비영업 승용) — 지방세법. cc당 세액·지방교육세·차령경감·연납 공제.
export const CAR_TAX = {
  // [배기량 상한(cc), cc당 세액(원)]
  ccRates: [[1000, 80], [1600, 140], [Infinity, 200]] as [number, number][],
  eduTaxRate: 0.30, // 지방교육세 = 자동차세의 30%
  // 차령 경감: 3년차부터 매년 5%p, 최대 50%. 경감률 = min(50%, max(0,(차령-2)*5%))
  agingStartYear: 3,
  agingStepPct: 0.05,
  agingMaxPct: 0.50,
  prepayJanDiscount: 0.05, // 2026년 1월 연납(연세액 일시납) 공제율 약 5%(지방세법 시행령, 매년 축소·위택스 확인)
  asof: '2026-09-06',
};

// 주택용 저압 전기요금 — 한전 기본공급약관(누진 3구간).
export const ELEC = {
  // 구간 경계(kWh): 200, 400
  tier1Max: 200,
  tier2Max: 400,
  baseFee: [910, 1600, 7300], // 기본요금(원): 200이하 / 201~400 / 400초과
  energyRate: [120, 214, 307], // 전력량요금(원/kWh): 1구간 / 2구간 / 3구간
  climateRate: 9.0, // 기후환경요금(원/kWh) — 개정 시 변동, 입력 조정 가능
  fuelAdjRate: 5.0, // 연료비조정요금(원/kWh)
  vatRate: 0.10, // 부가가치세
  fundRate: 0.037, // 전력산업기반기금
  tvFee: 2500, // TV수신료(선택)
  asof: '2026-09-06',
};

// 휴대폰 요금 — 단말기 할부(5.9%)+선택약정 25% vs 공시지원금+전환지원금. 단통법 폐지(2025.7.22)로 추가지원금 상한 없음.
// online:true = 온라인 다이렉트 요금제(선택약정 25% 미적용, 이미 할인가).
export const PHONE = {
  installmentAPR: 0.059,      // 단말기 할부수수료 연 5.9%(통상)
  selectiveDiscount: 0.25,    // 선택약정 요금할인 25%
  switchSubsidyMax: 500000,   // 전환지원금(번호이동) 최대, 공시지원금 선택 시
  months: [0, 12, 18, 24, 30, 36, 48],
  vatRate: 0.10,
  // 단말기 출고가(원) — 확정 자료(2026-09 기준). 그 외 기종은 직접 입력.
  devices: [
    { name: '갤럭시 S26 256GB', price: 1254000 },
    { name: '갤럭시 S26 512GB', price: 1353000 },
    { name: '갤럭시 S26+ 256GB', price: 1452000 },
    { name: '갤럭시 S26+ 512GB', price: 1551000 },
    { name: '갤럭시 S26+ 1TB', price: 1650000 },
    { name: '갤럭시 S26 울트라 256GB', price: 1797400 },
    { name: '갤럭시 S26 울트라 512GB', price: 2046400 },
    { name: '갤럭시 S26 울트라 1TB', price: 2545400 },
    { name: '아이폰 17 (256GB)', price: 1290000 },
    { name: '아이폰 17 에어 (256GB)', price: 1590000 },
    { name: '아이폰 17 프로 (256GB)', price: 1790000 },
    { name: '아이폰 17 프로맥스 (256GB)', price: 1990000 },
    { name: '갤럭시 Z폴드8 256GB', price: 2278100 },
    { name: '갤럭시 Z폴드8 512GB', price: 2531100 },
    { name: '갤럭시 Z폴드8 1TB', price: 3152600 },
    { name: '갤럭시 Z폴드8 울트라 256GB', price: 2577300 },
    { name: '갤럭시 Z폴드8 울트라 512GB', price: 2830300 },
    { name: '갤럭시 Z폴드8 울트라 1TB', price: 3451800 },
    { name: '갤럭시 Z플립8 256GB', price: 1683000 },
    { name: '갤럭시 Z플립8 512GB', price: 1936000 },
    { name: '갤럭시 워치9 40mm LTE', price: 529100 },
    { name: '갤럭시 워치9 44mm LTE', price: 569800 },
    { name: '갤럭시 워치 울트라2 LTE', price: 969100 },
    { name: '기타(출고가 직접 입력)', price: 0 },
  ] as { name: string; price: number }[],
  // 현행 5G 요금제(월정액, 부가세 포함 광고가) — 12만원대까지. 통신사 개편 잦으니 확인일 기준, 직접 편집 가능.
  plans: {
    'SKT': [
      { name: '베스트 129(무제한)', fee: 129000 },
      { name: '베스트 109(무제한)', fee: 109000 },
      { name: '베스트 89(무제한)', fee: 89000 },
      { name: '라이트 79', fee: 79000 },
      { name: '라이트 59', fee: 59000 },
      { name: '라이트 39', fee: 39000 },
      { name: 'T플랜 세이브', fee: 33000 },
    ],
    'KT': [
      { name: '초이스 더블', fee: 120000 },
      { name: '초이스 110', fee: 110000 },
      { name: '베이직 100(무제한)', fee: 100000 },
      { name: '초이스 90', fee: 90000 },
      { name: '베이직 80(무제한)', fee: 80000 },
      { name: '베이직 69', fee: 69000 },
      { name: '베이직 55', fee: 55000 },
      { name: '요고 다이렉트46(온라인)', fee: 46000, online: true },
      { name: '베이직 37', fee: 37000 },
    ],
    'LGU+': [
      { name: '플러스플랜 105', fee: 105000 },
      { name: '플러스플랜 95', fee: 95000 },
      { name: '데이터플랜 MAX', fee: 85000 },
      { name: '데이터플랜 150GB', fee: 75000 },
      { name: '데이터플랜 125GB', fee: 70000 },
      { name: '데이터플랜 95GB', fee: 68000 },
      { name: '데이터플랜 80GB', fee: 66000 },
      { name: '데이터플랜 50GB', fee: 63000 },
      { name: '데이터플랜 31GB', fee: 61000 },
    ],
  } as Record<string, { name: string; fee: number; online?: boolean }[]>,
  asof: '2026-09-06',
  note: '단통법(단말기유통법)은 2025.7.22 폐지되어 추가지원금 상한(구 15%)이 없어졌습니다(판매처 자유). 선택약정 요금할인 25%는 유지됩니다. 온라인 다이렉트 요금제는 선택약정 미적용.',
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
      { name: '퇴직소득세 간이 산정(근속연수공제·환산급여·연분연승)', org: '소득세법·국세청', url: 'https://www.nts.go.kr' },
    ],
  },
  hourly: {
    label: '최저임금·주휴수당 (2026년 적용)',
    items: [
      { name: '최저임금 시급 10,320원', org: '최저임금위원회·고용노동부(2026년)', url: 'https://www.minimumwage.go.kr' },
      { name: '주휴수당(주 15시간 이상·개근 시 유급휴일 1일)', org: '근로기준법 제55조·시행령 제30조', url: 'https://www.law.go.kr' },
    ],
    authority: '주휴수당은 1주 소정근로시간이 15시간 이상이고 그 주의 소정근로일을 개근한 근로자에게 지급됩니다(정규·알바 무관). 15시간 미만이면 발생하지 않습니다.',
  },
  cartax: {
    label: '자동차세(비영업 승용) — 배기량 기준 (지방세법)',
    items: [
      { name: 'cc당 세액(≤1000cc 80원·≤1600cc 140원·>1600cc 200원)+지방교육세 30%', org: '지방세법·행정안전부', url: 'https://www.law.go.kr' },
      { name: '차령 경감(3년차 5%~12년 50%)·연납 공제', org: '위택스(지방세 납부)', url: 'https://www.wetax.go.kr' },
    ],
    authority: '연납 공제율은 지방세법 시행령 개정으로 매년 조정됩니다(최근 축소 추세). 정확한 고지·납부는 위택스에서 확인하세요.',
  },
  elec: {
    label: '주택용 저압 전기요금 — 누진 3구간 (한전 기본공급약관)',
    items: [
      { name: '기본요금·전력량요금(120·214·307원/kWh)+기후환경·연료비조정', org: '한국전력공사(KEPCO)', url: 'https://cyber.kepco.co.kr' },
      { name: '부가세 10%+전력산업기반기금 3.7%', org: '한전 기본공급약관', url: 'https://cyber.kepco.co.kr' },
    ],
    authority: '기후환경요금·연료비조정요금·계절/구간은 한전 요율 개정에 따라 변동합니다. 정확한 청구액은 한전ON·고객센터(123)로 확인하세요.',
  },
  income: {
    label: '종합소득세·부가가치세 (소득세법·부가가치세법)',
    items: [
      { name: '종합소득세 누진세율(6~45%)+지방소득세 10%', org: '국세청(소득세법)', url: 'https://www.nts.go.kr' },
      { name: '부가가치세 10%(일반과세)·간이과세 별도', org: '국세청(부가가치세법)', url: 'https://www.nts.go.kr' },
    ],
    authority: '종합소득세는 필요경비·소득공제·세액공제에 따라 크게 달라지는 간이 추정입니다. 정확한 신고는 홈택스·세무 전문가로 확인하세요.',
  },
  phone: {
    label: '휴대폰 요금·단말기 지원금 (2026년 기준)',
    items: [
      { name: '선택약정 요금할인 25%·전환지원금(번호이동)', org: '전기통신사업법·과학기술정보통신부', url: 'https://www.msit.go.kr' },
      { name: '단말기 지원금·요금제 공식 비교', org: '스마트초이스(한국통신사업자연합회)', url: 'https://www.smartchoice.or.kr' },
      { name: '단통법 폐지(2025.7.22)로 추가지원금 상한 없음', org: '과학기술정보통신부', url: 'https://www.msit.go.kr' },
    ],
    authority: '요금제·출고가·공시지원금은 통신사·기기·시점마다 크게 다릅니다(대표 요금제는 예시). 정확한 지원금·요금제는 스마트초이스와 통신사 공식에서 확인하세요.',
  },
};
