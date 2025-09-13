import { PropsWithChildren } from "react"
import { cache } from "react"

import axios from "axios"

export const dynamic = "force-dynamic"

// React cache를 잘못 사용 - 매번 새로운 빈 객체를 전달하여 캐시 무효화
const fetchTimeWithBrokenCache = cache(async (options = {}) => {
  console.log("fetchTimeWithBrokenCache 호출됨", options)
  const response = await axios.get("http://localhost:3000/api/current-time")
  return response.data
})

const Layout = async ({ children }: PropsWithChildren) => {
  console.log("axios-cache-broken-test Layout is rendering")

  // 매번 새로운 빈 객체를 전달 - 참조가 다르므로 캐시 미스
  const time1 = await fetchTimeWithBrokenCache({})
  const time2 = await fetchTimeWithBrokenCache({})

  console.log("layout axios-cache-broken 1", time1)
  console.log("layout axios-cache-broken 2", time2)

  return <div className="flex flex-1">{children}</div>
}
export default Layout
