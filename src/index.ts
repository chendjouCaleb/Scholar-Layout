import "../webapp/css/style"


let root = document.documentElement;

setTimeout(() => {
    root.style.setProperty("--color", "red")
}, 3000);


let searchBar = document.querySelector<HTMLElement>("#search-bar");

let searchBarInputContainer = searchBar.querySelector<HTMLElement>(".search-bar-input-container");
let searchBarIcon = searchBar.querySelector<HTMLElement>(".search-bar-icon");
let searchBarInput = searchBar.querySelector<HTMLInputElement>("input");


searchBarInput.addEventListener("focus", () => {
    searchBar.style.borderColor = "#3399FF";
    searchBarInputContainer.style.left = "0";
    searchBarIcon.style.left = "-40px"
});

searchBarInput.addEventListener("blur", () => {
    searchBar.style.borderColor = "";
    searchBarInputContainer.style.left = "40px";
    searchBarIcon.style.left = "0"
});


document.onreadystatechange = () => {


    let sidebar = document.querySelector(".app-sidenav");
    let mainContainer = document.querySelector(".main-container");


    let sidebarCollapseButton = sidebar.querySelector(".sidebar-collapse-button");


    let iconOnly = false;

    sidebarCollapseButton.addEventListener("click", () => {
        if (!iconOnly) {
            sidebar.classList.add("icon-only");
            mainContainer.classList.add("icon-only");
        } else {
            sidebar.classList.remove("icon-only");
            mainContainer.classList.remove("icon-only");
        }
        iconOnly = !iconOnly;
    });


    let leftPanels: LeftPanel[] = [
        new LeftPanel(document.querySelector("#notification-panel-button"),
            document.querySelector("#notification-panel")),

        new LeftPanel(document.querySelector("#account-panel-button"),
            document.querySelector("#account-panel")),

        new LeftPanel(document.querySelector("#settings-panel-button"),
            document.querySelector("#settings-panel")),

        new LeftPanel(document.querySelector("#message-panel-button"),
            document.querySelector("#message-panel")),

        new LeftPanel(document.querySelector("#event-panel-button"),
            document.querySelector("#event-panel"))

    ];

    leftPanels.forEach(panel => {
        panel.button.addEventListener("click", () => {
            leftPanels.forEach(p => p.hide());

            panel.show();
        })
    })

};


export class LeftPanel {
    private _isVisible: boolean = false;
    private _closeButton: HTMLElement;

    constructor(public button: HTMLElement, private panel: HTMLDivElement) {
        this.hide();

        this._closeButton = panel.querySelector(".panel-close-button");

        this._closeButton.addEventListener("click", () => this.hide());

    }

    hide() {
        this.panel.classList.remove("left-panel-visible");
        this._isVisible = false;
    }

    show() {
        this.panel.classList.add("left-panel-visible");
        this._isVisible = true;
    }

    toggle() {
        this._isVisible ? this.hide() : this.show();
    }
}