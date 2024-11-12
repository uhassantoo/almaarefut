import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import prismadb from "@/lib/prismadb";
export default async function SetupLayout({
    children
}:{
    children : React.ReactNode;
}
) {
    const { userId } = useAuth()

    if (!userId){
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where: {
            id : params.storeId,
            userId
        }
    })
    if (store){
        redirect(`/${store.id}`);
    }

    return (
        <>
        {children}
        </>
    )
}