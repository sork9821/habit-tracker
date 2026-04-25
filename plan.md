# 🌿 Habit Tracker — 기획서 (plan.md)
> **작성일:** 2026-04-25  
> **목표:** 매일 열고 싶어지는 감각적인 습관 추적기 웹앱

---

## 1. 프로젝트 개요

### 비전
단순한 체크리스트를 넘어, **"오늘도 해냈다"는 성취감**을 시각적으로 느낄 수 있는 감각적인 습관 관리 앱.  
GitHub 잔디처럼 쌓이는 기록, 불꽃처럼 타오르는 스트릭, 그리고 미니멀한 다크/라이트 테마.

### 기술 스택
| 구분 | 기술 |
|------|------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Icons | Lucide React |
| UI Components | Shadcn UI 스타일 (직접 구현) |
| Data Persistence | LocalStorage |
| Charts | Recharts |
| Date Handling | date-fns |

---

## 2. 전체 앱 아키텍처

```
src/
├── main.jsx                  # 앱 진입점
├── App.jsx                   # 라우팅 + 테마 프로바이더
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # 네비게이션 사이드바
│   │   ├── Header.jsx        # 상단 헤더 (날짜, 테마 토글)
│   │   └── Layout.jsx        # 전체 레이아웃 래퍼
│   │
│   ├── dashboard/
│   │   ├── TodayHabits.jsx   # 오늘의 습관 체크리스트
│   │   ├── StreakCard.jsx     # 연속 달성 카드
│   │   ├── ProgressRing.jsx  # 오늘 달성률 원형 그래프
│   │   └── QuickStats.jsx    # 요약 통계 카드 그룹
│   │
│   ├── heatmap/
│   │   └── CalendarHeatmap.jsx  # GitHub 잔디 스타일 히트맵
│   │
│   ├── habits/
│   │   ├── HabitList.jsx     # 습관 목록
│   │   ├── HabitCard.jsx     # 개별 습관 카드
│   │   ├── HabitForm.jsx     # 습관 추가/편집 모달
│   │   └── HabitColorPicker.jsx  # 색상 선택기
│   │
│   ├── analytics/
│   │   ├── WeeklyChart.jsx   # 주간 달성률 바차트
│   │   ├── MonthlyChart.jsx  # 월간 달성률 라인차트
│   │   └── AchievementBadge.jsx  # 성취 뱃지
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── Modal.jsx
│       ├── Badge.jsx
│       ├── Toggle.jsx
│       └── Tooltip.jsx
│
├── pages/
│   ├── Dashboard.jsx         # 메인 대시보드
│   ├── Habits.jsx            # 습관 관리 페이지
│   └── Analytics.jsx         # 분석 페이지
│
├── hooks/
│   ├── useHabits.js          # 습관 CRUD 커스텀 훅
│   ├── useStreak.js          # 스트릭 계산 로직
│   ├── useLocalStorage.js    # LocalStorage 추상화 훅
│   └── useTheme.js           # 다크/라이트 테마 훅
│
├── utils/
│   ├── dateUtils.js          # 날짜 계산 유틸
│   ├── streakUtils.js        # 연속 달성 계산
│   └── statsUtils.js         # 통계 계산 유틸
│
└── constants/
    ├── categories.js         # 카테고리 목록 & 아이콘
    └── colors.js             # 습관 색상 팔레트
```

---

## 3. 데이터 스키마 (LocalStorage)

### 3-1. habits (습관 목록)
```json
[
  {
    "id": "uuid-v4",
    "name": "독서 30분",
    "description": "잠들기 전 책 읽기",
    "category": "learning",
    "color": "#6366f1",
    "icon": "BookOpen",
    "frequency": "daily",
    "targetDays": [0, 1, 2, 3, 4, 5, 6],
    "createdAt": "2026-04-01T00:00:00.000Z",
    "isArchived": false,
    "order": 0
  }
]
```

### 3-2. completions (완료 기록)
```json
[
  {
    "id": "uuid-v4",
    "habitId": "habit-uuid",
    "date": "2026-04-25",
    "completedAt": "2026-04-25T22:30:00.000Z",
    "note": "오늘은 50페이지나 읽었다!"
  }
]
```

### 3-3. settings (앱 설정)
```json
{
  "theme": "dark",
  "startOfWeek": 1,
  "reminderEnabled": false
}
```

### 3-4. 카테고리 상수 (코드 내 정의)
| 키 | 한글명 | 아이콘 |
|----|--------|--------|
| `health` | 건강 | Heart |
| `learning` | 학습 | BookOpen |
| `mindfulness` | 마음챙김 | Brain |
| `fitness` | 운동 | Dumbbell |
| `social` | 소셜 | Users |
| `finance` | 재정 | DollarSign |
| `creative` | 창작 | Palette |
| `productivity` | 생산성 | Zap |

---

## 4. 핵심 기능 명세

### 4-1. Dashboard (메인 화면)
- **상단:** 날짜 표시 + 오늘의 달성률 (원형 Progress Ring, 애니메이션 포함)
- **중앙:** 오늘의 습관 리스트 — 체크 시 체크마크 + 색상 강조 + 완료 애니메이션(confetti 효과)
- **우측/하단:** 최장 스트릭 카드 (🔥 아이콘 + 일수), 이번 주 간략 통계
- **캘린더 히트맵:** 하단에 최근 12주 히트맵 (습관별 또는 전체 통합 뷰 토글)

