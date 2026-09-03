#Exercise 1:
class PrintList():

    def __init__(self, my_list):
        self.my_list = my_list

    def __repr__(self):
        return str(self.my_list)


print_list_instance = PrintList(["a", "b", "c"])
print(print_list_instance.__repr__())

# the output is going to be: ['a', 'b', 'c']

#Exercise 2:
my_list = [2, 3, 1, 2, "four", 42, 1, 5, 3, "imanumber"]

def sum_numbers(numbers):
    total = 0

    for n in numbers:
        try:
            total += n
        except TypeError:
            pass

    return total

print(sum_numbers(my_list))

#Exercise 3:
# see the files operators.py and calculator.py




