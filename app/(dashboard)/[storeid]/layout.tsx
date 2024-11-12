import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/db";

export default async function DashboardLayout({
    children,
    params

}: {
    children: React.ReactNode;
    params : { storeId: string
}
}) {
    const { userId } = useAuth();
    if (!userId){
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where: {
            id : params.storeId,
            userId
        }
    });

    if (!store){
        redirect('/')
    }
    return (
        <>
        <div> This will be a Navbar
        </div>
            </>
    )


     }