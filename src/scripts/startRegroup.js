const btnCopy = document.querySelector('.result-area__btn-copy')
const downloadLink = document.querySelector('.result-area__btn-download')

const finalObj = {}
let finalObjJSON = ''

export default function startRegrouping(readerResult) {
   const colors = readerResult.theme.colors
   // if (!colors) {
   //    console.log(`%cStatus: ERROR | Isolate the colors:\n`, 'color: #FFFFFF; border-radius:4px; background: #E53D00; padding: 4px 8px;', 'Colors isolation failed! Please, check uploaded config file and make sure that it\'s real config file or COLORS object exist inside.')
   // } else {
   //    console.log(`%cStatus: OK | Isolated colors [object]:\n`, 'color: #000000; border-radius:4px; background: #7CB518; padding: 4px 8px;', colors)
   // }

   Object.entries(colors).forEach(([name, color]) => {
      const nameArr = name.split('-')

      if (nameArr.includes('tailwind') || nameArr.includes('base') || nameArr.includes('transparent')) {
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

      const lastElDefault = clearResults.pop()
      if (lastElDefault === 'default') {
         const beforeDefault = clearResults.pop()
         mergeResult(clearResults.join("-"), lastElDefault, color)
         mergeResult(clearResults.join("-"), beforeDefault, color)
      } else {
         if(clearResults.join("-")) {
            mergeResult(clearResults.join("-"), lastElDefault, color)
         }
      }
   })

   setTimeout(fillColorPalette, 1000)

   finalObjJSON = JSON.stringify(finalObj, null, "\t")
   btnCopy.removeAttribute('disabled')
   downloadLink.removeAttribute('aria-label')

   const data = "text/json;charset=utf-8," + encodeURIComponent(finalObjJSON)
   downloadLink.href = 'data:' + data
   downloadLink.download = 'tailwind-colors.config.js'
}

export function mergeResult(objName, key, value) {
   if (!finalObj[objName]) {
      finalObj[objName] = {}
   }
   finalObj[objName][key] = value
}

// @TODO: Move the code "fillColorPalette" into separate module
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
      paletteElTitle.innerHTML = `<span style="color: #fd7d0e">${paletteTitle}</span><span style="color: #8d8d8d">: {</span>`

      Object.entries(variants).forEach(([name, color]) => {
         const paletteVariant = document.createElement('div')
         paletteVariant.classList.add('color-variant', `${paletteTitle}-${name}`)
         paletteGroup.appendChild(paletteVariant)
         paletteVariant.innerHTML +=
            `<div class="color-variant__color-preview" style="background: ${color}"></div>
            <div class="color-variant__value">${name}</div> :&nbsp;
            <div class="color-variant__hex">${color}</div><div style="color: #FFA500">,</div>`
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
