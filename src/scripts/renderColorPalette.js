import { finalObj } from "./startRegroup.js";

export default function renderColorPalette() {
   Object.entries(finalObj).forEach(([paletteTitle, variants]) => {
      const resultAreaCode = document.querySelector('.result-area__code')
      const paletteGroup = document.createElement('div')
      const paletteElTitle = document.createElement('div')
      const paletteElClose = document.createElement('div')
      paletteGroup.classList.add('palette-group', `palette-${paletteTitle}`)
      paletteElTitle.classList.add('palette-title', `${paletteTitle}`)
      resultAreaCode.appendChild(paletteGroup)
      paletteGroup.appendChild(paletteElTitle)
      paletteElTitle.innerHTML = `<span style="color: #fd7d0e">${paletteTitle}</span><span style="color: #8d8d8d">: {</span>`

      Object.entries(variants).forEach(([name, color]) => {
         const paletteVariant = document.createElement('div')
         paletteVariant.classList.add('color-variant', `${paletteTitle}-${name}`)
         paletteGroup.appendChild(paletteVariant)
         paletteVariant.innerHTML +=
            `<div class="color-variant__color-preview" style="background: ${color}"></div>
            <div class="color-variant__value">${name}</div> :&nbsp;
            <div class="color-variant__hex">${color}</div><div style="color: #FFA500">,</div>`
         paletteGroup.appendChild(paletteElClose)
         paletteElClose.classList.add('palette-closer', `${paletteTitle}`)
         paletteElClose.innerHTML = `<span style="color: #8d8d8d">},</span>`
      })
   })

   const paletteGroups = document.querySelectorAll('.palette-group')
   paletteGroups.forEach(list => {
      let childEls = list.children
      const defaultLastEl = childEls[childEls.length - 2]
      defaultLastEl.remove()
      list.prepend(defaultLastEl)
      childEls[1].insertAdjacentElement("afterend", childEls[0])
   })
}
