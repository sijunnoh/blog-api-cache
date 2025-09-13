import { PropsWithChildren } from "react"

export const dynamic = "force-dynamic"

const Layout = async ({ children }: PropsWithChildren) => {
  console.log("Layout is rendering")

  const timeResponse = await fetch("http://localhost:3000/api/current-time")
  const timeResponse2 = await fetch("http://localhost:3000/api/current-time")

  const time1 = await timeResponse.json()
  const time2 = await timeResponse2.json()

  console.log("layout fetch 1", time1)
  console.log("layout fetch 2", time2)

  return <div className="flex flex-1">{children}</div>
}
export default Layout
