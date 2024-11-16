import prismadb from "@/lib/db";

interface DashboardPageProps {
	params: Promise<{storeId: string}>;
}

const DashboardPage = async ({
	params
}: DashboardPageProps) => {
	const storeId = (await params).storeId;

	const store = await prismadb.store.findUnique({
		where: {
			id: storeId,
		}
	})
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;