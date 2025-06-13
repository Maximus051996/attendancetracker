// app/api/employee-master/[id]/route.ts
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Update employee name
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...updateData } = body;

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    await db
      .collection("employee-master")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// Delete employee
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    await db.collection("employee-master").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
