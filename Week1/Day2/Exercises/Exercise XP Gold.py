#exercise 1:
birthdays = {
    "ahmed": "1980/07/31",
    "abdelhamid": "2002/09/19",
    "meryem": "2005/03/01",
    "karim": "2010/05/25",
    "aymen": "1977/05/25"
}

print("Welcome!")
print("You can look up the birthdays of the people in the list!")

person = input("Enter a person's name: ")

birthday = birthdays[person]

print(f"{person}'s birthday is {birthday}.")

#exercise 2:
print("People in the list:")
for person in birthdays:
    print(person)

person = input("Enter a person's name: ")

if person in birthdays:
    print(f"{person}'s birthday is {birthdays[person]}.")
else:
    print(f"Sorry, we don't have the birthday information for {person}.")

#exercise 3:
def sum_x(x):
    x = str(x)
    return int(x) + int(x * 2) + int(x * 3) + int(x * 4)

print(sum_x(3))

#exercise 4:
import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    throws = 0

    while True:
        dice1 = throw_dice()
        dice2 = throw_dice()
        throws += 1

        if dice1 == dice2:
            break

    return throws

def main():
    results = []

    for i in range(100):
        results.append(throw_until_doubles())

    total_throws = sum(results)
    average_throws = total_throws / 100

    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")

main()