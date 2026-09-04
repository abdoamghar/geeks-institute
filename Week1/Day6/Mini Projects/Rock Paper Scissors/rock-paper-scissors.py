from game import Game


def get_user_menu_choice():

    print("\nMenu:")
    print("(g) Play a new game")
    print("(s) Show scores")
    print("(x) Quit")

    choice = input("\n: ").strip().lower()

    return choice


def print_results(results):

    print("\n-----------------------------------------------------")
    print("                 GAME RESULTS")
    print("-----------------------------------------------------")

    print(f"You won:  {results['win']} times")
    print(f"You lost: {results['loss']} times")
    print(f"You drew:  {results['draw']} times")

    print("-----------------------------------------------------")
    print("Thank you for playing")
    print("-----------------------------------------------------")


def main():

    results = {
        "win": 0,
        "loss": 0,
        "draw": 0
    }

    while True:

        choice = get_user_menu_choice()

        if choice not in ["g", "s", "x"]:
            print("\nInvalid choice. Please select g, s, or x.")
            continue

        if choice == "g":

            game = Game()

            result = game.play()

            results[result] += 1

        elif choice == "s":

            print_results(results)

        elif choice == "x":

            print_results(results)

            break

main()