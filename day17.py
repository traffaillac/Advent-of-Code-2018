from itertools import count
from re import findall
from sys import setrecursionlimit, stdin

grid = [['.'] * 1000]
grid[0][500] = '+'
xmin, xmax, ymin = 499, 502, 1000
for l in stdin:
	fixed, f, ranged, r0, r1 = findall(r'^([xy])=(\d+), ([xy])=(\d+)\.\.(\d+)$', l)[0]
	x0, x1, y0, y1 = map(int, (f, f, r0, r1) if fixed == 'x' else (r0, r1, f, f))
	xmin, xmax, ymin = min(xmin, x0 - 1), max(xmax, x1 + 2), min(ymin, y0)
	if y1 >= len(grid):
		grid += [['.'] * 1000 for _ in range(y1 + 1 - len(grid))]
	for y in range(y0, y1 + 1):
		for x in range(x0, x1 + 1):
			grid[y][x] = '#'

def plop(x, y):
	if y >= len(grid) or grid[y][x] == '|':
		return False
	if grid[y][x] != '.':
		return True
	grid[y][x] = '|'
	if not plop(x, y + 1):
		return False
	for x0 in count(x - 1, -1):
		if grid[y][x0] != '.': break
		grid[y][x0] = '|'
		if not plop(x0, y + 1): break
	for x1 in count(x + 1):
		if grid[y][x1] != '.': break
		grid[y][x1] = '|'
		if not plop(x1, y + 1): break
	if grid[y][x0] == grid[y][x1] == '#':
		grid[y][x0+1:x1] = ['~'] * (x1 - x0 - 1)
	return grid[y][x] == '~'

setrecursionlimit(2000)
plop(500, 1)
# for l in grid: print(''.join(l[xmin:xmax]))
print(sum(l.count('|') + l.count('~') for l in grid[ymin:]))
print(sum(l.count('~') for l in grid[ymin:]))
