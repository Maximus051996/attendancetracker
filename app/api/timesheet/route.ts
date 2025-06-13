import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
      return NextResponse.json(
        { message: "Date is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    const records = await db
      .collection("employees")
      .find({ date }) // match by exact date
      .toArray();

    const cleaned = records.map((e) => ({
      _id: e._id.toString(),
      name: e.name,
      start: e.start,
      end: e.end || "",
    }));

    return NextResponse.json(cleaned);
  } catch (err) {
    console.error("GET timesheet error:", err);
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}
