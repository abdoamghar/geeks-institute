#exercise 5:
import random

def random_number(number):
    random_num = random.randint(1, 100)

    if number == random_num:
        print("Success, The numbers are the same")
    else:
        print("Fail")
        print("Your number:", number)
        print("Random number:", random_num)


random_number(50) # we can let the user input a number instead of hardcoding it by using input.

#exercise 6:
def make_shirt(size="large", text="I love Python"):
    print("The size of the shirt is", size, "and the text is", text)


# 4. Large shirt with the default message
make_shirt()

# 5. Medium shirt with the default message
make_shirt("medium")

# 6. Any size with a different message
make_shirt("small", "I love programming")

# 7. Bonus: keyword arguments
make_shirt(size="large", text="Python is awesome")
