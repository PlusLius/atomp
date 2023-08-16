const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')

const getCompoents = () => {
    let allCompoents = []

    const types = ['atoms', 'molecules', 'organisoms']

    types.forEach(type => {
        const allFiles = Fs.readdirSync(`src/${type}`).map(file => ({
            input: `src/${type}/${file}`,
            output: `lib/${file.slice(0, -4) + 'css'}`
        }))
        allCompoents = [
            ...allCompoents,
            ...allFiles
        ]
    })

    return allCompoents
}

const compile = (path, fileName) => {
    const result = Sass.renderSync({
        data: Fs.readFileSync(
            Path.resolve(path)
        ).toString(),
        outputStyle: 'expanded',
        outFile: 'global.css',
        includePaths: [Path.resolve('src')]
    });

    Fs.writeFileSync(
        Path.resolve(fileName),
        result.css.toString()
    )
}

compile('src/global.scss','lib/global.css')

getCompoents().forEach(component => {
    compile(component.input, component.output)
})