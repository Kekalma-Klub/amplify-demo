import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import node_resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import replace from '@rollup/plugin-replace';
import serve from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload';

let hash = Math.random().toString(36).slice(-6);
let bundleName = `index.${hash}.js`;

export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: "./build",
      format: "es",
      assetFileNames: `[name].${hash}[extname]`,
      entryFileNames: `[name].${hash}.js`,
      sourcemap: true,
    },
  ],
  plugins: [
    cleaner({
      targets: [
        './build/'
      ]
    }),
    babel({ 
      babelHelpers: 'bundled',
      exclude: [ 'node_modules/**' ]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify('development'),
      preventAssignment:true
    }),
    peerDepsExternal(),
    node_resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({ tsconfig: "tsconfig.dev.json" }),
     postcss({ plugins: [] }),
    json(),
    copy ({
      targets: [
        { 
          src: "./public/index.html", 
          dest: "./build",
          transform: (contents, filename) => 
            contents
            .toString()
            .replace('<!--SCRIPT-->', `<script defer src="${bundleName}"></script>`) 
        },
        { 
          src: "./public/favicon.ico",
          dest:"./build"
        }
      ] 
    }),
    serve({
      host: "localhost",
      port: 3456,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      open: false,
      contentBase: 'build'
    }),
    livereload({
      watch: 'build',
      verbose: true,
      delay: 1500
    })
  ] 
};
