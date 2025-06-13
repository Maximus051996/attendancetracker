// app/api/employees/[id]/route.ts
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// PUT /api/employees/[id] - Update employee
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // ❗️Exclude _id to prevent immutable field error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...updateData } = body;

    const client = await clientPromise;
    const db = client.db("employee-tracker");

    await db
      .collection("employees")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/employees/[id] - Delete employee
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("employee-tracker");

    await db
      .collection("employees")
      .deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
