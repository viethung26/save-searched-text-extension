// chrome.commands
function renderView() {
    chrome.storage.sync.get('text', data => {
        let html = ""
        if (!data.text) {
            chrome.storage.sync.get("recycleBin", data => {
                if (data.recycleBin) {
                    root.innerHTML = "<div class='center'><button id='revert'>Revert</button></div>"
                } else {
                    root.innerHTML = "<p id='empty'><i>empty</i></p>"
                }
            })
        } else {
            let wordObject = {}
            const words = data.text.split(",")
            words.forEach(w => {
                if (w in wordObject) {
                    wordObject[w] = wordObject[w] + 1
                } else {
                    wordObject[w] = 1
                }
            })
            Object.entries(wordObject).sort((item, item2) => {
                return item2[1] - item[1]
            }).forEach(item => {
                html += `<div class="row"><div class="col-1">${item[0]}</div><div class="col">${item[1]}</div><div class="col" data-delete="${item[0]}">&times;</div></div><hr/>`
            })
            html += `<div class='center'><button id="clear">Clear</button></div>`
            root.innerHTML = html
        }
    })
}

function revertStorage() {
    chrome.storage.sync.get("recycleBin", data => {
        chrome.storage.sync.set({text: data.recycleBin})
        chrome.storage.sync.remove("recycleBin")
    })
}
function clearStorage() {
    chrome.storage.sync.get("text", data => {
        chrome.storage.sync.set({recycleBin: data.text})
        chrome.storage.sync.remove("text")
    })
}
function removeTextFromStorage(removeText) {
    chrome.storage.sync.get('text', data => {
        console.log(9779, data.text)
        const words = data.text.split(",")
        const newWords = words.filter(w => w !== removeText).join(",")
        chrome.storage.sync.set({text: newWords})
    })
}

renderView()

root.addEventListener("click", e => {
    const target = e.target
    const removeText = target.getAttribute("data-delete")
    if (removeText) {
        const parent = target.parentNode
        const nextSibling = parent.nextSibling
        root.removeChild(parent)
        if (nextSibling.tagName === "HR") {
            root.removeChild(nextSibling)
        }
        removeTextFromStorage(removeText)
    } else if (target.id === "clear") {
        clearStorage()
        setTimeout(() => {
            renderView()
        }, 100)
    } else if (target.id === 'revert') {
        revertStorage()
        setTimeout(() => {
            renderView()
        }, 100)
    }
})