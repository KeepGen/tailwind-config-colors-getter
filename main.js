import figmaConfig from './tailwind.config.js'

console.log(`%c==ORIG [ File ]:`, 'color:#FFFFFF; border-radius:4px; background:#253031; padding:4px 8px;', figmaConfig)

const finalObj = {}

const mainArea = document.querySelector('.main')
const buttonsArea = document.createElement('div')
const btnCopy = document.createElement('button')
mainArea.appendChild(buttonsArea)
buttonsArea.appendChild(btnCopy)
buttonsArea.classList.add('result-area__buttons')
btnCopy.classList.add('result-area__btn-copy')
btnCopy.innerText = 'Copy to clipboard'

const colors = figmaConfig.theme.colors
console.log(`%c==ORIG [ Colors OBJ ]:`, 'color: #FFFFFF; border-radius:4px; background: #253031; padding: 4px 8px;', colors)

Object.entries(colors).forEach(([name, color]) => {
   // 🟩DONE — 01. Разбить "NAME" по тире и получить массив значений
   const nameArr = name.split('-')
   // console.log(`%cResult ${nameArr.length}:`, 'color: #453643; border-radius:4px; background: #E3E3E3; padding: 4px 8px;', nameArr)

   // 🟩DONE — 02. Перезаписать в массив только те значения, которые НЕ используют "TAILWIND" и "BASE"
   if (nameArr.includes('tailwind') || nameArr.includes('base')) {
      return
   } else {
      nameArr.join()
   }

   // 🟩DONE — 03. Удалить из массива первое значение "мусорный" префикс (например "AAA")
   // 🟩DONE — 04. Удалить из массива значения где встречается "EXTRAS" и разделить "•"
   const clearResults = nameArr.filter(clearUnused)

   function clearUnused(el) {
      if (el !== 'aaa' && el !== 'extras' && el !== '•') {
         return el
      }
   }

   // 🟩DONE — 05. Найти в массиве те значения, где последний элемент = "DEFAULT"
   // 🟩DONE — 06. Создать условие при котором массивы содержащие (найденые) "DEFAULT" записать в новый массив с ключом "DEFAULT" и значением "HEX код"
   // 🟩DONE — 07. Для остальных элементов – убрать вариант (например "500"), оставшиеся значения сконкатинировать в одно название через дефис
   // 🟩DONE — 08. Объеденённое значение сохранить как название нового объекта, в который надо добавить значения (например "имя": "HEX код")
   // 🟩DONE — 09. Если имя состоит из нескольких элементов (в массиве), их нужно объединить
   if (clearResults[clearResults.length - 1] === 'default') {
      const lastElDefault = clearResults[clearResults.length - 1]
      const beforeDefault = clearResults[clearResults.length - 2]
      clearResults.pop()
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
      mergeResult(clearResults.join("-"), beforeDefault, color)
   } else {
      const lastElDefault = clearResults[clearResults.length - 1]
      clearResults.pop()
      mergeResult(clearResults.join("-"), lastElDefault, color)
   }
})

// 🟩DONE — 10. Полученный элемент использовать как название объекта и объединить в массив палеток с цветами
// 🟩DONE — 11. Элемент eg. "500" добавить в объект как ключ
// 🟩DONE — 12. Элемент "COLOR" (HEX цвет) добавить в объект как значение в соответствии с ключом
// 🟩DONE — 13. Каждый объект с градацией по цветам объединить в один общий объект
function mergeResult(objName, key, value) {
   // console.log(objName, key, value)
   // finalObj = {
   //    [objName]: {
   //       [key]: value
   //    }
   // }
   // finalArray.push(finalObj)

   if (!finalObj[objName]) {
      console.log(`🟥 Palette "${objName.toUpperCase()}" doesn\'t exist, creating`)
      finalObj[objName] = {}
   }
   console.log(finalObj[objName], [key]) // Fill the object with results
   finalObj[objName][key] = value
}

console.log('= = = = = = = = = = = = = = = = = = = = = = = = = = = = ')
console.log(`%cFinal [ OBJ ]:`, 'color: #FFFFFF; border-radius:4px; background: #2978A0; padding: 4px 8px;', finalObj)
console.log('= = = = = = = = = = = = = = = = = = = = = = = = = = = = ')

