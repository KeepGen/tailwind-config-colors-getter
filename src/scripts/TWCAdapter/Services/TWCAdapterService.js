import ProjectConfig from "../Models/ProjectConfig.js";


class TWCAdapterServiceClass{
   getFromTWC(twc){
      return this.convertTWCtoProjectConfig(twc)
   }

   /**
    *
    * @param twc TWConfig
    * @return {ProjectConfig}
    */
   convertTWCtoProjectConfig(twc) {
      const projectConfig = new ProjectConfig()

      const colors = twc.theme.colors

      const service = this

      Object.entries(colors).forEach(([name, color]) => {
         const nameArr = name.split('-')

         if (nameArr.includes('tailwind') || nameArr.includes('base') || nameArr.includes('transparent')) {
            return
         } else {
            nameArr.join()
         }

         const clearResults = nameArr.filter(function (el){
            if (el !== 'aaa' && el !== 'extras' && el !== '•') {
               return el
            }
         })

         const lastElDefault = clearResults.pop()
         if (lastElDefault === 'default') {
            const beforeDefault = clearResults.pop()
            service.mergeFinalObject(projectConfig, clearResults.join("-"), lastElDefault, color)
            service.mergeFinalObject(projectConfig, clearResults.join("-"), beforeDefault, color)
         } else {
            if(clearResults.join("-")) {
               service.mergeFinalObject(projectConfig, clearResults.join("-"), lastElDefault, color)
            }
         }
      })

      return projectConfig;
   }

   mergeFinalObject(projectConfig, objName, key, value) {
      if (!projectConfig.data[objName]) {
         projectConfig.data[objName] = {}
      }

      projectConfig.data[objName][key] = value
   }
}

const TWCAdapterService = new TWCAdapterServiceClass()

export default TWCAdapterService
