'use strict'

class FavAni {
    #WS = `
const canvas = new OffscreenCanvas(32, 32), ctx = canvas.getContext('2d')
let cycleId = null, delay = 500, data = [], f_data = [], currentIndex = 0
function draw(index) {
    if (index < f_data.length) {
        postMessage({type: 'update', dataUrl: f_data[index]})
        cycleId = setTimeout(() => {
            currentIndex = (currentIndex + 1) % data.length
            draw(currentIndex)
        }, delay)
        return
    }
    let d1 = Date.now()
    for (let i = 0; i < data[index].length; i += 3) {
        const num = i / 3
        ctx.fillStyle = '#' + data[index][i] + data[index][i + 1] + data[index][i + 2]
        ctx.fillRect(num % 32, ~~(num / 32), 1, 1)
    }
    canvas.convertToBlob().then(blob => {
        const reader = new FileReader()
        reader.onloadend = () => {
            f_data[index] = reader.result
            postMessage({type: 'update', dataUrl: reader.result})
            let _delay = delay - (Date.now() - d1)
            cycleId = setTimeout(() => {
                currentIndex = (currentIndex + 1) % data.length
                draw(currentIndex)
            }, _delay)
        }
        reader.readAsDataURL(blob)
    });
}
self.onmessage = function (e) {
    if (!e.data.data) return
    clearTimeout(cycleId)
    cycleId = null
    data.length = 0
    f_data.length = 0
    currentIndex = 0
    delay = 500
    e.data.delay && !isNaN(e.data.delay * 1) && (delay = e.data.delay * 1)
    data = e.data.data
    draw(currentIndex)
}`
    #WORKER = null

    constructor() {
        const blob = new Blob([this.#WS], {type: "text/javascript"})
        const url = URL.createObjectURL(blob)
        this.#WORKER = new Worker(url)
    }

    play(arr, delay = 500) {
        if (!this.#WORKER) throw '工作函数未能初始化成功'
        if (!arr || !(arr instanceof Array) || !arr.length || !!arr.find(o => o.length !== 3072))
            throw '播放内容必须为一维数组，且每项必须为3072长度'
        this.#WORKER.onmessage = function (e) {
            if (e.data.type === 'update') {
                let link = document.querySelector("link[rel*='icon']")
                let hasLink = !!link
                hasLink || (link = document.createElement('link'))
                link.type = "image/x-icon"
                link.rel = "shortcut icon"
                link.href = e.data['dataUrl'] + ''
                !hasLink && document.head.appendChild(link)
            }
        }
        this.#WORKER.postMessage({data: arr, delay: delay})
    }
}
