import React from 'react'
import ReactDOM from 'react-dom'

import { Text, Margin, Select } from '@atomp/react'
import '@atomp/scss/lib/Utilities.css'
import '@atomp/scss/lib/Text.css'
import '@atomp/scss/lib/Margin.css'
import '@atomp/scss/lib/Select.css'
import '@atomp/scss/lib/global.css'

const options = [{
    label: 'Strict Black',
    value: 'strict-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

ReactDOM.render(
    <div style={{padding: '40px'}} >
        <Select options={options} />
    </div>,
    document.querySelector('#root')
)