import React from 'react';
import '@/css/user_info.css'

const UserInfo = () => {
    return (
        <div className="user-info">
            <div className="user-avatar">
                {/* Это маленький круг, который можно стилизовать через CSS */}
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