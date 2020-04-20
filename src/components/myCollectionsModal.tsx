import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

interface MyCollectionsModalProps {
    modalOpen: boolean;
    modalClose: () => void;
}

export const MyCollectionsModal: React.FC<MyCollectionsModalProps> = (props: MyCollectionsModalProps) => {
    const { modalOpen, modalClose } = props;

    return (
        <Dialog
            onClose={(): void => {
                modalClose();
                console.log('close');
            }}
            aria-labelledby="simple-dialog-title"
            open={modalOpen}
        >
            hello
        </Dialog>
    );
};
