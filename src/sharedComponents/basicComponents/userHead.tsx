import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

interface BoundProps {
    size: number;
}

const useStyles = makeStyles(() =>
    createStyles({
        bounder: {
            padding: 0,
            height: (props: BoundProps): number => props.size,
            width: (props: BoundProps): number => props.size,
            border: '2px solid #000',

            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        avatar: {
            borderRadius: '50%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: (props: BoundProps): number => props.size * 0.8,
            width: (props: BoundProps): number => props.size * 0.8,
        },
        name: {
            textAlign: 'center',
            fontSize: (props: BoundProps): number => props.size * 0.2,
        },
    }),
);

interface UserHeadProps {
    userName: string;
    avatar: string;
    size?: number;

    avatarClick?: () => void;
    nameClick?: () => void;
}

export const UserHead: React.FC<UserHeadProps> = (props: UserHeadProps) => {
    const { userName, avatar, avatarClick, nameClick, size } = props;
    const classes = useStyles({ size: size });

    return (
        <div className={classes.bounder}>
            <img
                onClick={(): void => {
                    avatarClick?.();
                }}
                src={avatar}
                alt="avatar"
                className={classes.avatar}
            />

            <div className={classes.name}>
                {nameClick ? (
                    <Link
                        onClick={(): void => {
                            nameClick();
                        }}
                    >
                        {userName}
                    </Link>
                ) : (
                    <div>{userName}</div>
                )}
            </div>
        </div>
    );
};

UserHead.defaultProps = {
    size: 150,
};