### 4-2. Habits (습관 관리)
- 습관 목록 카드 뷰 (색상별 좌측 보더 강조)
- **추가 버튼** → 슬라이드업 모달
  - 이름, 설명, 카테고리, 색상 선택(컬러 팔레트), 아이콘 선택, 빈도 설정
- **카드 액션:** 수정, 보관(Archive), 삭제
- 드래그 앤 드롭 순서 변경 (react-beautiful-dnd 또는 직접 구현)
- 습관 카드 클릭 시 상세 패널 (히트맵 + 스트릭 + 달성률 미니 차트)

### 4-3. Analytics (분석)
- **주간 뷰:** 요일별 전체 달성률 바차트 + 습관별 완료 현황 도트
- **월간 뷰:** 날짜별 달성률 라인차트
- **습관별 통계 카드:** 총 완료 횟수, 최장 스트릭, 현재 스트릭, 달성률
- **성취 뱃지:** 7일 연속, 30일 연속, 100회 달성 등 마일스톤 뱃지

---

## 5. UX 흐름

```
[첫 방문]
  → 빈 화면 + "첫 번째 습관을 추가해보세요" 온보딩 CTA
  → 습관 추가 모달 오픈
  → 저장 → 대시보드로 이동

[일반 사용]
  앱 오픈
  → Dashboard 로드 (오늘 날짜 기준 습관 목록)
  → 습관 체크 (클릭/탭)
    → 완료 애니메이션 (체크 + 진동 or confetti)
    → Progress Ring 업데이트
    → 스트릭 업데이트 (7일 달성 시 배지 알림)
  → 선택적: 메모 추가 (long-press or 아이콘 클릭)

[습관 관리]
  Habits 탭 이동
  → 목록 확인 / 정렬
  → 새 습관 추가 or 기존 습관 편집
  → 저장 → 목록 갱신

[분석 확인]
  Analytics 탭 이동
  → 주간/월간 토글
  → 차트 확인 → 습관별 필터 적용
```

---

## 6. 디자인 시스템

### 컬러 팔레트 (Dark Mode 기준)
| 용도 | 값 |
|------|----|
| Background | `#0f0f13` |
| Surface | `#1a1a24` |
| Surface Elevated | `#22222f` |
| Border | `#2e2e3e` |
| Text Primary | `#f0f0f5` |
| Text Secondary | `#8888a0` |
| Accent (Indigo) | `#6366f1` |
| Success | `#22c55e` |
| Warning | `#f59e0b` |
| Danger | `#ef4444` |

### 타이포그래피
- Font: `Inter` (Google Fonts)
- Heading: 24px / Bold
- Subheading: 18px / SemiBold
- Body: 14px / Regular
- Caption: 12px / Regular

### 애니메이션 원칙 (Framer Motion)
- 체크 완료: scale 1 → 1.2 → 1 + 색상 변환 (200ms)
- 모달 등장: y: 20px → 0 + opacity 0 → 1 (300ms, ease-out)
- 카드 hover: y: -2px, shadow 증가 (150ms)
- 히트맵 셀: stagger 0.005s delay로 순차 등장

---

## 7. 개발 단계별 로드맵

| Phase | 내용 | 예상 산출물 |
|-------|------|------------|
| **Phase 1** | 프로젝트 세팅 + 레이아웃 | Vite 초기화, Tailwind 설정, Layout/Sidebar/Header |
| **Phase 2** | 핵심 훅 & 유틸 | useHabits, useStreak, useLocalStorage, dateUtils |
| **Phase 3** | Dashboard 구현 | TodayHabits, ProgressRing, StreakCard, CalendarHeatmap |
| **Phase 4** | Habits 관리 | HabitList, HabitForm 모달, CRUD 완성 |
| **Phase 5** | Analytics | WeeklyChart, MonthlyChart, AchievementBadge |
| **Phase 6** | Polish | 애니메이션, 다크/라이트 전환, 반응형, 온보딩 |

---

## 8. 구현 우선순위 체크리스트

- [ ] Vite + React + Tailwind CSS 프로젝트 세팅
- [ ] 다크/라이트 테마 시스템
- [ ] LocalStorage 기반 데이터 레이어 (useHabits, useLocalStorage)
- [ ] 스트릭 계산 로직 (useStreak, streakUtils)
- [ ] 레이아웃 (Sidebar 네비게이션)
- [ ] Dashboard — 오늘의 습관 리스트 + 체크
- [ ] Dashboard — Progress Ring (달성률)
- [ ] Dashboard — Streak Card
- [ ] Dashboard — Calendar Heatmap (12주)
- [ ] Habits 페이지 — 목록 + 추가/편집 모달
- [ ] Analytics 페이지 — 주간/월간 차트
- [ ] 성취 뱃지 시스템
- [ ] Framer Motion 애니메이션 전체 적용
- [ ] 반응형 모바일 뷰 지원
- [ ] 온보딩 빈 상태 처리

---

> **설계 원칙:** "기능이 작동하는 것"보다 "쓰고 싶어지는 것"을 우선한다.  
> 매 Phase 완료 후 엘피 승인을 받고 다음 단계로 진행.
