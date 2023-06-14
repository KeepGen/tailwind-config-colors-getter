# Tailwind Config Colors Getter

A script which will get and reorganize the colors palettes offered by **Figma** plugin: `Figma to Tailwind config`

---


## Tasks

#### In Progress:

- Organize the files

#### Backlog:

- Import the Figma plugin config file
- Find in imported config file the `Object` of colors
- Split all colors into separate color palettes (by name)
- Rename color palettes into new format:
```js
   module.exports = {
      colors: {
         primary: {
            '100': '#00000'
         }
      }
   }
```
- Save the results into new `tailwind config` file

---

## Change log

###### 2023-06-14

-
- Creating the repository
