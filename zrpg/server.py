import socket

sock = socket.socket()
sock.bind( ("", 9090) )
sock.listen(5)

conns = []
while True:
	conn, addr = sock.accept()
	conns.append(conn)
	print conns


conn.close()