// 🟩DONE — FILL THE HTML TABLE
setTimeout(fillColorPalette, 1000)

function fillColorPalette() {
// 🟩DONE — Add unique palette DIV
   Object.entries(finalObj).forEach(([paletteTitle, variants]) => {
      const resultAreaCode = document.querySelector('.result-area__code')
      const paletteGroup = document.createElement('div')
      const paletteElTitle = document.createElement('div')
      const paletteElClose = document.createElement('div')
      paletteGroup.classList.add('palette-group', `palette-${paletteTitle}`)
      paletteElTitle.classList.add('palette-title', `${paletteTitle}`)
      resultAreaCode.appendChild(paletteGroup)
      paletteGroup.appendChild(paletteElTitle)
      paletteElTitle.innerHTML = `<span style="color: #fd7d0e">'${paletteTitle}'</span><span style="color: #8d8d8d">: {</span>`

      // 🟩DONE — Add each variant with HEX color
      Object.entries(variants).forEach(([name, color]) => {
         const paletteVariant = document.createElement('div')
         paletteVariant.classList.add('color-variant', `${paletteTitle}-${name}`)
         paletteGroup.appendChild(paletteVariant)
         // 🟩DONE — Add to the HTML page variants, colors and color preview box with styles
         paletteVariant.innerHTML +=
            `<div class="color-variant__color-preview" style="background: ${color}"></div>
            <div class="color-variant__value">'${name}'</div> :&nbsp;
            <div class="color-variant__hex">'${color}'</div><div style="color: #FFA500">,</div>`
         paletteGroup.appendChild(paletteElClose)
         paletteElClose.classList.add('palette-closer', `${paletteTitle}`)
         paletteElClose.innerHTML = `<span style="color: #8d8d8d">},</span>`
      })
   })

   // 🟩DONE — Move "default" variant from the end to the beginning
   const paletteGroups = document.querySelectorAll('.palette-group')
   paletteGroups.forEach(list => {
      let childEls = list.children
      const defaultLastEl = childEls[childEls.length - 2]
      defaultLastEl.remove()
      list.prepend(defaultLastEl)
      childEls[1].insertAdjacentElement("afterend", childEls[0])
   })
}

// 🟩DONE — Add the copy button below the area result
const finalObjJSON = JSON.stringify(finalObj)
function copyPaletteConfig() {
   navigator.clipboard.writeText(finalObjJSON)
   btnCopy.innerText = 'Config copied!'
   btnCopy.classList.add('--copied')
   setTimeout(restoreCopyBtn, 4000)
}
btnCopy.addEventListener('click', copyPaletteConfig)

// 🟩DONE — Restore the copy button values and styles
function restoreCopyBtn() {
   btnCopy.innerText = 'Copy to clipboard'
   btnCopy.classList.remove('--copied')
}

// 🟩DONE — Download the JSON file
const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalObj));
const downloadLink = document.createElement('a');
buttonsArea.appendChild(downloadLink)
downloadLink.classList.add('result-area__btn-download')
downloadLink.href = 'data:' + data;
downloadLink.download = 'tailwind-color.config.json';
downloadLink.innerHTML = 'Download config file';

// 🟨 — Upload code function
const btnUploadLabel = document.createElement('label')
const btnUploadInput = document.createElement('input')
btnUploadInput.setAttribute('type', 'file')
btnUploadInput.setAttribute('onChange', 'previewFile()')
btnUploadInput.classList.add('upload-file-input')
btnUploadLabel.classList.add('upload-file-label')
buttonsArea.appendChild(btnUploadLabel)
btnUploadLabel.appendChild(btnUploadInput)

function previewFile() {
   const content = document.querySelector(".upload-result")
   const [file] = document.querySelector("input[type=file]").files
   const reader = new FileReader()

   reader.addEventListener(
      "load",
      () => {
         console.log(`%cFile loaded:`, 'color: #000000; border-radius:4px; background: #7CB518; padding: 3px 6px;')
         // content.innerText = reader.result // 🟨Displays the uploaded file content (as text)
         console.log(reader)
         console.log(reader.result)
      },
      false
   )

   if (file) {
      reader.readAsText(file)
      console.log('Is file')
   }
}
