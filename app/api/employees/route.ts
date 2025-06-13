// app/api/employees/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    await db.collection("employees").insertOne({
      ...body,
      date: today,
    });

    return NextResponse.json({ message: "Created" });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ message: "Creation failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("employee-tracker");

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // "2025-06-13"

    const employees = await db
      .collection("employees")
      .find({ date: todayStr }) // 🟢 Filter by string date
      .toArray();

    return NextResponse.json(
      employees.map((e) => ({
        _id: e._id.toString(),
        name: e.name,
        start: e.start,
        end: e.end || "",
        date: e.date,
      }))
    );
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}
