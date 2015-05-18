import pymorphy2
morph = pymorphy2.MorphAnalyzer()

while True:
	word = input('>')
	print(morph.parse(word)[0].tag.cyr_repr)
	print(morph.parse(word)[0].tag, end="\n"*2)