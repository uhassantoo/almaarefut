"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModalStore } from "@/hooks/use-store-modal";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const router = useRouter();
	const storeModal = useStoreModalStore();

	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			
			const response = await axios.post('/api/stores', values);

			// window.location.assign(`/${response.data.id}`)

			toast.success("Store created.")

			router.refresh()
			router.push(`/${response.data.id}`)
		} catch {
			toast.error("Something went wrong")
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Create Store"
			description="Add a new store to manage products and categories"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel></FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="E-commerce"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									variant={"outline"}
									type="button"
									onClick={storeModal.onClose}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button disabled={loading} type="submit">Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
