"use client";

import {useStoreModalStore} from '@/hooks/use-store-modal';
import {Modal} from '@/components/ui/modal'

export const StoreModal = () => {
    const storeModal = useStoreModalStore();

    return (
        <Modal
        title='Create Store'
        description='Add a new store to manage products and categories'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        Future Create Store Form
    </Modal>
    )
}