/**
* @author Johan Montorfano
* @description Configuration management unit
**/

/**
* @function getConfigAuto
* Will load the configuration from local storage, create configuration if it
* does not exist, and return it.
**/
function getConfigAuto() {
    let config = localStorage.getItem("epi_ui_overhaul.config");

    if (config !== null)
        config = JSON.parse(config);
    if (config === null) config = {
        target_url: "https://intra.epitech.eu/*"
    }
    config.page_url = window.location.pathname;
    config.status = 
        new RegExp(config.target_url).exec(config.page_url) !== null;
    return config;
}

window.epi_ui_overhaul = {
    getConfigAuto
}
