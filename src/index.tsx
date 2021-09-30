// src/index.tsx
import ReactDom from 'react-dom'
import React from 'react';
import math from "./math";

console.log(math.plus(Array.from({ length: 10 }, (v, i) => i)));

function renderArgsAfter1Min(...args: string[] | number[]) {
    return new Promise<void>((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(console.log(args))
            }, 2000)
        } catch (e) {
            reject(e)
        }
    })
}

function App() {
    const [a, b] = ['a', 'b'];
    renderArgsAfter1Min('2초후에 나타납니다.')
    return <div>{`${a} & ${b}`}</div>
}

ReactDom.render(<App/>, document.getElementById('root'))