import renderColorPalette from './renderColorPalette.js'

export const btnCopy = document.querySelector('.result-area__btn-copy')
export const downloadLink = document.querySelector('.result-area__btn-download')
export const resultAreaCode = document.querySelector('.result-area__code')
export const errorEl = document.createElement('div')
export const uploadArea = document.querySelector('.upload-file-label')
export const uploadInput = document.querySelector('.upload-file-input')

class ColorsTailwindConfig {
   constructor() {
      this.finalObj = {}
   }

   refactorTWConfigFile(rawData) {
      const colors = rawData.theme.colors

      Object.entries(colors).forEach(([name, color]) => {
         const nameArr = name.split('-')

         if (nameArr.includes('tailwind') || nameArr.includes('base') || nameArr.includes('transparent')) {
            return
         } else {
            nameArr.join()
         }

         const clearResults = nameArr.filter(this.clearUnused)

         const lastElDefault = clearResults.pop()
         if (lastElDefault === 'default') {
            const beforeDefault = clearResults.pop()
            this.mergeFinalObject(clearResults.join("-"), lastElDefault, color)
            this.mergeFinalObject(clearResults.join("-"), beforeDefault, color)
         } else {
            if(clearResults.join("-")) {
               this.mergeFinalObject(clearResults.join("-"), lastElDefault, color)
            }
         }
      })

      setTimeout(renderColorPalette(this.finalObj), 1000)
      this.downloadTWConfigFile(this.finalObj)
   }

   clearUnused(el) {
      if (el !== 'aaa' && el !== 'extras' && el !== '•') {
         return el
      }
   }

   mergeFinalObject(objName, key, value) {
      if (!this.finalObj[objName]) {
         this.finalObj[objName] = {}
      }
      this.finalObj[objName][key] = value
   }

   // Different — Should move apart?
   resetAllResults() {
      btnCopy.setAttribute('disabled','')
      downloadLink.setAttribute('aria-label','disabled')
      resultAreaCode.innerText = ''
      errorEl.remove()
      this.finalObj = {}
   }

   showActiveButtons() {
      btnCopy.removeAttribute('disabled')
      downloadLink.removeAttribute('aria-label')
   }

   copyPaletteConfig() {
      navigator.clipboard.writeText(JSON.stringify(this.finalObj, null, "\t"))
      btnCopy.innerText = 'Config copied!'
      btnCopy.classList.add('--copied')
      setTimeout(this.restoreCopyBtn, 2000)
   }

   restoreCopyBtn() {
      btnCopy.innerText = 'Copy to clipboard'
      btnCopy.classList.remove('--copied')
   }

   downloadTWConfigFile(dataObj) {
      const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj, null, "\t"))
      downloadLink.href = 'data:' + data
      downloadLink.download = 'tailwind-colors.config.js'
   }
}

export const createNewTWConfig = new ColorsTailwindConfig()

btnCopy.addEventListener('click', (() => createNewTWConfig.copyPaletteConfig()))
