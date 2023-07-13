import startRegrouping from './startRegroup.js'

const btnCopy = document.querySelector('.result-area__btn-copy')
const downloadLink = document.querySelector('.result-area__btn-download')
const uploadArea = document.querySelector('.upload-file-label')
const errorEl = document.createElement('div')
const resultAreaCode = document.querySelector('.result-area__code')
const uploadInput = document.querySelector('.upload-file-input')

uploadInput.addEventListener('change', uploadFile)

function uploadFile() {
   const [file] = document.querySelector("input[type=file]").files
   const reader = new FileReader()

   reader.addEventListener(
      "load",
      () => {
         btnCopy.setAttribute('disabled','')
         downloadLink.setAttribute('aria-label','disabled')
         resultAreaCode.innerText = ''
         errorEl.remove()

         if(!reader.result.startsWith('module.exports = ')) {
            console.log(`%cStatus: ERROR\n`, 'color: #FFFFFF; border-radius:4px; background: #E53D00; padding: 4px 8px;', 'WRONG FILE FORMAT. Please, check the "Figma Tailwind config" file and make sure that it\'s real config file. It MUST start with "module.exports = " code')
            errorEl.classList.add('page__wrong-file')
            uploadArea.appendChild(errorEl)
            errorEl.innerHTML = `<span style="display: block; text-transform: uppercase; font-weight: 700;">wrong file</span> check console for details`
         } else {
            console.log(`%cStatus: OK | Uploaded content:\n`, 'color: #000000; border-radius:4px; background: #7CB518; padding: 4px 8px;', reader.result)
         }
         const clearedResult = eval('('+ reader.result.replace('module.exports = ', '') + ')')
         startRegrouping(clearedResult)
      },
      false
   )

   if (file) {
      reader.readAsText(file)
   }
}
