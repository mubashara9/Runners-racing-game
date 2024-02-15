class Player {
    constructor() {
        this.name = null
        this.index = null
        this.positionY = 200
        this.rank = 0
        this.positionX = 100
    }


    getCount() {
        var ref = database.ref('playerCount')
        ref.on("value", function (data) {
            playerCount = data.val()
        })
    }


    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        })

    }

    update() {
        var playerIndex = "players/player" + this.index
        database.ref(playerIndex).set({
            name: this.name,
            positionY: this.positionY,
            positionX: this.positionX,
            rank: this.rank
        })
    }

    static updateRank(rank) {
        database.ref('/').update({
            runnersAtEnd: rank
        })
    }

    static deletePlayers() {
        database.ref('players').set('')
    }

    static getPlayerInfo() {
        var ref = database.ref('players')
        ref.on("value", data => {
            allPlayers = data.val()
        })
    }
}

