import { cache } from "react"

import axios from "axios"
import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// React cache를 잘못 사용 - 매번 새로운 빈 객체를 전달하여 캐시 무효화
const fetchTimeWithBrokenCache = cache(async (options = {}) => {
  console.log("fetchTimeWithBrokenCache 호출됨 (page)", options)
  const response = await axios.get("http://localhost:3000/api/current-time")
  return response.data
})

export const generateMetadata = async (): Promise<Metadata> => {
  // 매번 새로운 빈 객체를 전달 - 참조가 다르므로 캐시 미스
  const time1 = await fetchTimeWithBrokenCache({})
  const time2 = await fetchTimeWithBrokenCache({})

  console.log("generateMetadata axios-cache-broken 1", time1)
  console.log("generateMetadata axios-cache-broken 2", time2)

  return {
    title: "Axios + React Cache 잘못된 사용 테스트",
    description: "빈 객체 매개변수로 인한 캐시 무효화 현상",
  }
}

const AxiosCacheBrokenTestPage = async () => {
  // 매번 새로운 빈 객체를 전달 - 참조가 다르므로 캐시 미스
  const time1 = await fetchTimeWithBrokenCache({})
  const time2 = await fetchTimeWithBrokenCache({})

  console.log("page axios-cache-broken 1", time1)
  console.log("page axios-cache-broken 2", time2)

  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center p-8">
      <div className="mb-6 w-full">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            ← 홈으로 돌아가기
          </Button>
        </Link>
      </div>
      <h1 className="mb-6 text-3xl font-bold">
        Axios + React Cache 잘못된 사용
      </h1>

      <div className="w-full space-y-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-red-900">
            문제점 분석
          </h2>
          <p className="mb-2 text-gray-700">
            <code className="rounded bg-white px-2 py-1">cache()</code>를
            사용하더라도
            <strong> 매개변수 참조가 일정하지 않으면 캐시가 무효화</strong>
            됩니다.
          </p>
          <p className="text-gray-700">
            매번 새로운 빈 객체를 전달하면 캐시 키가 달라져 캐시 미스가
            발생합니다.
          </p>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-orange-900">
            잘못된 구현
          </h2>
          <div className="mb-3 rounded bg-gray-900 p-4 font-mono text-sm text-red-400">
            <div>
              const fetchTimeWithBrokenCache = cache(async (options = {`{}`})
              =&gt; {`{`}
            </div>
            <div className="ml-4">
              const response = await axios.get("/api/current-time")
            </div>
            <div className="ml-4">return response.data</div>
            <div>{`})`}</div>
            <div className="mt-2"></div>
            <div>// 매번 새로운 객체 참조로 호출</div>
            <div>
              await fetchTimeWithBrokenCache({`{}`}){" "}
              <span className="text-yellow-400">← 새 객체 #1</span>
            </div>
            <div>
              await fetchTimeWithBrokenCache({`{}`}){" "}
              <span className="text-yellow-400">← 새 객체 #2</span>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            React의 <code className="rounded bg-white px-1">cache()</code>는
            매개변수의 참조 동일성을 기준으로 캐시를 판단합니다.
          </p>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-yellow-900">
            실제 동작
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Layout → generateMetadata → Page</strong> 실행 시:
            </p>
            <ol className="ml-4 list-inside list-decimal space-y-2">
              <li>
                <code className="rounded bg-white px-2 py-1">layout.tsx</code>
                에서
                <code className="mx-1 rounded bg-white px-2 py-1">
                  fetchTimeWithBrokenCache()
                </code>{" "}
                호출 →{" "}
                <strong className="text-red-600">새로운 axios 요청</strong>
              </li>
              <li>
                같은 함수를 다시 호출하지만 새로운 빈 객체 →{" "}
                <strong className="text-red-600">또 다른 새로운 요청</strong>
              </li>
              <li>
                각 단계마다 총{" "}
                <strong className="text-red-600">6번의 개별 요청</strong> 발생
              </li>
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-purple-900">
            콘솔 확인
          </h2>
          <p className="mb-3 text-gray-700">
            서버 콘솔에서 확인되는 로그 패턴:
          </p>
          <div className="rounded bg-gray-900 p-4 font-mono text-sm text-red-400">
            <div>
              fetchTimeWithBrokenCache 호출됨 {}{" "}
              <span className="text-blue-400">← 1번째 호출</span>
            </div>
            <div>
              fetchTimeWithBrokenCache 호출됨 {}{" "}
              <span className="text-blue-400">← 2번째 호출</span>
            </div>
            <div>
              fetchTimeWithBrokenCache 호출됨 (page) {}{" "}
              <span className="text-blue-400">← 3번째 호출</span>
            </div>
            <div>... (총 6번 호출)</div>
            <div className="mt-2"></div>
            <div>
              layout axios-cache-broken 1: {"{"} currentTime:
              "2024-01-01T12:00:00.123Z" {"}"}
            </div>
            <div>
              layout axios-cache-broken 2: {"{"} currentTime:
              "2024-01-01T12:00:00.456Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
            <div>
              generateMetadata axios-cache-broken 1: {"{"} currentTime:
              "2024-01-01T12:00:00.789Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
            <div>... (모두 다른 시간)</div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-blue-900">
            올바른 해결책
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded bg-white p-4">
              <h3 className="mb-2 font-semibold text-red-600">잘못된 방법</h3>
              <div className="mb-2 rounded bg-gray-100 p-2 font-mono text-xs">
                cache(async (options = {`{}`}) =&gt; ...)
                <br />
                fetchFn({`{}`}) // 매번 새 객체
              </div>
              <ul className="space-y-1 text-sm">
                <li>• 6번의 개별 요청</li>
                <li>• 매번 다른 응답</li>
                <li>• 캐시 효과 없음</li>
              </ul>
            </div>
            <div className="rounded bg-white p-4">
              <h3 className="mb-2 font-semibold text-green-600">올바른 방법</h3>
              <div className="mb-2 rounded bg-gray-100 p-2 font-mono text-xs">
                cache(async () =&gt; ...)
                <br />
                fetchFn() // 매개변수 없음
              </div>
              <ul className="space-y-1 text-sm">
                <li>• 1번의 요청</li>
                <li>• 동일한 응답</li>
                <li>• 정상적인 캐시</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            중요 포인트
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>
              React <code className="rounded bg-white px-2 py-1">cache()</code>
              는<strong> 매개변수의 참조 동일성을 기준으로 캐시 판단</strong>
            </li>
            <li>매번 새로운 객체나 배열을 전달하면 캐시가 무효화됨</li>
            <li>가능한 한 매개변수 없이 사용하거나, 동일한 참조 유지 필요</li>
            <li>단순한 실수로 인해 캐시 효과를 완전히 잃을 수 있음</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default AxiosCacheBrokenTestPage
