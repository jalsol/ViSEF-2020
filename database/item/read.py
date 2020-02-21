ct = 0
with open('3.txt') as f:
	for line in f:
		if(int(line) <= 20):
			ct += 1

print(ct)