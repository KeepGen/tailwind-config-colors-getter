import figmaConfig from './tailwind.config.js'
console.log(`%c==ORIG [ File ]:`, 'color:#FFFFFF; border-radius:4px; background:#253031; padding:4px 8px;', figmaConfig);

let finalResult = {}
let finalArray = []

const colors = figmaConfig.theme.colors
console.log(`%c==ORIG [ Colors OBJ ]:`, 'color: #FFFFFF; border-radius:4px; background: #253031; padding: 4px 8px;', colors);

Object.entries(colors).forEach(([name, color], k) => {
   // 🟩DONE — 01. Разбить "NAME" по тире и получить массив значений
   const nameArr = name.split('-')
   // console.log(`%cResult ${nameArr.length}:`, 'color: #453643; border-radius:4px; background: #E3E3E3; padding: 4px 8px;', nameArr);

   // 🟩DONE — 02. Перезаписать в массив только те значения, которые НЕ используют "TAILWIND" и "BASE"
   if(nameArr.includes('tailwind') || nameArr.includes('base')) {
      return
   } else {
      nameArr.join()
   }

   // 🟩DONE — 03. Удалить из массива первое значение "мусорный" префикс (например "AAA")
   // 🟩DONE — 04. Удалить из массива значения где встречается "EXTRAS" и разделить "•"
   const clearResults = nameArr.filter(clearUnused)
   function clearUnused(el) {
      if(el !== 'aaa' && el !== 'extras' && el !== '•') {
         return el
      }
   }

   // 🟩DONE — 05. Найти в массиве те значения, где последний элемент = "DEFAULT"
   // 🟩DONE — 06. Создать условие при котором массивы содержащие (найденые) "DEFAULT" записать в новый массив с ключом "DEFAULT" и значением "HEX код"
   // 🟩DONE — 07. Для остальных элементов – убрать вариант (например "500"), оставшиеся значения сконкатинировать в одно название через дефис
   // 🟩DONE — 08. Объеденённое значение сохранить как название нового объекта, в который надо добавить значения (например "имя": "HEX код")
   // 🟩DONE — 09. Если имя состоит из нескольких элементов (в массиве), их нужно объединить
   if(clearResults[clearResults.length -1] === 'default') {
      const lastElDefault = clearResults[clearResults.length -1]
      const beforeDefault = clearResults[clearResults.length -2]
      clearResults.pop()
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
      mergeResult(clearResults.join("-"), beforeDefault, color)
   } else {
      const lastElDefault = clearResults[clearResults.length -1]
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
   }
})

// 🟥Полученный элемент использовать как название объекта и объединить в массив палеток с цветами
// 🟥Элемент eg. "500" добавить в объект как ключ
// 🟥Элемент "COLOR" (HEX цвет) добавить в объект как значение в соответствии с ключом
// 🟥Каждый объект с градацией по цветам объединить в один общий объект
function mergeResult(objName, key, value) {
   console.log(objName, key, value)
   finalResult = {
      [objName]: {
         [key]: value
      }
   }
   finalArray.push(finalResult)
}

console.log('= = = = = = = = = = = = = = = = = = = = = = = = = = = = ');
console.log(`%cFinal [ OBJ ]:`, 'color: #FFFFFF; border-radius:4px; background: #2978A0; padding: 4px 8px;', finalResult);
console.log(`%cFinal [ ARR ]:`, 'color: #000000; border-radius:4px; background: #7CB518; padding: 4px 8px;', finalArray);
