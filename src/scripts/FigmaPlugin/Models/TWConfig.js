import { TWConfigTheme } from "./TWConfigTheme.js";

export class TWConfig{
   content = []

   theme = new TWConfigTheme()

   constructor(rawData) {
      if(rawData) {
         this.content = rawData.content
         this.theme = new TWConfigTheme(rawData.theme)
      }

   }


}
