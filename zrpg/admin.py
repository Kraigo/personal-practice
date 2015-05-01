import players
from pprint import *

def inpInfo():
    print ('-' * 20)
    print ('[+] Add, [?] Player')
    print ('-' * 20)




d = players.Players()


inpInfo()
while True:
    print ('')
    inp = input('> ')
    inp_act = inp[:1]
    inp_var = inp[1:]

    if inp_act == '+':
        print ( d.addPlayer(inp_var) )

    if inp_act == '?':
        if not inp_var: pprint( d.getPlayers() )
        else: pprint( d.getPlayer(inp_var) )

    if inp == 'info':
        inpInfo()
