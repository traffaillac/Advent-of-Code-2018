from itertools import count
from sys import stdin

adj = ((0,-1), (1,-1), (1,0), (1,1), (0,1), (-1,1), (-1,0), (-1,-1))
def iterate(grid):
	new = []
	for y in range(len(grid)):
		line = ''
		for x in range(len(grid[y])):
			counts = {'.': 0, '|': 0, '#': 0}
			for i, j in adj:
				if 0 <= y+j < len(grid) and 0 <= x+i < len(grid[y+j]):
					counts[grid[y+j][x+i]] += 1
			a = grid[y][x]
			line += ('|' if counts['|'] >= 3 else '.') if a == '.' else \
				('#' if counts['#'] >= 3 else '|') if a == '|' else \
				('#' if counts['#'] >= 1 and counts['|'] >= 1 else '.')
		new.append(line)
	return tuple(new)
			
grid = tuple(stdin.read().split())
explored = {grid: 0}
for i in count(1):
	grid = iterate(grid)
	j = explored.setdefault(grid, i)
	if j != i:
		print(f'Loop from {j} to {i}!')
		break
for k in range((1_000_000_000 - j) % (i - j)):
	grid = iterate(grid)
print(sum(l.count('|') for l in grid) * sum(l.count('#') for l in grid))
