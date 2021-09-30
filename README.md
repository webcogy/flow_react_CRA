# CRA환경 직접 구현해보기 (모든 기능을 구현하진 않음)

#### webpack, babel, tsconfig 셋팅하면서 사용 가능해지는 요소를 확인하는 것이 핵심

참고 : https://milban.dev/[%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95]%20CRA%ED%99%98%EA%B2%BD%20%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0/

1. 필요한 devDependecies 설치
2. 발전된 언어들의 문법을 브라우저가 이해할 수 있도록 변환해주기.
3. ES6+
4. Typescript
5. 개발서버 구축하기

## 1. 필요한 devDependecies 설치

### package.json 생성 -> webpack 설치 -> 번들 -> 번들 확인

#### 셋팅 전 초기폴더 구조

```
- your project directory
|- src
  |- index.js
  |- math.js
|- index.html
```

```
// package.json 생성
npm init -y

// webpack 설치
npm i -D webpack webpack-cli

// dist 폴더에 번들하기 (dist/main.js 생성됨)
npx webpack
```

#### 셋팅 후 폴더 구조

```
//
- your project dir
|- dist // webpack 실행시 생성
  |- main.js // webpack 실행시 생성
  |- index.html // 번들확인을 위해 직접 생성 (콘솔창에 '45' 출력 확인)
|- src
  |- index.js
  |- math.js
|- index.html
|- package.json
```

## 2. 발전된 언어들의 문법을 브라우저가 이해할 수 있도록 변환해주기.

#### 1) React, JSX, ES6

React와 JSX, ES6문법을 사용하기 위해서는 Babel을 이용해 컴파일을 해 주어야 합니다.

#### 2) Babel 사용에 필요한 모듈

- @babel/core
- @babel/cli

#### 3) React와 JSX, ES6 컴파일에 필요한 모듈

- @babel/preset-react
- @babel/preset-env

#### 4) React 사용에 필요한 모듈

- react
- react-dom

```
// 위의 내용 모두 설치
npm i react react-dom
npm i -D @babel/core @babel/cli @babel/preset-react @babel/preset-env
```

#### STEP 1] babel.config.json 파일을 생성하고 Babel에게 아래와 같이 preset을 사용한다고 알려줌.

```json
// babel.config.json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

#### STEP 2] index.js -> index.jsx 로 변경

#### STEP 3] webpack.config.js 생성해서 webpack 번들과정에서 babel을 함께 실행하도록 설정

```
npm i -D babel-loader
```

```
// webpack.config.js
const path = require('path');

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
}

[1] entry
bundle과정을 시작할 파일을 설정하는 곳입니다. 우리는 ./src/index.jsx 를 시작점으로 설정했습니다.

[2] output
bundle된 파일을 어디에 어떤 이름으로 출력할지 설정하는 곳입니다.

[3] module
bundle에 사용될 loader를 설정하는 곳입니다. test 는 loader를 적용할 file들을 설정하는 곳입니다. 우리는 .js와 .jsx파일을 타겟으로 설정해줬습니다. exclude는 loader를 적용하지 않을 file을 설정하는 곳입니다. node_modules안에 있는 .js와 .jsx파일들을 loader가 적용되지 않습니다. use는 사용할 loader를 설정하는 곳입니다.
```

#### webpack 실행 ( dist/index.bundle.js 생성됨 )

```
npx webpack --mode development
```

#### dist/index.html 내용 수정해 브라우저에서 결과 확인 ( 화면에 'a & b' 출력됨 )

## 3. ES6+

Promise, WeakMap, Array.from, Object.assign과 같은 ES6+문법을 브라우저(라고 쓰고 IE라고 읽습니다.)에 이해시키기 위해서는 polyfill을 추가해줘야합니다.
polyfill 을 사용하기 위해서는 core-js@2 혹은 core-js@3 이 필요합니다. core-js@2를 설치하고 babel.config.json에 설정해줍니다.

```
npm i core-js@2
```

#### 설치 후 바벨로더에 내용 추가

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 2
        }
      }
    ],
    "@babel/preset-react"
  ]
}
```

## 4. Typescript

```
npm i -D typescript ts-loader @types/react-dom @types/react
```

#### tsconfig.json 생성 -> webpack.config.js 내용 변경 -> index.jsx 확장자를 tsx로 변경

## 5. 개발서버 구축하기

```
npm i -D webpack-dev-server html-webpack-plugin
```

#### webpack.config.js 내용 변경-> index.html 변경

```
npx webpack-dev-server
```
