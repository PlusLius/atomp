import React from "react";
import { Spacing } from '@atomp/foundation'

interface MarginProps {
    space?: keyof typeof Spacing,
    children?: React.ReactNode,
    left?: Boolean,
    right?: Boolean,
    top?: Boolean,
    bottom?: Boolean
}

const Margin: React.FC<MarginProps> = ({ space = 'xxxs', children, left, right, top, bottom }) => {
    let className = ``

    if(!left && !right && !top && !bottom){
        className = `atomp-margin-${space}`
    }

    if(left){
        className = `${className} atomp-margin-left-${space}`
    }
    if(right){
        className = `${className} atomp-margin-right-${space}`
    }
    if(top){
        className = `${className} atomp-margin-top-${space}`
    }
    if(bottom){
        className = `${className} atomp-margin-bottomff-${space}`
    }

    return <div className={className} >
        {children}
    </div>
}

export default Margin