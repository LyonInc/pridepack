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
import fs from 'fs-extra';
import { CompilerOptions, TypeAcquisition } from 'typescript';
import readConfig from './read-config';

export interface TsConfig {
  compilerOptions: CompilerOptions;
  exclude: string[];
  compileOnSave: boolean;
  extends: string;
  files: string[];
  include: string[];
  typeAcquisition: TypeAcquisition;
}

let TSCONFIG: Partial<TsConfig>;

export function getTSConfigPath(): string {
  return path.resolve(path.join(process.cwd(), readConfig().tsconfig));
}

export default async function readTSConfig(): Promise<Partial<TsConfig>> {
  if (TSCONFIG) {
    return TSCONFIG;
  }
  
  // Read config
  TSCONFIG = await fs.readJson(getTSConfigPath()) as Partial<TsConfig>;

  return TSCONFIG;
}
