import time
import os


class Cell:
    def __init__(self, alive=False):
        self.alive = alive


class Game:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols

        self.grid = [
            [Cell() for _ in range(cols)]
            for _ in range(rows)
        ]

    def display(self, generation):
        print(f"╔{'══' * self.cols}╗")
        print(f"║ Generation: {generation:<{self.cols * 2 - 12}}║")

        for row in self.grid:
            print("║" + "".join("██" if cell.alive else "  " for cell in row) + "║")

        print(f"╚{'══' * self.cols}╝")
        
    def set_cell(self, row, col):
        self.grid[row][col].alive = True

    def count_neighbors(self, row, col):
        count = 0

        for row_change in [-1, 0, 1]:
            for col_change in [-1, 0, 1]:

                if row_change == 0 and col_change == 0:
                    continue

                new_row = row + row_change
                new_col = col + col_change

                if 0 <= new_row < self.rows and 0 <= new_col < self.cols:
                    if self.grid[new_row][new_col].alive:
                        count += 1

        return count

    def next_state(self, row, col):
        alive_neighbors = self.count_neighbors(row, col)
        cell = self.grid[row][col]

        if cell.alive:
            if alive_neighbors < 2 or alive_neighbors > 3:
                return False
            else:
                return True
        else:
            if alive_neighbors == 3:
                return True
            else:
                return False

    def next_generation(self):
        next_grid = []

        for row in range(self.rows):
            new_row = []

            for col in range(self.cols):
                new_alive = self.next_state(row, col)
                new_cell = Cell(new_alive)
                new_row.append(new_cell)

            next_grid.append(new_row)

        self.grid = next_grid

    def run(self, generations):
        print("\033[2J\033[H", end="")

        for generation in range(generations):
            print("\033[H", end="")

            self.display(generation + 1)

            self.next_generation()

            time.sleep(0.2)


game = Game(15, 15)

game.set_cell(1, 2)
game.set_cell(2, 3)
game.set_cell(3, 1)
game.set_cell(3, 2)
game.set_cell(3, 3)

game.run(200)