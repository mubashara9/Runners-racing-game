class Form {
    constructor() {
        this.button = createButton("Ready")
        this.input = createInput("Type your name")
        this.reset = createButton("Reset Game")
        this.greeting = createElement("h2")
        this.title = createElement("h2")
    }

    hide() {
        this.button.hide()
        this.input.hide()
        this.greeting.hide()
        this.title.hide()
    }
    display() {
        textFont('Fira Code')    
        this.title.html("Marathon Game")
        this.title.style('font-family', 'Trebuchet MS')
        this.title.style('font-size', '70px')
        this.title.position(displayWidth / 2 - 300, 100)
        this.input.style('color', 'black')
        this.input.style('background', 'lavender')
        this.input.style('width', '500px')
        this.input.style('height', '40px')
        this.input.style('font-family', 'Trebuchet MS')
        this.reset.style('color', 'purple')
        this.reset.style('font-family', 'Trebuchet MS')
        this.reset.position(displayWidth -200, 25)
        this.button.style('color', 'purple')
        this.button.style('font-family', 'Trebuchet MS')
        this.button.position(displayWidth - 2 - 950, 500)
        this.input.position(displayWidth / 2 - 300, displayHeight / 2 - 80)
        // When the Ready button is pressed, the function below will executed
        this.button.mousePressed(() => {
            this.input.hide()
            this.button.hide()
            this.title.hide()
            var message = `Hello ${this.input.value()}
            <br/> wait for another Player to join`
            this.greeting.html(message)
            this.greeting.style('font-family', 'Trebuchet MS')
            this.greeting.position(displayWidth / 2 - 200, displayHeight / 4)
            this.greeting.style('font-size', '40px')
            playerCount += 1
            player.index = playerCount
            player.update()
            player.updateCount(playerCount)
        })

        this.reset.mousePressed(() => {
            player.updateCount(0)
            Player.updateRank(0)
            game.update(0)
            Player.deletePlayers()
            window.location.reload()
        })
    }
}
