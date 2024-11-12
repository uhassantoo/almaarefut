import { redirect, useParams } from "next/navigation";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export default async function SetupLayout({
    children
}:{
    children : React.ReactNode;
}
) {
    const params = useParams()
    const { userId } = await auth()

    if (!userId){
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where: {
            // id : params.storeId,
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