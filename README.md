# Tailwind Config Colors Getter

A script which will get and reorganize the colors palettes offered by **Figma** plugin: `Figma to Tailwind config`

---

## Tasks

#### In Progress:

- Add the button below the result area to copy the palette color config

#### Backlog:

- Check how to automate the process (upload the original palette and generate the new format)

---

## Change log

###### 2023-06-19

- Add styles for displayed HTML information (`color palette`, `color variants`)
- Add a small square showing a color preview

###### 2023-06-16

- Create the area to show the final results

###### 2023-06-15

- Save the results into new `tailwind config` file
- Rename and save color palettes into new format
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
