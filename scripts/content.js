

function editNode(node) {
    console.log(node)

    observer.disconnect()
    const episodeNameSelector = node.querySelector('h4 > a') ?? { innerHTML: "" }
    const episodeImageSelector = node.querySelector('picture > img') ?? { src: "" }


    episodeImageSelector.src = "https://t2.ea.ltmcdn.com/es/posts/8/9/2/nombres_graciosos_para_perros_pequenos_23298_3_600.jpg"
    const nextEpisode = episodeNameSelector.innerHTML.split("-")?.[0] || ""
    episodeNameSelector.innerHTML = "Next episode: " + nextEpisode
}



const observer = new MutationObserver((mutations, observer) => {
    let nodeValue = null
    mutations.forEach((mutation) => {
        if (mutation.type == "childList") {
            mutation.addedNodes.forEach(node => {
                if (node.classList?.contains("erc-watch-more-episodes")) {
                    const nextEpisode = node.querySelector('[data-t="next-episode"]')
                    nodeValue = nextEpisode

                }
            })
        }
    })

    if (nodeValue != null) {
        editNode(nodeValue)
    } else {
        findNode()
    }
})

function findNode() {
    const nextEpisodesNode = document.querySelector('[data-t="next-episode"]')
    if (nextEpisodesNode) {
        editNode(nextEpisodesNode)
        return true
    }

    return false
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const [msg, url] = message.split(":")
    if (msg == "crunchy_completed") {
        const find = findNode()
        if (!find) {
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: false })
        }
    }
});