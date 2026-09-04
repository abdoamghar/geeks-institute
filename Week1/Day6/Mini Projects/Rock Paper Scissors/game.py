import random

class Game:

    def get_user_item(self):
        while True:
            print("\n-----------------------------------------------------")
            print("Select: (r)ock, (p)aper, (s)cissors")

            user_item = input("Enter your move: ").strip().lower()

            if user_item in ["r", "p", "s"]:
                return user_item

            print("Invalid move. Please enter r, p, or s.")

    def get_computer_item(self):
        return random.choice(["r", "p", "s"])

    def get_game_result(self, user_item, computer_item):

        rules = {
            "r": "s",
            "p": "r",
            "s": "p"
        }

        if user_item == computer_item:
            return "draw"

        elif rules[user_item] == computer_item:
            return "win"

        else:
            return "loss"

    def play(self):

        user_item = self.get_user_item()

        computer_item = self.get_computer_item()

        result = self.get_game_result(user_item, computer_item)

        names = {
            "r": "rock",
            "p": "paper",
            "s": "scissors"
        }

        user_name = names[user_item]
        computer_name = names[computer_item]

        print("\n-----------------------------------------------------")
        print(f"You selected:      {user_name}")
        print(f"Computer selected: {computer_name}")

        if result == "win":
            print("Result:            You won")

        elif result == "draw":
            print("Result:            It's a draw")

        else:
            print("Result:            You lost")

        print("-----------------------------------------------------")


        return result