import { finalObjJSON } from './startRegroup.js'

console.log(finalObjJSON)

const btnCopy = document.querySelector('.result-area__btn-copy')

btnCopy.addEventListener('click', copyPaletteConfig)

function copyPaletteConfig(){
   navigator.clipboard.writeText(finalObjJSON)
   btnCopy.innerText = 'Config copied!'
   btnCopy.classList.add('--copied')
   setTimeout(restoreCopyBtn, 4000)
}

function restoreCopyBtn() {
   btnCopy.innerText = 'Copy to clipboard'
   btnCopy.classList.remove('--copied')
}

