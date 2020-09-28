/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Lyon Software Technologies, Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import path from 'path';
import esbuild from 'esbuild';
import { DEVELOPMENT_ENV } from '../utils/read-env-defs';
import getPackageName from '../utils/get-package-name';
import readConfig from '../utils/read-config';
import readConfigWithCWD from '../utils/read-config-with-cwd';
import readExternals from '../utils/read-externals';

export const OUTPUT_SUFFIX = 'development';

export default async function buildDevelopment(silent = false): Promise<void> {
  const packageName = getPackageName();
  const config = readConfig();
  const configCWD = readConfigWithCWD();
  const externals = readExternals();
  // get outfile
  const outfile = path.resolve(path.join(
    configCWD.outDir,
    `${packageName}.${OUTPUT_SUFFIX}.js`,
  ));
  // run esbuild
  await esbuild.build({
    entryPoints: [
      configCWD.srcFile,
    ],
    outfile,
    bundle: true,
    minify: false,
    platform: 'node',
    sourcemap: true,
    define: {
      ...DEVELOPMENT_ENV,
      'process.env.NODE_ENV': '"development"',
    },
    external: externals,
    target: config.target,
    tsconfig: configCWD.tsconfig,
    jsxFactory: config.jsxFactory,
    jsxFragment: config.jsxFragment,
    logLevel: silent ? 'silent' : undefined
  });
}
