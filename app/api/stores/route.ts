import prismadb from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
	try {
		const {userId} = await auth();
		const body = await req.json();

		const {name} = body;

		if(!userId) {
			return new NextResponse("Unauthorized", {status: 401})
		}

		if(!name) {
			return new NextResponse("Name is required", {status: 401})
		}

		const store = await prismadb.store.create({
			data: {
				name,
				userId
			}
		})

		return NextResponse.json(store);
	} catch (error) {
		console.error("[STORES_POST]", error);
		return new NextResponse("Internal Error", {status: 500})
	}
}