import figmaConfig from './tailwind.config.js'
console.log(`%c==ORIG [ File ]:`, 'color:#FFFFFF; border-radius:4px; background:#253031; padding:4px 8px;', figmaConfig)

const finalObj = {}

const mainArea = document.querySelector('.main')
const buttonsArea = document.createElement('div')
const btnCopy = document.createElement('button')
mainArea.appendChild(buttonsArea)
buttonsArea.appendChild(btnCopy)
buttonsArea.classList.add('result-area__buttons')
btnCopy.classList.add('result-area__btn-copy')
btnCopy.innerText = 'Copy to clipboard'

const colors = figmaConfig.theme.colors
console.log(`%c==ORIG [ Colors OBJ ]:`, 'color: #FFFFFF; border-radius:4px; background: #253031; padding: 4px 8px;', colors)

Object.entries(colors).forEach(([name, color]) => {
   const nameArr = name.split('-')

   if (nameArr.includes('tailwind') || nameArr.includes('base')) {
      return
   } else {
      nameArr.join()
   }

   const clearResults = nameArr.filter(clearUnused)
   function clearUnused(el) {
      if (el !== 'aaa' && el !== 'extras' && el !== '•') {
         return el
      }
   }

   if (clearResults[clearResults.length - 1] === 'default') {
      const lastElDefault = clearResults[clearResults.length - 1]
      const beforeDefault = clearResults[clearResults.length - 2]
      clearResults.pop()
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
      mergeResult(clearResults.join("-"), beforeDefault, color)
   } else {
      const lastElDefault = clearResults[clearResults.length - 1]
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
   }
})

function mergeResult(objName, key, value) {
   if (!finalObj[objName]) {
      finalObj[objName] = {}
   }
   finalObj[objName][key] = value
}

setTimeout(fillColorPalette, 1000)
function fillColorPalette() {
   Object.entries(finalObj).forEach(([paletteTitle, variants]) => {
      const resultAreaCode = document.querySelector('.result-area__code')
      const paletteGroup = document.createElement('div')
      const paletteElTitle = document.createElement('div')
      const paletteElClose = document.createElement('div')
      paletteGroup.classList.add('palette-group', `palette-${paletteTitle}`)
      paletteElTitle.classList.add('palette-title', `${paletteTitle}`)
      resultAreaCode.appendChild(paletteGroup)
      paletteGroup.appendChild(paletteElTitle)
      paletteElTitle.innerHTML = `<span style="color: #fd7d0e">'${paletteTitle}'</span><span style="color: #8d8d8d">: {</span>`

      Object.entries(variants).forEach(([name, color]) => {
         const paletteVariant = document.createElement('div')
         paletteVariant.classList.add('color-variant', `${paletteTitle}-${name}`)
         paletteGroup.appendChild(paletteVariant)
         paletteVariant.innerHTML +=
            `<div class="color-variant__color-preview" style="background: ${color}"></div>
            <div class="color-variant__value">'${name}'</div> :&nbsp;
            <div class="color-variant__hex">'${color}'</div><div style="color: #FFA500">,</div>`
         paletteGroup.appendChild(paletteElClose)
         paletteElClose.classList.add('palette-closer', `${paletteTitle}`)
         paletteElClose.innerHTML = `<span style="color: #8d8d8d">},</span>`
      })
   })

   const paletteGroups = document.querySelectorAll('.palette-group')
   paletteGroups.forEach(list => {
      let childEls = list.children
      const defaultLastEl = childEls[childEls.length - 2]
      defaultLastEl.remove()
      list.prepend(defaultLastEl)
      childEls[1].insertAdjacentElement("afterend", childEls[0])
   })
}

const finalObjJSON = JSON.stringify(finalObj, null, "\t")
function copyPaletteConfig() {
   navigator.clipboard.writeText(finalObjJSON)
   btnCopy.innerText = 'Config copied!'
   btnCopy.classList.add('--copied')
   setTimeout(restoreCopyBtn, 4000)
}
btnCopy.addEventListener('click', copyPaletteConfig)

function restoreCopyBtn() {
   btnCopy.innerText = 'Copy to clipboard'
   btnCopy.classList.remove('--copied')
}

const data = "text/json;charset=utf-8," + encodeURIComponent(finalObjJSON)
const downloadLink = document.createElement('a');
buttonsArea.appendChild(downloadLink)
downloadLink.classList.add('result-area__btn-download')
downloadLink.href = 'data:' + data;
downloadLink.download = 'tailwind-color.config.json';
downloadLink.innerHTML = 'Download config file';

// 🟨 WORK IN PROGRESS — TODO: Upload the config file code function
const btnUploadLabel = document.createElement('label')
const btnUploadInput = document.createElement('input')
btnUploadInput.setAttribute('type', 'file')
btnUploadInput.setAttribute('onChange', 'previewFile()')
btnUploadInput.classList.add('upload-file-input')
btnUploadLabel.classList.add('upload-file-label')
buttonsArea.appendChild(btnUploadLabel)
btnUploadLabel.appendChild(btnUploadInput)

function previewFile() {
   const content = document.querySelector(".upload-result")
   const [file] = document.querySelector("input[type=file]").files
   const reader = new FileReader()

   reader.addEventListener(
      "load",
      () => {
         console.log(`%cFile loaded:`, 'color: #000000; border-radius:4px; background: #7CB518; padding: 3px 6px;')
         // content.innerText = reader.result // 🟨Displays the uploaded file content (as text)
         console.log(reader)
         console.log(reader.result)
      },
      false
   )

   if (file) {
      reader.readAsText(file)
      console.log('Is file')
   }
}
