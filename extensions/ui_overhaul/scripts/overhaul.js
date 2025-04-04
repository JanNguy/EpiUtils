/**
* @author Johan Montorfano
* @description Overhaul tool
**/

function initDebugGUI() {
    const gui = new lil.GUI();
    const color = gui.addFolder("Colors");
    const settings = gui.addFolder("Settings");

    gui.domElement.style.setProperty("z-index", 42001);
    color.close();
    gui.onChange(updateTheme);
    settings.add(config, "light_mode");
    settings.add(config, "image_icon_coloring");
    Object.keys(config.theme_default).forEach(cssVar => {
        const folder = color.addFolder(cssVar);

        folder.addColor(config.theme_default[cssVar], 0).name("Light");
        folder.addColor(config.theme_default[cssVar], 1).name("Dark");
    });
}

function imageIconColoring() {
    if (!config.image_icon_coloring)
        return;

    const icons = document.querySelectorAll(".icon");

    for (let i = 0; i < icons.length; i++) {
        const icon = icons.item(i);

        icon.style.setProperty(
            "filter",
            config.light_mode ? "invert(0%)" : "invert(100%)"
        );
    }
}

/** Will create CSS variables with default themes */
function updateTheme() {
    Object.keys(config[`theme_${config.active_theme}`]).forEach(cssVar => {
        document.documentElement.style.setProperty(
            `--${cssVar}`,
            config[`theme_${config.active_theme}`][cssVar][
                config.light_mode ? 0 : 1
            ]
        );
    });
    imageIconColoring();
}

updateTheme();

matchMedia("(prefers-color-scheme: light)").addEventListener("change", ev => {
    config.light_mode = ev.matches;
    updateTheme();
})

initDebugGUI();
