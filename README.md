# Favicon-Animation
🍭 让你的网站图标ICON动起来  
🍭 Make your website favicon to play

## 安装
使用 script 标签:
```
<script src="fav_ani.js"></script>
```

## 快速开始
初始化一个FavAni对象：
```js
const fa = new FavAni()
```
初始化需要播放的内容：
```js
// icon图标大小 32 * 32
// 每个像素点用3位16进制数据标识 example #a3b4c5 -> abc
// 因此每项为 32 * 32 * 3 = 3072长度
const arr = [
    'string1',
    'string2',
    'string3',
    '...'
]
// 指定每帧画面的间隔时间
const delay = 500
```
让浏览器图标动起来：
```js
// 该对象只有一个函数，将播放内容，指定帧数传入该函数，执行播放
fa.play(arr, delay)
```

## 其他
**项目演示链接: [https://zzone.cc/backstage](https://zzone.cc/backstage)** 

**联系作者: 85160581@qq.com** 
