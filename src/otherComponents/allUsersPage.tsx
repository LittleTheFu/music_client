import React, { useEffect, useState } from 'react';
import { SimpleUser } from '../dataInterfaces/music';
import { getAllUsers } from '../service';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    bounder: {
        padding: 20,
        height: 180,
        width: 200,
        display: 'inline-block',
        // border: '1px solid red',
    },
    avatar: {
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 48 * 3,
        width: 48 * 3,
    },
    name: {
        textAlign: 'center',
        fontSize: 30,
    },
});

export const AllUsersPage: React.FC = () => {
    const [users, setUsers] = useState<SimpleUser[]>([]);
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

    const userElementes = users.map((user: SimpleUser, index: number) => {
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
                <div className={classes.name}>{user.name}</div>
            </div>
        );
    });

    return (
        <div>
            <React.Fragment>{userElementes}</React.Fragment>
        </div>
    );
};
