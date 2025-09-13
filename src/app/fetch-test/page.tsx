import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const generateMetadata = async (): Promise<Metadata> => {
  const timeResponse = await fetch("http://localhost:3000/api/current-time")
  const timeResponse2 = await fetch("http://localhost:3000/api/current-time")

  const time1 = await timeResponse.json()
  const time2 = await timeResponse2.json()

  console.log("generateMetadata fetch 1", time1)
  console.log("generateMetadata fetch 2", time2)

  return {
    title: "Next.js Fetch 캐싱 테스트",
    description: "Next.js의 자동 fetch 캐싱 동작 확인",
  }
}

const FetchTestPage = async () => {
  const timeResponse = await fetch("http://localhost:3000/api/current-time")
  const timeResponse2 = await fetch("http://localhost:3000/api/current-time")

  const time1 = await timeResponse.json()
  const time2 = await timeResponse2.json()

  console.log("page fetch 1", time1)
  console.log("page fetch 2", time2)

  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center p-8">
      <div className="mb-6 w-full">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            ← 홈으로 돌아가기
          </Button>
        </Link>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Next.js Fetch 캐싱 테스트</h1>

      <div className="w-full space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-blue-900">
            핵심 개념
          </h2>
          <p className="mb-2 text-gray-700">
            Next.js는{" "}
            <code className="rounded bg-white px-2 py-1">fetch()</code> 사용 시
            <strong> 자동으로 캐시를 적용</strong>합니다.
          </p>
          <p className="text-gray-700">
            동일한 URL에 대한 fetch는 한 번의 렌더링 사이클 내에서 캐시가
            공유됩니다.
          </p>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-green-900">
            기대 동작
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Layout → generateMetadata → Page</strong> 순서로 실행되는
              동안:
            </p>
            <ol className="ml-4 list-inside list-decimal space-y-2">
              <li>
                <code className="rounded bg-white px-2 py-1">layout.tsx</code>
                에서
                <code className="mx-1 rounded bg-white px-2 py-1">
                  fetch("/api/current-time")
                </code>{" "}
                호출
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">
                  generateMetadata
                </code>
                에서 동일한 URL fetch →{" "}
                <strong className="text-green-600">캐시된 결과 반환</strong>
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">page.tsx</code>에서
                동일한 URL fetch →{" "}
                <strong className="text-green-600">캐시된 결과 반환</strong>
              </li>
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-yellow-900">
            콘솔 확인
          </h2>
          <p className="mb-3 text-gray-700">
            서버 콘솔에서 확인되는 로그 패턴:
          </p>
          <div className="rounded bg-gray-900 p-4 font-mono text-sm text-green-400">
            <div>
              layout fetch 1: {"{"} time: "2024-01-01T12:00:00.000Z" {"}"}
            </div>
            <div>
              layout fetch 2: {"{"} time: "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              generateMetadata fetch 1: {"{"} time: "2024-01-01T12:00:00.000Z"{" "}
              {"}"} <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              generateMetadata fetch 2: {"{"} time: "2024-01-01T12:00:00.000Z"{" "}
              {"}"} <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              page fetch 1: {"{"} time: "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              page fetch 2: {"{"} time: "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            중요 포인트
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>
              Next.js의{" "}
              <code className="rounded bg-white px-2 py-1">fetch()</code>는
              <strong> 자동으로 요청 중복 제거 및 캐싱</strong> 적용
            </li>
            <li>
              동일한 URL에 대한 여러 fetch 호출이 단일 네트워크 요청으로 최적화
            </li>
            <li>
              <code className="rounded bg-white px-2 py-1">force-dynamic</code>{" "}
              설정과 무관하게 단일 렌더링 사이클 내에서 캐시 동작
            </li>
            <li>별도의 캐싱 로직 없이도 성능 최적화 자동 달성</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default FetchTestPage
