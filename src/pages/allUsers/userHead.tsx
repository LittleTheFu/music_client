import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() =>
    createStyles({
        bounder: {
            padding: 10,
            height: 150,
            width: 150,
        },
        avatar: {
            borderRadius: '50%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 120,
            width: 120,
        },
        name: {
            textAlign: 'center',
            fontSize: 30,
        },
    }),
);

interface UserHeadProps {
    userName: string;
    avatar: string;

    avatarClick: () => void;
}

export const UserHead: React.FC<UserHeadProps> = (props: UserHeadProps) => {
    const classes = useStyles({});

    const { userName, avatar, avatarClick } = props;

    return (
        <div className={classes.bounder}>
            <img
                onClick={(): void => {
                    avatarClick();
                }}
                src={avatar}
                alt="avatar"
                className={classes.avatar}
            />
            <div className={classes.name}>
                <Link
                    onClick={(): void => {
                        avatarClick();
                    }}
                >
                    {userName}
                </Link>
            </div>
        </div>
    );
};
