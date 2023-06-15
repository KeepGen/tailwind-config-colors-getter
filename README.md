# Tailwind Config Colors Getter

A script which will get and reorganize the colors palettes offered by **Figma** plugin: `Figma to Tailwind config`

---


## Tasks

#### In Progress:

- Rename color palettes into new format:
```js
   module.exports = {
      colors: {
         'primary': {
            'default': '#00000',
            '100': '#00000',
            '200': '#00000',
         },
         'orchid-blue': {
            'default': '#00000',
            '100': '#00000'
         }
      }
   }
```

#### Backlog:

- Save the results into new `tailwind config` file

---

## Change log

###### 2023-06-15

- Split all colors into separate color palettes (by name)
- Split the color names by "–" and get the array of elements
- Delete variants (like `'500'`) from array
- Delete the last element in array **ONLY** if it's `default`
- Save `default` element as a separate element (avoid deleting original element)

###### 2023-06-14

- Creating the repository
- Organize the files
- Import the Figma plugin config file
- Find in imported config file the `Object` of colors
- Exclude the first element in the array to delete the prefix (in my case `aaa-`)
- Ignore default `Tailwind` colors
- Exclude from the elements of array which contains `extra` and `•`
