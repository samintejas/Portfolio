# CSS

Cascading Style Sheets or *CSS* is a language web developers use to style the HTML content on a web page. If you’re interested in modifying [colors](https://www.codecademy.com/resources/docs/css/colors), [font](https://www.codecademy.com/resources/docs/css/typography/font) types, font sizes, images, element positioning, and more, CSS is the tool for the job

Styling can be applied inline in html , inside a style element in html or via linking a CSS file.

When HTML and CSS codes are in separate files, the files must be linked. Otherwise, the HTML file won’t be able to locate the CSS code, and the styling will not be applied.

You can use the [`<link>`](https://www.codecademy.com/resources/docs/html/elements/link?page_req=catalog) element to link HTML and CSS files together. The `<link>` element must be placed within the head of the HTML file. It is a self-closing tag and requires the following attributes:

1. `href` — like the anchor element, the value of this attribute must be the address, or path, to the CSS file.
2. `rel` — this attribute describes the relationship between the HTML file and
the CSS file. Because you are linking to a stylesheet, the value should
be set to `stylesheet`.

```html
<link href='./style.css' rel='stylesheet'>
```
