#exercise 1:
month = int(input("Enter a month (1-12): "))
if month in range(1, 13):
    if month in (3, 4, 5):
        print("you are in Spring")
    elif month in (6, 7, 8):
        print("you are in Summer")
    elif month in (9, 10, 11):
        print("you are in Autumn")
    elif month in (12, 1, 2):
        print("you are in Winter")
else:
    print("Invalid month number. Please enter a number between 1 and 12.")

#exercise 2:
for i in range(1, 21):
    print(i)

for i in range(1, 21):
    if i % 2 == 1: # i hope "even index" (in the question) refers to position in the sequence, not the value itself.
        print(i)   # because the first number (1) is at index 0, which is even, the second number (2) is at index 1, which is odd, and so on.
                   # if not the correct code is if i % 2 == 0: print(i)

#exercise 3:
my_name = "Abdelhamid"

name = input("Enter your name: ").capitalize()

while name != my_name:
    name = input("Enter your name: ").capitalize()

print("Finally! Welcome, Abdelhamid.")

#exercise 4:
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

name = input("Enter your name: ").capitalize()

if name in names:
    print(names.index(name))
else:
    print("Your name is not in the list")

#exercise 5:
first_number = int(input("Enter the first number: "))
second_number = int(input("Enter the second number: "))
third_number = int(input("Enter the third number: "))

greatest = max(first_number, second_number, third_number)
print(f"The greatest number is: {greatest}")

#exercise 6:
import random
wins = 0
losses = 0

while True:
    user_number = int(input("Guess a number from 1 to 9 (or enter 0 to quit): "))

    if user_number == 0:
        break

    random_number = random.randint(1, 9)

    if user_number == random_number:
        print("Winner!")
        wins += 1
    else:
        print("Better luck next time.")
        losses += 1

print("Game over")
print("Total games won:", wins)
print("Total games lost:", losses)