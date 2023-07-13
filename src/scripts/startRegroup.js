import renderColorPalette from './renderColorPalette.js'

const btnCopy = document.querySelector('.result-area__btn-copy')
const downloadLink = document.querySelector('.result-area__btn-download')

export const finalObj = {}

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

   setTimeout(renderColorPalette, 1000)

   btnCopy.removeAttribute('disabled')
   downloadLink.removeAttribute('aria-label')

   const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalObj, null, "\t"))
   downloadLink.href = 'data:' + data
   downloadLink.download = 'tailwind-colors.config.js'
}

function mergeResult(objName, key, value) {
   if (!finalObj[objName]) {
      finalObj[objName] = {}
   }
   finalObj[objName][key] = value
}

