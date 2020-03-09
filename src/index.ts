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

    let brand = document.querySelector(".toolbar-brand");
    let notification = new Notification('Hello world from typeScript HTML5 ,css3 good job!!!', 'danger');
    let sidebar = document.querySelector(".app-sidenav");
    let mainContainer = document.querySelector(".main-container");
    // notification.open();
    document.body.appendChild(notification.get());
    let sidebarCollapseButton = sidebar.querySelector(".sidebar-collapse-button");
    brand.addEventListener('click', () => {
        notification.open();
    })

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

export class Notification {
    private notificationBox = document.createElement('div') as HTMLDivElement;
    private message: string;
    private timeout: number = 3;
    private notification_type = 'info'
    constructor(msg: string, type?: string, delait?: number) {
        this.message = msg;

        if (delait)
            this.timeout = delait;
        if (type)
            this.notification_type = type;

        let icon = document.createElement('i') as HTMLElement;
        let div_header = document.createElement('div') as HTMLElement;
        let div_title_box = document.createElement('div') as HTMLElement;
        let div_close_btn = document.createElement('div') as HTMLElement;
        let div_body = document.createElement('div') as HTMLElement;
        let div_img = document.createElement('div') as HTMLElement;
        let img = document.createElement('img');
        let div_message = document.createElement('div') as HTMLElement;

        icon.classList.add('ms-Icon', 'ms-Icon--Cancel', 'notification-close-button');
        div_header.classList.add('notification__header');
        div_header.classList.add(this.notification_type);
        div_title_box.classList.add('notification__title');
        div_title_box.append('Notitification Box');
        div_close_btn.classList.add('notification__btn');
        div_close_btn.appendChild(icon);
        div_close_btn.addEventListener("click", () => {
            this.close();
        })
        div_body.classList.add('notification__body');
        div_img.classList.add('notification__img');

        img.setAttribute('class', 'img_noti');
        img.src = "/assets/personna.jpg";
        div_img.appendChild(img);

        div_message.classList.add('notification__message');
        div_message.innerHTML = this.message;

        div_header.appendChild(div_title_box);
        div_header.appendChild(div_close_btn);

        div_body.appendChild(div_img);
        div_body.appendChild(div_message);

        this.notificationBox.classList.add('notification');
        this.notificationBox.classList.add('hidden');
        this.notificationBox.appendChild(div_header);
        this.notificationBox.appendChild(div_body);


        if (delait)
            this.timeout = delait;
        if (type)
            this.notification_type = type;

        // let closeBtn = this.notificationBox.querySelector('.notification__btn');
        // this.notificationBox.querySelector('.notification__message').innerHTML = this.message;
        // this.notificationBox.querySelector('.notification__header').classList.add(this.notification_type);
        // closeBtn.addEventListener("click", () => {
        //    this.close();
        // })
        this.open();
    }

    public open() {
        console.log('Bonour le monde de');

        this.notificationBox.classList.remove("hidden");
        setTimeout(() => {
            this.close()
        }, (1000 * this.timeout));
    }

    public close() {
        this.notificationBox.classList.add("hidden");
    }

    public get(): HTMLElement {
        return this.notificationBox;
    }
}