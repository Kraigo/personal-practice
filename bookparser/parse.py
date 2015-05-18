import re, pymorphy2, codecs, json
morph = pymorphy2.MorphAnalyzer()

fileName = input('Input file name: ')
# fileName = 'master2.txt'

inData = open(fileName, 'r')
outData = ''

print('Reading book...')

for line in inData:
	t = line.lower()
	t = t.replace('-\n', '')
	t = re.sub("-", ' ', t)
	t = re.sub("[^a-zа-яё\s]", '', t)
	t = re.sub("\s+", ' ', t)
	t = re.sub("^\s", '', t)

	outData += t


print('Understanding book...')
outData = set( outData.split(' ') )
outData = [morph.parse(d)[0].normal_form for d in outData if 'NOUN' in morph.parse(d)[0].tag]
outData = set( outData )

print('Parsing Done. Found %s noun' % str(len(outData)))

with codecs.open('nouns-'+fileName,'w', encoding='utf8') as f:
	f.write(', '.join(outData))

print('Output in nouns-'+fileName)

# formattedData = {}
# for word in outData:
# 	l = len(word)
# 	try:
# 		formattedData[l]
# 	except:
# 		formattedData[l] = []

# 	formattedData[l].append(word)

# with codecs.open('nouns.json','w', encoding='utf8') as f:
# 	json.dump(formattedData, f, ensure_ascii=False).encode('utf8')

# print('Output in nouns.json')
input()