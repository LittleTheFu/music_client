// 修改前
// import { Button } from '@material-ui/core';
// import Delete from '@material-ui/icons/Delete';

// 修改后
import { Button } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    clickDelete: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
    const { clickDelete } = props;
    return (
        <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                e.stopPropagation();
                clickDelete(e);
            }}
        >
            <DeleteIcon></DeleteIcon>
        </IconButton>
    );
};
