import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';
console.log(1)
function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;

  console.log(filePath)

  return { path:filePath };
}

export default parseEnv();
