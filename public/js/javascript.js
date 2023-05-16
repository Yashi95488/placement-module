const body = document.querySelector("body"),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box");

// console.log(sidebar);
// console.log(toggle);

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// theme changing code

const colorTheme = document.querySelectorAll('[name="theme"]');

//store theme
const storeTheme = function(theme) {
    localStorage.setItem("theme", theme);
}

colorTheme.forEach(themeOption => {
    themeOption.addEventListener('click', () => {
        storeTheme(themeOption.id);
    });
});

// apply theme
const setTheme = function() {
    const activeTheme = localStorage.getItem("theme");
    colorTheme.forEach((themeOption) => {
        if (themeOption.id === activeTheme) {
            themeOption.checked = true;
        }
    });
    //fallback for np :has() support
    document.documentElement.className = theme;
};

document.onload = setTheme();