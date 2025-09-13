import { PropsWithChildren } from "react"
import { cache } from "react"

import axios from "axios"

export const dynamic = "force-dynamic"

// React cache를 사용한 axios 요청 - 정상 동작
const fetchTimeWithCache = cache(async () => {
  console.log("fetchTimeWithCache 호출됨")
  const response = await axios.get("http://localhost:3000/api/current-time")
  return response.data
})

const Layout = async ({ children }: PropsWithChildren) => {
  console.log("axios-cache-test Layout is rendering")

  const time1 = await fetchTimeWithCache()
  const time2 = await fetchTimeWithCache()

  console.log("layout axios-cache 1", time1)
  console.log("layout axios-cache 2", time2)

  return <div className="flex flex-1">{children}</div>
}
export default Layout
