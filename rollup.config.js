import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import fg from 'fast-glob'

const dev = process.env.NODE_ENV === 'development'
const dir = dev ? 'dist' : 'public'

export default {
  input: 'src/js/index.js',
  output: {
    file: `${dir}/nuclear-fusion.min.js`,
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    dev && {
      name: 'watch-external',
      async buildStart() {
        const files = await fg('src/**/*', '!src/**/*.js')
        for (let file of files) {
          this.addWatchFile(file)
        }
      },
    },
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
    }),
    del({
      targets: `${dir}/*`,
      runOnce: true,
      verbose: true,
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: `${dir}` },
        { src: 'src/images/**/*', dest: `${dir}/images` },
        { src: 'src/css/**/*', dest: `${dir}/css` },
        { src: 'src/fonts/**/*', dest: `${dir}/fonts` },
      ],
    }),
    nodeResolve({
      extensions: ['.js'],
    }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      compact: true,
    }),
    commonjs(),
    json({ compact: true }),
    !dev && terser(),
    dev &&
      serve({
        contentBase: 'dist',
        historyApiFallback: true,
      }),
    dev && livereload({ watch: ['dist'], delay: 500 }),
  ],
}
