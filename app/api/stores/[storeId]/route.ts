import prismadb from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{
		params,
	}: {
		params: {
			storeId: string;
		};
	}
) {
	try {
		const { userId } = await auth();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await prismadb.store.update({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name
			}
		});

		if (!store) {
			return new NextResponse("store not found", { status: 400 });
		}

		return NextResponse.json(store)
	} catch (error) {
		console.log("[STORE_PATCH]", error);
	}
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: {
			storeId: string;
		};
	}
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await prismadb.store.delete({
			where: {
				id: params.storeId,
				userId,
			}
		});

		if (!store) {
			return new NextResponse("Store not found", { status: 400 });
		}

		return NextResponse.json(store)
	} catch (error) {
		console.log("[STORE_DELETE]", error);
	}
}
