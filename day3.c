#include <stdio.h>

static char claims[1000][1000];

int main() {
	int x, y, w, h;
	while (scanf("#%*d @ %d,%d: %dx%d\n", &x, &y, &w, &h) == 4) {
		for (int i = y; i < y + h; i++) {
			for (int j = x; j < x + w; j++)
				claims[i][j]++;
		}
	}
	rewind(stdin);
	int id;
	while (scanf("#%d @ %d,%d: %dx%d\n", &id, &x, &y, &w, &h) == 5) {
		int overlap = 0;
		for (int i = y; i < y + h; i++) {
			for (int j = x; j < x + w; j++)
				overlap += claims[i][j] > 1;
		}
		if (overlap == 0)
			printf("%d\n", id);
	}
	
	int num = 0;
	for (int i = 0; i < 1000; i++) {
		for (int j = 0; j < 1000; j++)
			num += claims[i][j] > 1;
	}
	printf("%d\n", num);
	return 0;
}
