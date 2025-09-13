"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Next.js API 캐싱 동작 분석</h1>
        <p className="mb-8 text-lg text-gray-600">
          fetch, axios, React cache의 캐싱 동작을 비교하고 분석하는 테스트 환경
        </p>
      </div>

      <div className="mb-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">
            기본 캐싱 테스트
          </h2>
          <div className="space-y-3">
            <Link href="/fetch-test" className="block">
              <Button
                size="lg"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Fetch 캐싱 테스트
              </Button>
            </Link>
            <Link href="/axios-test" className="block">
              <Button
                size="lg"
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                Axios 캐싱 테스트
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Next.js fetch 자동 캐싱 vs Axios 기본 동작 비교
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-green-900">
            React Cache 테스트
          </h2>
          <div className="space-y-3">
            <Link href="/axios-cache-test" className="block">
              <Button
                size="lg"
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                Axios + React Cache 정상 사용
              </Button>
            </Link>
            <Link href="/axios-cache-broken-test" className="block">
              <Button
                size="lg"
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
              >
                Axios + React Cache 잘못된 사용
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            React cache() 올바른 사용 vs 매개변수 참조 문제
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          캐싱 동작 비교표
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  방법
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  요청 횟수
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                  캐싱 여부
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  특징
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3">
                  <span className="font-medium text-blue-600">
                    fetch (Next.js)
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                    1회
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="font-medium text-green-600">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  자동 캐싱, 동일한 응답
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">
                  <span className="font-medium text-red-600">axios 단독</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                    6회
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="font-medium text-red-600">✗</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  캐싱 없음, 매번 다른 응답
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3">
                  <span className="font-medium text-green-600">
                    axios + cache()
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                    1회
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="font-medium text-green-600">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  React cache 적용, 동일한 응답
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">
                  <span className="font-medium text-yellow-600">
                    axios + cache({`{}`})
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                    6회
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className="font-medium text-red-600">✗</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  참조 변경으로 캐시 무효화
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">
          테스트 가이드
        </h3>
        <ol className="list-inside list-decimal space-y-2 text-gray-700">
          <li>브라우저 개발자 도구에서 Network 탭과 Console 탭을 열어두세요</li>
          <li>각 테스트 페이지로 이동하여 요청 패턴을 관찰하세요</li>
          <li>서버 콘솔 로그에서 실제 API 호출 횟수를 확인하세요</li>
          <li>페이지 새로고침 후 다시 테스트하여 동작을 재확인하세요</li>
        </ol>
      </div>
    </div>
  )
}
