export async function GET() {
  console.log("Current time API is being called")

  return Response.json({
    currentTime: new Date().toISOString(),
  })
}
