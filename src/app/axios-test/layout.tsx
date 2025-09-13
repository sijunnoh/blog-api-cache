import { PropsWithChildren } from "react"

import axios from "axios"

export const dynamic = "force-dynamic"

const Layout = async ({ children }: PropsWithChildren) => {
  console.log("axios-test Layout is rendering")

  const timeResponse = await axios.get("http://localhost:3000/api/current-time")
  const timeResponse2 = await axios.get(
    "http://localhost:3000/api/current-time"
  )

  const time1 = timeResponse.data
  const time2 = timeResponse2.data

  console.log("layout axios 1", time1)
  console.log("layout axios 2", time2)

  return <div className="flex flex-1">{children}</div>
}
export default Layout
