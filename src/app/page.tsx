"use client"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-5xl">
      <Button onClick={() => alert("Hello World!")}>Hello World!</Button>
      <Button variant="ghost" onClick={() => alert("Hello World!")}>
        Hello World!
      </Button>
      <Button variant="destructive" onClick={() => alert("Hello World!")}>
        Hello World!
      </Button>
      <Button size="lg" onClick={() => alert("Hello World!")}>
        Hello World!
      </Button>
    </div>
  )
}
