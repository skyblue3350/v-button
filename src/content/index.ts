
const sounds = document.getElementsByClassName('sounds')

for(let index=0; index<sounds.length; index++) {
    sounds[index].addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLElement
        const audioId = target.dataset.file
        
        chrome.storage.local.get(['delay', 'enabled'], (value) => {
            // 有効でない場合、自動再生しない
            if (!value.enabled) {
                return
            }

            // 有効な場合、delay後に再生
            document.getElementById(audioId).onended = (event) => {
                setTimeout(() => {
                    const e = document.createEvent('HTMLEvents')
                    e.initEvent('click', true, true)
                    sounds[Math.floor(Math.random()*sounds.length)].dispatchEvent(e)
                }, value.delay)
            }
        })
    })
}