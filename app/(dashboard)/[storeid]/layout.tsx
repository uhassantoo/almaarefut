import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/db";
import Navbar from "./_components/navbar";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ storeId: string }>;
}) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const storeId = (await params).storeId;

	const store = await prismadb.store.findUnique({
		where: {
			id: storeId,
			userId,
		},
	});

	if (!store) {
		redirect("/");
	}
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
