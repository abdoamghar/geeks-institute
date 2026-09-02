import os
import time


class Cell:
    def __init__(self, alive=False):
        self.alive = alive


class Game:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.grid = [[Cell() for _ in range(cols)] for _ in range(rows)]

    def add_pattern(self, pattern, row, col):
        for r, c in pattern:
            if 0 <= row + r < self.rows and 0 <= col + c < self.cols:
                self.grid[row + r][col + c].alive = True

    def display(self, generation):
        os.system("cls" if os.name == "nt" else "clear")

        print(f"Conway's Game of Life - R-Pentomino")
        print(f"Generation: {generation}\n")

        print("┌" + "───" * self.cols + "┐")

        for row in self.grid:
            print("│" + "".join(
                "███" if cell.alive else "   "
                for cell in row
            ) + "│")

        print("└" + "───" * self.cols + "┘")

    def count_neighbors(self, row, col):
        count = 0

        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                if dr == 0 and dc == 0:
                    continue

                r = row + dr
                c = col + dc

                if 0 <= r < self.rows and 0 <= c < self.cols:
                    if self.grid[r][c].alive:
                        count += 1

        return count

    def next_state(self, row, col):
        neighbors = self.count_neighbors(row, col)

        if self.grid[row][col].alive:
            return neighbors in (2, 3)

        return neighbors == 3

    def next_generation(self):
        self.grid = [
            [Cell(self.next_state(r, c)) for c in range(self.cols)]
            for r in range(self.rows)
        ]

    def snapshot(self):
        return tuple(
            tuple(cell.alive for cell in row)
            for row in self.grid
        )

    def count_alive(self):
        return sum(
            cell.alive
            for row in self.grid
            for cell in row
        )

    def run(self, generations=100, speed=0.1):
        seen = {self.snapshot(): 0}

        for generation in range(generations + 1):
            self.display(generation)
            time.sleep(speed)

            if self.count_alive() == 0:
                print("\nAll cells died.")
                return

            self.next_generation()

            current = self.snapshot()

            if current in seen:
                period = generation + 1 - seen[current]

                if period == 1:
                    print("\nStill life detected.")
                else:
                    print(f"\nOscillator detected - period {period}.")

                return

            seen[current] = generation + 1


R_PENTOMINO = [
    (0, 1),
    (0, 2),
    (1, 0),
    (1, 1),
    (2, 1)
]


game = Game(15, 25)

game.add_pattern(
    R_PENTOMINO,
    6,
    10
)

game.run(100, 0.1)