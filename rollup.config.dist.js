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
import { terser } from "rollup-plugin-terser";

let hash = Math.random().toString(36).slice(-6);
let bundleName = `index.${hash}.js`;

export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: "./dist",
      format: "es",
      assetFileNames: `[name].${hash}[extname]`,
      entryFileNames: `[name].${hash}.js`,
      sourcemap: false,
    },
  ],
  plugins: [
    cleaner({
      targets: [
        './dist/'
      ]
    }),
    babel({ 
      babelHelpers: 'bundled',
      exclude: [ 'node_modules/**' ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment:true
    }),
    peerDepsExternal(),
    node_resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({ tsconfig: "tsconfig.dist.json" }),
    postcss({ plugins: [] }),
    json(),
    copy ({
      targets:[
        { src: "./public/index.html", 
          dest: "./dist",
          transform: (contents, filename) => 
            contents
            .toString()
            .replace('__BUNDLE_SCRIPT__', `${bundleName}`) 
        },
        { 
          src:"./public/favicon.ico",
          dest:"./dist"
        }
      ] 
    }),
    terser()
  ]
};