import React from 'react';
import '@/components/User_Info/user_info.css'

const UserInfo = () => {
    return (
        <div className="user-info">
            <div className="user-avatar">
                <div className="avatar-circle">
                    <div className="avatar-circle-2"></div>
                </div>

            </div>
            <span className="user-name">ROBEENSS
            <p>My profile</p>
            </span>
        </div>
    );
};

export default UserInfo;