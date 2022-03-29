/*

{
    header: "Title",
    content: "Lorem ipsum dolor sit amet",
    buttons: [
        {text: "Cancel"},
        {text: "Submit", action: () => {console.log("Hello world!")}}
    ]
}

*/



class CselModal {
    #modal
        #window
            #header
                #title
                #close
            #content
            #footer
    #speed = 500
    constructor(options) {
        this.create()
        this.update(options)
    }
    create() {
        this.#modal = document.createElement("div")
        this.#modal.classList.add("csel-modal")

        this.#window = document.createElement("div")
        this.#window.classList.add("csel-modal-window")
        this.#modal.appendChild(this.#window)

        this.#header = document.createElement("div")
        this.#header.classList.add("csel-modal-header")
        this.#window.appendChild(this.#header)

        this.#content = document.createElement("div")
        this.#content.classList.add("csel-modal-content")
        this.#window.appendChild(this.#content)

        this.#title = document.createElement("h2");
        this.#header.appendChild(this.#title)

        this.#close = document.createElement("div")
        this.#close.classList.add("csel-modal-close")
        this.#close.innerHTML = "&#215;"
        this.#close.onclick = () => this.close()
        this.#header.appendChild(this.#close)

        this.#footer = document.createElement("div")
        this.#footer.classList.add("csel-modal-footer")
        this.#window.appendChild(this.#footer)
    }
    set header(data) {
        this.#title.textContent = data
        this.#header.appendChild(this.#title)
    }
    set content(data) {
        this.#content.textContent = data
    }
    set buttons(data) {
        this.#footer.innerHTML = ""
        data.forEach((btn) => { this.button(btn) })
    }
    set speed(data) {
        this.#speed = data
    }
    update(options) {
        Object.entries(options).forEach(([key,value]) => {
            this[key] = value
        })
    }
    button(data) {
        let btn = document.createElement("button")
        btn.textContent = data.text

        this.#footer.appendChild(btn)
        if(typeof(data.action) == "function") {
            btn.onclick = () => {
                data.action()
                this.close()
            }
            return
        }
        btn.onclick = () => this.close()
    }
    open () {
        document.body.appendChild(this.#modal)
        this.#modal.style.animation = "csel-modal-fade "+this.#speed+"ms ease-in"
        setTimeout(() => {
            this.#modal.style.animation = null
        }, this.#speed)
    }
    close() {
        this.#modal.style.animation = "csel-modal-fade-back "+this.#speed+"ms"
        setTimeout(() => {
            this.#modal.style.animation = null
            document.body.removeChild(this.#modal)
        }, this.#speed)
    }
}