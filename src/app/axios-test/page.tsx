import axios from "axios"
import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const generateMetadata = async (): Promise<Metadata> => {
  const timeResponse = await axios.get("http://localhost:3000/api/current-time")
  const timeResponse2 = await axios.get(
    "http://localhost:3000/api/current-time"
  )

  const time1 = timeResponse.data
  const time2 = timeResponse2.data

  console.log("generateMetadata axios 1", time1)
  console.log("generateMetadata axios 2", time2)

  return {
    title: "Axios 캐싱 테스트",
    description: "Axios는 Next.js의 자동 캐싱이 적용되지 않음",
  }
}

const AxiosTestPage = async () => {
  const timeResponse = await axios.get("http://localhost:3000/api/current-time")
  const timeResponse2 = await axios.get(
    "http://localhost:3000/api/current-time"
  )

  const time1 = timeResponse.data
  const time2 = timeResponse2.data

  console.log("page axios 1", time1)
  console.log("page axios 2", time2)

  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center p-8">
      <div className="mb-6 w-full">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            ← 홈으로 돌아가기
          </Button>
        </Link>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Axios 캐싱 테스트</h1>

      <div className="w-full space-y-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-red-900">
            핵심 차이점
          </h2>
          <p className="mb-2 text-gray-700">
            <code className="rounded bg-white px-2 py-1">axios</code>를 사용하면
            <strong> Next.js의 자동 캐싱이 적용되지 않습니다</strong>.
          </p>
          <p className="text-gray-700">
            매번 새로운 HTTP 요청이 발생하여 서로 다른 시간이 반환됩니다.
          </p>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-orange-900">
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
                  axios.get("/api/current-time")
                </code>{" "}
                호출 → <strong className="text-red-600">새로운 요청</strong>
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">
                  generateMetadata
                </code>
                에서 동일한 URL axios 요청 →{" "}
                <strong className="text-red-600">또 다른 새로운 요청</strong>
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">page.tsx</code>에서
                동일한 URL axios 요청 →{" "}
                <strong className="text-red-600">또 다른 새로운 요청</strong>
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
              layout axios 1: {"{"} currentTime: "2024-01-01T12:00:00.123Z"{" "}
              {"}"}
            </div>
            <div>
              layout axios 2: {"{"} currentTime: "2024-01-01T12:00:00.456Z"{" "}
              {"}"} <span className="text-red-400">← 다름!</span>
            </div>
            <div>
              generateMetadata axios 1: {"{"} currentTime:
              "2024-01-01T12:00:00.789Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
            <div>
              generateMetadata axios 2: {"{"} currentTime:
              "2024-01-01T12:00:01.012Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
            <div>
              page axios 1: {"{"} currentTime: "2024-01-01T12:00:01.345Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
            <div>
              page axios 2: {"{"} currentTime: "2024-01-01T12:00:01.678Z" {"}"}{" "}
              <span className="text-red-400">← 다름!</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            중요 포인트
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>
              <code className="rounded bg-white px-2 py-1">axios</code>는
              <strong> 기본적으로 캐싱이나 요청 중복 제거를 하지 않음</strong>
            </li>
            <li>
              총 <strong>6번의 개별 HTTP 요청</strong>이 발생 (layout 2번 +
              metadata 2번 + page 2번)
            </li>
            <li>
              매 호출마다 새로운 HTTP 요청이 발생하여 네트워크 오버헤드 증가
            </li>
            <li>
              캐싱이 필요한 경우 React cache() 또는 별도 캐싱 로직 구현 필요
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default AxiosTestPage
