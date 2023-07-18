import { TWConfig } from "../Models/TWConfig.js";

export class TWCServiceClass{
   createTWC(data){
      return new TWConfig(data)
   }

   /**
    *
    * @param file File
    * @return Promise<TWConfig>
    */
   getTWCFromFile(file){
      const service = this
      return new Promise(function (resolve, reject){
         if(!file){
            throw new Error('File Not Found')
         }

         const reader = new FileReader()

         reader.addEventListener(
            "load",
            () => {
               if(!reader.result.startsWith('module.exports = ')) {
                  throw new Error('Wrong File')
               }
               const rawData = eval('('+ reader.result.replace('module.exports = ', '') + ')')

               resolve(service.createTWC(rawData))
            },
            false
         )

         reader.readAsText(file)

         reader.onerror = reject
      })
   }
}

const TWCService = new TWCServiceClass()

export default TWCService
