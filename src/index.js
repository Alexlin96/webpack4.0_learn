let demo = '我是webpack4,不是webpack3,也不是webpack2';


import image from './images/twoyears.jpg'
import style from './css/style.css'

let img = new Image();
img.src = image;
img.classList.add(style.img)

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