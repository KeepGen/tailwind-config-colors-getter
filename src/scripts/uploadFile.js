import { createNewTWConfig, errorEl, uploadArea, uploadInput } from './startRegroup.js'
import TWCService from "./FigmaPlugin/Services/TWCService.js";
import TWCAdapterService from "./TWCAdapter/Services/TWCAdapterService.js";
import renderColorPalette from "./renderColorPalette.js";

uploadInput.addEventListener('change', uploadFile)



function uploadFile() {
   const [file] = document.querySelector("input[type=file]").files

   TWCService.getTWCFromFile(file).then(function (twc) {

      const projectConfig = TWCAdapterService.getFromTWC(twc)

      setTimeout(renderColorPalette(projectConfig.data), 1000)

      createNewTWConfig.showActiveButtons()
   }).catch(function (error) {
      console.log(error)
      errorEl.classList.add('page__wrong-file')
      uploadArea.appendChild(errorEl)
      errorEl.innerHTML = `<span style="display: block; text-transform: uppercase; font-weight: 700;">wrong file</span> check console for details`
   })

}
