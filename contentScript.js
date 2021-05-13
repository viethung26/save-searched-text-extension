const validRegex = /(\w|\d|\s){2,}/i
window.onload = () => {
    document.body.addEventListener("dblclick", e => {
        let text = document.getSelection().toString().trim().toLowerCase()
        if (text && validRegex.test(text)) {
            console.log(9779, text)
            chrome.storage.sync.get("text", data => {
                let newText = (data.text||"").concat() + (data.text ? "," : "")+ text
                chrome.storage.sync.set({text: newText})
            })
        }
        
    })
    window.addEventListener("keydown", e => {
        console.info('9779 e', e)
    })
    
}