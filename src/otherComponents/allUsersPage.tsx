import React, { useEffect, useState } from 'react';
import { RetSimpleUser } from '../dataInterfaces/music';
import { getAllUsers } from '../service';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    bounder: {
        padding: 10,
        height: 150,
        width: 150,
        display: 'inline-block',
        // border: '1px solid red',
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
});

export const AllUsersPage: React.FC = () => {
    const [users, setUsers] = useState<RetSimpleUser[]>([]);
    const history = useHistory();

    const classes = useStyles({});

    const avatarClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    useEffect(() => {
        getAllUsers((o): void => {
            console.log(o);
            setUsers(o);
        });
    }, []);

    const userElementes = users.map((user: RetSimpleUser, index: number) => {
        return (
            <div key={index} className={classes.bounder}>
                <img
                    onClick={(): void => {
                        avatarClick(user.id);
                    }}
                    src={user.avatarUrl}
                    alt="avatar"
                    className={classes.avatar}
                />
                <div className={classes.name}>
                    <Link
                        onClick={(): void => {
                            avatarClick(user.id);
                        }}
                    >
                        {user.name}
                    </Link>
                </div>
            </div>
        );
    });

    return (
        <div>
            <React.Fragment>{userElementes}</React.Fragment>
        </div>
    );
};
