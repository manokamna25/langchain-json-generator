import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function POST(req: Request) {
  // ⭐ Jab bhi koi frontend POST request bhejega:
// /api/ask → Next.js automatically creates a Request object and passes it here.
// as here should be cappita; POST HI 
// Next.js sirf capital letter wale keywords ko route handler ke naam ke tarah pehchanta hai:
  try {
    const body = await req.json();
    // “Next.js, jo data frontend se aaya hai (JSON format me), usko JS object bana do.”Because backend / Next.js only understands JavaScript objects, not raw JSON strings.
    const apiResponse = await fetch(`${BACKEND_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await apiResponse.json();
// Backend sends back JSON → but this is also text JSON. Next.js again converts it into JavaScript object
// so that Next.js/frontend can use it.
    return NextResponse.json(data, { status: apiResponse.status });
    // Frontend always expects JSON, not JS object.so convert again in json na 
  } catch (err: any) {
    return NextResponse.json({
      error: "Some error occured",
    });
  }
}


