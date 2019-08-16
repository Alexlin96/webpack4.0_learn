import image from './images/twoyears.jpg'
import './css/index.scss'
import { cut } from './mudule/option'
// import style from './css/style.css'

cut(10,5)

let demo = '我是webpack4,不是webpack3,也不是webpack2';

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

function p1(type) {
    return new Promise((resolve,reject)=>{
        if(type) {
            resolve(1)
        }else{
            reject(0)
        }
    })   
}
p1(1).then((res)=>{
    console.log('成功',res)
}).catch((err)=>{
    console.log('失败',err)
})

class Parent{
    constructor(){
        this.name = 'alex';
    }
    callName(){
        this.callAge();
        
    }
    callAge(){
        console.log('namesss',this.name);
    }
}
class Children extends Parent{
    constructor(){
        super();
        this.name = 'jay';
    }
    callName(){  // 重新覆盖继承父类的方法
        console.log('children-name',this.name);
    }
}
new Children().callName()

let [alex, jay, jjlin] = ['james', 'macklog', 'finding'];

console.log('我是jjlin',jjlin)

// // window.prompt('我完成了',()=>{
// //     console.log('我是alert')
// // })

