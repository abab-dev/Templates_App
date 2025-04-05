import { GenerateEmailTemplate } from "@/config/AIModel"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { prompt, userEmail, tId } = await req.json()
  try {
    const result = await GenerateEmailTemplate.sendMessage(prompt)
    const AIResponse = result.response.text()
    return NextResponse.json({ data: AIResponse })
  } catch (e) {
    return NextResponse.json({ error: e })
  }
}
