import prismadb from "@/lib/db";

interface DashboardProps {
	params: {storeId: string}
}

const DashboardPage = async ({
	params
}: DashboardProps) => {
	const store = await prismadb.store.findUnique({
		where: {
			id: params.storeId,
		}
	})
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;