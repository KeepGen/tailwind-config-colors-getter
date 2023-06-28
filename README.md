# Tailwind Config Colors Getter

A script which will get and reorganize the colors palettes offered by **Figma** plugin: `Figma to Tailwind config`

---

## Getting started

- Clone or download the **Tailwind Config Colors Getter** project.
- Use `npm install` to install the dependencies
- Use `npm run dev` to start the development
- Use `npm run prod` to prepare files for production

---

[//]: # (## Tasks)

[//]: # ()
[//]: # (#### In Progress:)

[//]: # ()

[//]: # (#### Backlog:)

[//]: # ()
[//]: # (---)

## Change log

###### 2023-06-28

- Add `back to main page` button for BO
- Add `OK` and `Fail` info results in console
- Add `error label` on upload area if was uploaded wrong config file
- Removed import of font `Lato` with all variations

###### 2023-06-27

- Finish the code that automates the upload process
- Rewrite the intro and steps text
- Clear the previous preview in the `result area code` if user uploaded a new file
- Disable `copy` and `download` buttons if the file didn't upload

###### 2023-06-26

- Check how to automate the process (upload the original palette and generate the new format)

###### 2023-06-22

- All code **MUST** be placed on one page – prepared the code and files
- Refactor `HTML` layout and `CSS` styles to cleaner code (and prepare code migration to BO)
- Refactor `JS` code and clear unused code after `HTML/CSS` refactor

###### 2023-06-20

- Add `Vite` for `Vercel` deployment
- Add `Getting started` section

###### 2023-06-19

- Copied text and download `config file` must be formatted (as `JSON`), not as one line content
- Add responsive styles
- Add styles for displayed HTML information (`color palette`, `color variants`)
- Add a small square showing a color preview
- Add the button below the result area to `copy` the palette color config
- Add the download button

###### 2023-06-16

- Create the area to show the final results

###### 2023-06-15

- Save the results into new `tailwind config` file (downloadable)
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
