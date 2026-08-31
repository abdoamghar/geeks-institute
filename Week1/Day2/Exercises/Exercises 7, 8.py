#exercise 7:
import random

def get_random_temp(season):

    if season == "winter":
        return random.uniform(-10, 16)
    elif season == "spring":
        return random.uniform(5, 25)
    elif season == "summer":
        return random.uniform(20, 40)
    elif season == "autumn":
        return random.uniform(5, 25)


def main():

    month = int(input("Enter the month number (1-12): "))

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    else:
        season = "autumn"

    temperature = round(get_random_temp(season), 1)

    print(f"The temperature right now is {temperature} degrees Celsius.")

    if temperature < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif temperature < 16:
        print("Quite chilly! Don't forget your coat.")
    elif temperature < 24:
        print("It's a nice temperature today!")
    elif temperature < 32:
        print("It's getting warm! Stay hydrated.")
    else:
        print("It's really hot! Stay cool and drink plenty of water.")


main()

#exercise 8:
data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]


# 1. Ask questions and check answers
def ask_questions():
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_answer = input(item["question"] + " ")

        if user_answer.lower() == item["answer"].lower():
            print("Correct!")
            correct += 1
        else:
            print("Incorrect!")
            incorrect += 1

            wrong_answers.append({
                "question": item["question"],
                "user_answer": user_answer,
                "correct_answer": item["answer"]
            })

    return correct, incorrect, wrong_answers


# 2. Inform the user of the results
def show_results(correct, incorrect):
    print("\nQuiz finished!")
    print("Correct answers:", correct)
    print("Incorrect answers:", incorrect)


# 3. Bonus: Display wrong answers and ask to play again
def main():
    correct, incorrect, wrong_answers = ask_questions()

    show_results(correct, incorrect)

    if wrong_answers:
        print("\nQuestions you got wrong:")

        for item in wrong_answers:
            print("\nQuestion:", item["question"])
            print("Your answer:", item["user_answer"])
            print("Correct answer:", item["correct_answer"])

    if incorrect > 3:
        play_again = input("\nYou got more than 3 answers wrong. Would you like to play again? (yes/no): ")

        if play_again.lower() == "yes":
            main()
        else:
            print("Thanks for playing")


main()