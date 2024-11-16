import prismadb from "@/lib/db";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SettingsForm from "./_components/settings-form";

interface SettingsPageProps {
	params: Promise<{storeId: string}>;
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
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
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
