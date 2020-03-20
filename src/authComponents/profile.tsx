import React from 'react';
import { useGlobal } from 'reactn';

export const ProfilePage: React.FC = () => {
    const [userId] = useGlobal('userId');

    return <h1>Name : {userId}</h1>;
};
