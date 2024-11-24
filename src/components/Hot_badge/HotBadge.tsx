'use client';

import React, { FC } from 'react';
import './HotBadge.css';

interface IHotBadgeProps {
    rating: number;
}

const HotBadge: FC<IHotBadgeProps> = ({ rating }) => {

    if (rating > 7.5) {
        return <div className="hot-badge">HOT</div>;
    }
    return null;
};

export default HotBadge;