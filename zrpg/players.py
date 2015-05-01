import json
class Players:
    playersTarget = 'gamedata/players.json'

    def __init__(self):
        with open(self.playersTarget) as playersfile:
           self.data = json.load(playersfile)

    def getPlayers(self):
        return self.data

    def getPlayer(self, login):
        if not login in self.data: return 'Player not found'
        return self.data[login]

    def addPlayer(self, login):
        if not login in self.data:
            self.data[login] = {'login': login, 'level': 0, 'inventory': [], 'quest': [], 'pet': []}
            self.savePlayers()
            return self.getPlayer(login)

        return 'Login already exists'


    def savePlayers(self):
        with open(self.playersTarget, 'w') as playersfile:
            json.dump(self.data, playersfile)

    def addLevel(self, login):
        self.data[login]['level'] += 1