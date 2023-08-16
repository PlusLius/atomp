import React from "react";
import { FontSize } from '@atomp/foundation'

export interface TextProps {
    size?: keyof typeof FontSize,
    children?: React.ReactNode
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
    const className = `atomp-text atomp-text-${size}`;
    return <p className={className}>{children}</p>
}

export default Text