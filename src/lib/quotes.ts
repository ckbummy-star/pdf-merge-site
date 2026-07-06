export interface Quote {
  text: string;
  author: string;
}

export const QUOTES: Quote[] = [
  { text: "가장 큰 영광은 한 번도 실패하지 않음이 아니라 실패할 때마다 다시 일어서는 데에 있다.", author: "공자" },
  { text: "오늘 할 수 있는 일에 전력을 다하라. 그러면 내일에는 한 걸음 더 나아갈 수 있다.", author: "아이작 뉴턴" },
  { text: "시작이 반이다.", author: "아리스토텔레스" },
  { text: "성공은 최종적인 것이 아니고 실패는 치명적인 것이 아니다. 중요한 것은 계속하려는 용기다.", author: "윈스턴 처칠" },
  { text: "천 리 길도 한 걸음부터.", author: "노자" },
  { text: "행복은 습관이다. 그것을 몸에 지니라.", author: "허버트" },
  { text: "할 수 있다고 믿는 사람은 그렇게 되고, 할 수 없다고 믿는 사람 역시 그렇게 된다.", author: "샤를 드골" },
  { text: "지식에 투자하는 것이 언제나 최고의 이자를 지불한다.", author: "벤저민 프랭클린" },
  { text: "인내는 쓰지만 그 열매는 달다.", author: "장 자크 루소" },
  { text: "위대한 일은 갑자기 이루어지지 않는다.", author: "에픽테토스" },
  { text: "배움에는 끝이 없다.", author: "히포크라테스" },
  { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
  { text: "가장 어두운 밤도 언젠가 끝나고 해는 떠오른다.", author: "빈센트 반 고흐" },
  { text: "실패는 성공의 어머니다.", author: "토머스 에디슨" },
  { text: "당신이 할 수 있다고 생각하든 할 수 없다고 생각하든, 당신의 생각이 옳다.", author: "헨리 포드" },
  { text: "느리게 가는 것을 두려워하지 말고, 멈춰 서 있는 것을 두려워하라.", author: "중국 속담" },
  { text: "가장 좋은 시절은 아직 오지 않았다.", author: "로버트 브라우닝" },
  { text: "노력은 결코 배신하지 않는다.", author: "이소룡" },
  { text: "오늘의 나는 어제의 내가 만든 것이다.", author: "석가모니" },
  { text: "꿈을 꿀 수 있다면 그것을 이룰 수도 있다.", author: "월트 디즈니" },
];

/**
 * Returns the quote of the day, deterministic per calendar date so it stays
 * the same throughout the day but changes each day.
 */
export function getTodayQuote(date: Date = new Date()): Quote {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % QUOTES.length;
  return QUOTES[index];
}
