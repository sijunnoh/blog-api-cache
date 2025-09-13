# Next.js API 캐싱 동작 분석

Next.js에서 fetch, axios, React cache의 캐싱 동작을 비교 분석하는 테스트 프로젝트입니다.

## 테스트 페이지

### 1. Fetch 캐싱 테스트 (`/fetch-test`)

Next.js의 자동 fetch 캐싱 동작을 확인합니다:

- layout, generateMetadata, page에서 총 1번의 API 요청
- 모든 호출에서 동일한 응답 반환
- Next.js 내장 요청 중복 제거 기능 동작

### 2. Axios 캐싱 테스트 (`/axios-test`)

캐싱 없이 사용하는 axios의 기본 동작을 확인합니다:

- layout, generateMetadata, page에서 총 6번의 개별 API 요청
- 매번 다른 시간 응답
- 요청 중복 제거나 캐싱 없음

### 3. Axios + React Cache 테스트 (`/axios-cache-test`)

React cache()를 올바르게 사용한 axios 구현을 확인합니다:

- cache()로 감싼 axios 함수로 총 1번의 API 요청
- 모든 호출에서 동일한 응답 반환
- fetch와 동일한 캐싱 효과 달성

### 4. Axios + React Cache 잘못된 사용 (`/axios-cache-broken-test`)

매개변수 참조 문제로 인한 캐시 무효화를 확인합니다:

- cache() 함수에 매번 새로운 빈 객체 `{}` 전달
- 참조 불일치로 인해 총 6번의 개별 API 요청
- 캐시 효과 완전히 상실

## 캐싱 동작 비교

| 방법              | 요청 횟수 | 캐싱 여부 | 응답 일관성 |
| ----------------- | --------- | --------- | ----------- |
| fetch (Next.js)   | 1회       | ✓ 자동    | ✓ 동일      |
| axios 단독        | 6회       | ✗ 없음    | ✗ 다름      |
| axios + cache()   | 1회       | ✓ 수동    | ✓ 동일      |
| axios + cache({}) | 6회       | ✗ 무효화  | ✗ 다름      |

## 테스트 방법

1. 브라우저 개발자 도구에서 Network 탭과 Console 탭을 열어두세요
2. 각 테스트 페이지로 이동하여 요청 패턴을 관찰하세요
3. 서버 콘솔 로그에서 실제 API 호출 횟수를 확인하세요
4. 페이지 새로고침 후 다시 테스트하여 동작을 재확인하세요

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# http://localhost:3000 접속
```

## 중요 포인트

- Next.js fetch의 자동 요청 최적화 동작
- React cache()를 사용한 수동 캐싱 구현
- 객체 참조 변경이 캐시에 미치는 영향
- 성능 최적화를 위한 올바른 캐싱 전략
