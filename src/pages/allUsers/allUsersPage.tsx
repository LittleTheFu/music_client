import React, { useEffect, useState } from 'react';
import { RetSimpleUser } from '../../common/interface';
import { getAllUsers } from '../../common/service';
// import { makeStyles } from '@material-ui/core/styles';
// 修改后
import { makeStyles } from '@mui/styles';
// 修改前
// import { useHistory } from 'react-router-dom';
// 修改后
import { useNavigate } from 'react-router-dom';
import { wrapName, wrapFunc1 } from '../../common/common';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';
import { getUserDetailUrl } from 'common/routeName';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'wrap',
    },
});

export const AllUsersPage: React.FC = () => {
    const [users, setUsers] = useState<RetSimpleUser[]>([]);
    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

    const classes = useStyles({});

    const avatarClick = (userId: number): void => {
        // 修改前
        // history.push(getUserDetailUrl(userId));
        // 修改后
        navigate(getUserDetailUrl(userId));
    };

    // const avatarClickWrapper = (userId: number) => {
    //     return (): void => {
    //         avatarClick(userId);
    //     };
    // };

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
                        padding={10}
                        key={index}
                        avatar={user.avatarUrl}
                        userName={wrapName(user.id, user.name)}
                        avatarClick={wrapFunc1(avatarClick, user.id)}
                        nameClick={wrapFunc1(avatarClick, user.id)}
                    />
                );
            })}
        </div>
    );
};
