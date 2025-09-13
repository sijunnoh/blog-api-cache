import { cache } from "react"

import axios from "axios"
import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// React cache를 사용한 axios 요청 - 정상 동작
const fetchTimeWithCache = cache(async () => {
  console.log("fetchTimeWithCache 호출됨 (page)")
  const response = await axios.get("http://localhost:3000/api/current-time")
  return response.data
})

export const generateMetadata = async (): Promise<Metadata> => {
  const time1 = await fetchTimeWithCache()
  const time2 = await fetchTimeWithCache()

  console.log("generateMetadata axios-cache 1", time1)
  console.log("generateMetadata axios-cache 2", time2)

  return {
    title: "Axios + React Cache 테스트",
    description: "React cache로 감싼 axios는 캐싱이 정상 동작함",
  }
}

const AxiosCacheTestPage = async () => {
  const time1 = await fetchTimeWithCache()
  const time2 = await fetchTimeWithCache()

  console.log("page axios-cache 1", time1)
  console.log("page axios-cache 2", time2)

  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center p-8">
      <div className="mb-6 w-full">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            ← 홈으로 돌아가기
          </Button>
        </Link>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Axios + React Cache 테스트</h1>

      <div className="w-full space-y-6">
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-green-900">
            핵심 개념
          </h2>
          <p className="mb-2 text-gray-700">
            <code className="rounded bg-white px-2 py-1">axios</code>를
            <code className="mx-1 rounded bg-white px-2 py-1">
              React cache()
            </code>
            로 감싸면
            <strong> 캐싱이 정상적으로 동작</strong>합니다.
          </p>
          <p className="text-gray-700">
            동일한 함수 호출은 한 번의 렌더링 사이클 내에서 캐시가 공유됩니다.
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-blue-900">
            구현 방법
          </h2>
          <div className="mb-3 rounded bg-gray-900 p-4 font-mono text-sm text-green-400">
            <div>import {`{ cache }`} from "react"</div>
            <div>import axios from "axios"</div>
            <div className="mt-2"></div>
            <div>const fetchTimeWithCache = cache(async () =&gt; {`{`}</div>
            <div className="ml-4">
              const response = await axios.get("/api/current-time")
            </div>
            <div className="ml-4">return response.data</div>
            <div>{`})`}</div>
          </div>
          <p className="text-sm text-gray-700">
            React의 <code className="rounded bg-white px-1">cache()</code>{" "}
            함수가 axios 호출을 메모이제이션하여 중복 요청을 방지합니다.
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
                  fetchTimeWithCache()
                </code>{" "}
                호출 →{" "}
                <strong className="text-green-600">실제 axios 요청 실행</strong>
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">
                  generateMetadata
                </code>
                에서 동일한 함수 호출 →{" "}
                <strong className="text-green-600">캐시된 결과 반환</strong>
              </li>
              <li>
                <code className="rounded bg-white px-2 py-1">page.tsx</code>에서
                동일한 함수 호출 →{" "}
                <strong className="text-green-600">캐시된 결과 반환</strong>
              </li>
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-orange-900">
            콘솔 확인
          </h2>
          <p className="mb-3 text-gray-700">
            서버 콘솔에서 확인되는 로그 패턴:
          </p>
          <div className="rounded bg-gray-900 p-4 font-mono text-sm text-green-400">
            <div>
              fetchTimeWithCache 호출됨{" "}
              <span className="text-blue-400">← 1번만 실행</span>
            </div>
            <div>
              layout axios-cache 1: {"{"} currentTime:
              "2024-01-01T12:00:00.000Z" {"}"}
            </div>
            <div>
              layout axios-cache 2: {"{"} currentTime:
              "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              generateMetadata axios-cache 1: {"{"} currentTime:
              "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              generateMetadata axios-cache 2: {"{"} currentTime:
              "2024-01-01T12:00:00.000Z" {"}"}{" "}
              <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              page axios-cache 1: {"{"} currentTime: "2024-01-01T12:00:00.000Z"{" "}
              {"}"} <span className="text-yellow-400">← 동일</span>
            </div>
            <div>
              page axios-cache 2: {"{"} currentTime: "2024-01-01T12:00:00.000Z"{" "}
              {"}"} <span className="text-yellow-400">← 동일</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            중요 포인트
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>
              <code className="rounded bg-white px-2 py-1">cache()</code>로
              감싸면
              <strong> 함수 자체가 메모이제이션</strong>됨
            </li>
            <li>
              총 <strong>1번의 실제 axios 요청</strong>만 발생
            </li>
            <li>나머지 5번의 호출은 모두 캐시된 결과 반환</li>
            <li>fetch와 동일한 캐싱 효과를 axios로도 구현 가능</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default AxiosCacheTestPage
