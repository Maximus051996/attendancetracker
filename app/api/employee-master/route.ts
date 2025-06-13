// app/api/employee-master/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    await db.collection("employee-master").insertOne({
      name: body.name,
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

    const employees = await db.collection("employee-master").find().toArray();

    return NextResponse.json(
      employees.map((e) => ({
        _id: e._id.toString(),
        name: e.name,
      }))
    );
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}
