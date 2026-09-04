def display_board(board):
    print("\nTIC TAC TOE")
    print("*" * 17)

    for row in board:
        print("*", " | ".join(row), "*")
        print("*" + "---|---|---" + "*")

    print("*" * 17)


def player_input(player, board):
    while True:
        try:
            row = int(input(f"Player {player}'s turn.\nEnter row: "))
            column = int(input("Enter column: "))

            if row < 1 or row > 3 or column < 1 or column > 3:
                print("Please enter numbers between 1 and 3.")
                continue

            row -= 1
            column -= 1

            if board[row][column] != " ":
                print("That square is already taken")
                continue

            return row, column

        except ValueError:
            print("Please enter numbers only.")


def check_win(board, player):
    for row in board:
        if row[0] == player and row[1] == player and row[2] == player:
            return True

    for column in range(3):
        if (board[0][column] == player and
            board[1][column] == player and
            board[2][column] == player):
            return True

    if (board[0][0] == player and
        board[1][1] == player and
        board[2][2] == player):
        return True

    if (board[0][2] == player and
        board[1][1] == player and
        board[2][0] == player):
        return True

    return False


def play():
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    current_player = "X"

    for turn in range(9):
        display_board(board)

        row, column = player_input(current_player, board)

        board[row][column] = current_player

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins")
            return

        if current_player == "X":
            current_player = "O"
        else:
            current_player = "X"

    display_board(board)
    print("It's a tie")


play()