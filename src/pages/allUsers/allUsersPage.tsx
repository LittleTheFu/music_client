import React, { useEffect, useState } from 'react';
import { RetSimpleUser } from '../../common/interface';
import { getAllUsers } from '../../common/service';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { wrapName } from '../../common/common';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'wrap',
    },
});

export const AllUsersPage: React.FC = () => {
    const [users, setUsers] = useState<RetSimpleUser[]>([]);
    const history = useHistory();

    const classes = useStyles({});

    const avatarClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    const avatarClickWrapper = (userId: number) => {
        return (): void => {
            avatarClick(userId);
        };
    };

    useEffect(() => {
        getAllUsers((o): void => {
            // console.log(o);
            setUsers(o);
        });
    }, []);

    return (
        <div className={classes.root}>
            {users.map((user, index) => {
                return (
                    <UserHead
                        key={index}
                        avatar={user.avatarUrl}
                        userName={wrapName(user.id, user.name)}
                        avatarClick={avatarClickWrapper(user.id)}
                    />
                );
            })}
        </div>
    );
};
