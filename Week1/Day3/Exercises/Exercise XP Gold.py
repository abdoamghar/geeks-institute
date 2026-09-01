#exercise 1:
import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * self.radius ** 2

    def definition(self):
        print("A circle is a round shape where every point is the same distance from the center.")

#exercise 2:
import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reverse(self):
        return self.letters[::-1]

    def sort(self):
        return sorted(self.letters)

    def random_numbers(self):
        return [random.randint(1, 100) for x in self.letters]


mylist = MyList(["a", "b", "c", "d"])

#exercise 3:
# the code for this exercise is in the file menu_manager.py