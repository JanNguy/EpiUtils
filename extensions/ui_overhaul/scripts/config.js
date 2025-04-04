/**
* @author Johan Montorfano
* @description Config utils
**/

/**
* Contains configuration about the extension.
*
* @field theme_*
* Themes contains color values with a light and dark variant. All those values
* are mandatory for the theme to work.
* 
* @field color_labels
* Link every color found on certain styling attributes on the intra to their
* corresponding name in the themes.
* It is formatted as [property_variant]: {[theme_var_name]: colors(string)[]}
**/ 
const config = {
    active_theme: "default",
    light_mode: matchMedia("(prefers-color-scheme: light)").matches ? 
        true : false,
    image_icon_coloring: true, 
    theme_default: {
        text_contrast: ["#ffffff", "#ffffff"],
        text_gray_light: ["#8f8f8f", "#f8f8f8"],
        text_gray_dark: ["#595959", "#959595"],
        text: ["#000000", "#ffffff"],
        text_accent: ["#006d9f", "#0091d3"],
        bg_contrast: ["#1f485e", "#003b57"],
        bg_accent: ["#c6dff3", "#016593"],
        bg_light: ["#efefef", "#ffffff"],
        bg: ["#ffffff", "#1d222b"],
        border_accent: ["#0084c1", "#0084c1"],
        border: ["#dbdbdb", "#424242"],
        misc_bar_completed: ["#efaf16", "#ff8800"],
        misc_bar_remaining: ["#4fa8d4", "#707070"]
    },
    colors_labels: {
        background: {
            bg_contrast: ["#1f485e", "#006d9f"],
            bg_accent: ["#0091d3", "#c6dff3"],
            bg_light: ["#f7f7f7", "#efefef"],
            bg: ["#ffffff"],
            misc_bar_completed: ["#efaf16"],
            misc_bar_remaining: ["#4fa8d4"]
        },
        color: {
            text_contrast: ["#ffffff"],
            text_gray_light: ["#8f8f8f"],
            text_gray_dark: ["#595959", "#f5f5f5", "#666666", "#3e3d40"],
            text_accent: ["#0091d3", "#2d75aa", "#006d9f"],
            text: ["#000000"]
        },
        border: {
            border_accent: ["#c6dff3"],
            border: ["#dbdbdb"]
        }
    }
}

/** Returns the appropriate CSS attribute to look for */
function getCSSAttribute(attr) {
    if (attr === "background")
        return ["background", "background-color"];
    if (attr === "color")
        return ["color"];
    if (attr === "border")
        return ["border", "border-color"];
    return [];
}

function rgbToHex(rgbString) {
    const result = rgbString?.match(/\d+/g);

    if (!result || result.length !== 3)
        return;

    const hex = result.map(num =>
        parseInt(num, 10).toString(16).padStart(2, '0').toLowerCase()
    );

    return `#${hex.join('')}`;
}

/** Will replace all coloring values of items with CSS variables, allowing for
* later color modification. */
Object.keys(config.colors_labels).forEach(attr => {
    const el = document.getElementsByTagName("*");

    for (let i = 0; i < el.length; i++) {
        const item = el.item(i);
        const style = getComputedStyle(item);
        const vars = config.colors_labels[attr];
    
        Object.keys(vars).forEach(name => {
            const matches = vars[name];

            if (matches.indexOf(rgbToHex(style[attr])) > -1)
                item.style.setProperty(attr, `var(--${name})`);
            if (matches.indexOf(rgbToHex(style[attr + "-color"])) > -1)
                item.style.setProperty(attr + "-color", `var(--${name})`);
        });
    }
});
