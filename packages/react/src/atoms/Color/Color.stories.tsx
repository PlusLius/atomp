import React from 'react'
import Color from './Color'
import { text, select } from '@storybook/addon-knobs'

import { Spacing } from '@atomp/foundation'


// css
import '@atomp/scss/lib/Utilities.css'

export default {
    title: 'Atoms|Color'
}

export const Common = () => <Color hexCode={text('HexCode', 'pink')} />
const width = select('Width', Object.values(Spacing), 'xxl') as  keyof typeof Spacing
const height = select('Height', Object.values(Spacing), 'xxl') as  keyof typeof Spacing
export const CustomDimensions = () => <Color
hexCode={text('HexCode', 'pink')}
width={width}
height={height}  />
