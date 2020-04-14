import React, { useState, useEffect } from 'react';
import { useGlobal, useDispatch } from 'reactn';
import { getDetail } from 'service';
import { UserDetail } from '../dataInterfaces/music';
import Button from '@material-ui/core/Button';
import { followUser } from '../service';

export const UserDetailPage: React.FC = () => {
    const [currentClickUserId] = useGlobal('currentClickUserId');
    const [detail, setDetail] = useState<UserDetail>(null);

    useEffect(() => {
        console.log(detail);
        getDetail(
            currentClickUserId,
            o => {
                setDetail(o);
                console.log(o);
            },
            console.log,
        );
    }, []);

    const followClick = (): void => {
        followUser(currentClickUserId, console.log, console.log);
    };

    return (
        <div>
            {detail ? (
                <div>
                    ------{detail.name}--
                    <img src={detail.avatarUrl} alt="avatar" />
                    <Button onClick={followClick} variant="contained" color="primary">
                        follow
                    </Button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
