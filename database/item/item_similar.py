import csv

file = open('item_info.csv', 'r')

dataread = csv.reader(file, delimiter=',')

data = []

for row in dataread:
	data.append(row)

hang = len(data[0])

cnt = 0
ct = 1

for row in data:
	if(row[0] == 'item_id'):
		continue
	cnt += 1
	f = open(str(cnt)+".txt","w")
	a = []
	z = 0
	for popo in data:
		rate = 0
		z += 1
		if(popo[0]==row[0] or popo[0]=='item_id'):
		 	continue
		for i in range(1, hang):
			if(popo[i] == row[i]):
				rate += 1
		tp = (rate, z)
		a.append(tp)
	a.sort(reverse=True)
	for i in a:
		f.write('%d\n' %i[1])
