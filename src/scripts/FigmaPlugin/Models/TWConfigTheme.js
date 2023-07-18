export class TWConfigTheme{
   fontSize = {}
   fontFamily = {}
   colors = {}
   extend = {}

   constructor(rawData) {
      if(rawData){
         this.fontSize = rawData.fontSize
         this.fontFamily = rawData.fontFamily
         this.colors = rawData.colors
         this.extend = rawData.extend

      }
   }
}
