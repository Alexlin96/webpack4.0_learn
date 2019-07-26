let demo = '我是webpack4,不是webpack3,也不是webpack2';


import image from './images/twoyears.jpg'
import './css/index.scss'
// import style from './css/style.css'

console.log('我是图片地址',image)

let img = new Image(); // 这里可以拿到图片地址
img.src = image;
//img.classList.add(style.img)

const testMap = new Map(
    [
        ['name','alex'],
        ['year','23']
    ]
)
console.log(testMap.get('year'))

document.body.append(img)
console.log(demo);
// window.prompt('我完成了',()=>{
//     console.log('我是alert')
// })