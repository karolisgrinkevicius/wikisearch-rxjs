import { join } from 'path';
import css from 'rollup-plugin-css-only'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import html from 'rollup-plugin-fill-html';
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/app.js',
  output: {
    file: join(__dirname, 'public/app.bundle.js'),
    format: 'iife'
  },
  plugins: [
    html({ template: 'src/index.html', filename: 'index.html' }),
    css({ output: join(__dirname, 'public/styles.bundle.css') }),
    nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    babel({ exclude: 'node_modules/**' }),
    uglify(),
    serve('public')
  ]
};
