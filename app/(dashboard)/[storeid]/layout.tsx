import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/db";
import Navbar from "./_components/navbar";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}
	const store = await prismadb.store.findUnique({
		where: {
			id: params.storeId,
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
