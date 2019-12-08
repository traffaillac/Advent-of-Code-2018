from heapq import heappush, heappop
from itertools import count
from sys import stdin, exit



adj = ((-1, 0), (0, -1), (0, 1), (1, 0))

def target(grid, points, r, c, e):
	return min(((points[r+i][c+j], r+i, c+j) for i, j in adj if grid[r+i][c+j] == e), default=(0, 0, 0))

def battle(grid, attack):
	counts = {'E': sum(l.count('E') for l in grid), 'G': sum(l.count('G') for l in grid)}
	points = [[200] * len(l) for l in grid]
	for rounds in count():
		
		# iterate on living units
		units = [(r, c) for r in range(len(grid)) for c in range(len(grid[r])) if grid[r][c] == 'E' or grid[r][c] == 'G']
		for r, c in sorted(units):
			t = grid[r][c]
			if t == '.':
				continue
			e = 'G' if t == 'E' else 'E'
			
			# end of combat
			if counts[e] == 0:
				for r, l in enumerate(grid):
					print(''.join(l), end='  ')
					for c, t in enumerate(l):
						if t == 'E' or t == 'G':
							print(f' {t}({points[r][c]})', end='')
					print()
				outcome = rounds * sum(points[r][c] for r in range(len(grid)) for c in range(len(grid[r])) if grid[r][c] == 'E' or grid[r][c] == 'G')
				print(f'{attack} attack, {rounds} rounds, {counts["E"]} elves and {counts["G"]} goblins remain, outcome is {outcome}')
				return counts['E'], outcome
			
			# move
			if target(grid, points, r, c, e) == (0, 0, 0):
				visited = [[t != '.' for t in l] for l in grid]
				heap = [] # steps, r, c, first step
				for i, a in enumerate(adj):
					heappush(heap, (1, r+a[0], c+a[1], i))
				while heap:
					steps, i, j, orig = heappop(heap)
					if visited[i][j]:
						continue
					visited[i][j] = True
					if target(grid, points, i, j, e) != (0, 0, 0):
						grid[r][c] = '.'
						p = points[r][c]
						r += adj[orig][0]
						c += adj[orig][1]
						grid[r][c] = t
						points[r][c] = p
						break
					for a in adj:
						heappush(heap, (steps+1, i+a[0], j+a[1], orig))
			
			# attack
			p, i, j = target(grid, points, r, c, e)
			if p > 0:
				points[i][j] -= 3 if t == 'G' else attack
				if points[i][j] <= 0:
					counts[grid[i][j]] -= 1
					grid[i][j] = '.'



init = [list(l) for l in stdin.read().split('\n')]
goal = sum(l.count('E') for l in init)
for attack in count(4):
	elves, outcome = battle([l.copy() for l in init], attack)
	if elves == goal:
		break
