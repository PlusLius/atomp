const Ts = require('rollup-plugin-typescript2')

module.exports = {
    input: [
        'src/index.ts',
        'src/atoms/Color/index.ts',
        'src/atoms/Margin/index.ts',
        'src/molecules/Select/index.ts'
    ],
    output: {
        dir: 'lib',
        format: 'esm',
        sourcemap: true,
        preserveModules: true
    },
    plugins: [Ts()],
    external: ['react','@atomp/foundation']
}