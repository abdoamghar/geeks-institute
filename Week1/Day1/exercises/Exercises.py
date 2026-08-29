#exercise 1:
print("Hello world\nHello world\nHello world\nHello world")

#exercise 2:
result = (99 ** 3) * 8
print(result)

#exercise 3:
name = input("What is your name? :")

if name.lower() == "abdelhamid":
	print("Abdelhamid Of course. The legend has entered the chat")

else:
	print(f"Nice to meet you, {name}, but let's be honest... you're not Abdelhamid. Try to keep up")

#exercise 4:
height = int(input("What is your height in cm? "))
if height > 145:
	print("You are tall enough to ride the roller coaster.")
else:
	print("Sorry, you are not tall enough to ride the roller coaster.")

#exercise 5:
my_fav_numbers = {7, 8, 4, 10, 20}
my_fav_numbers.add(80)
my_fav_numbers.add(35)
my_fav_numbers.remove(35) #technically we cant remove the last number because a set doesn't have a "last value" because sets are unordered.
friend_fav_numbers = {3, 5, 1, 12, 17}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

#exercise 6:
# No, it is not possible to add integers directly to a tuple because tuples are immutable.

#exercise 7:
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
basket.count("Apples")
basket.clear()
print(basket)

#exercise 8:
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
	sandwich_orders.remove("Pastrami sandwich")

finished_sandwiches = []
while sandwich_orders:
	sandwich = sandwich_orders.pop()
	finished_sandwiches.append(sandwich)

print("Finished sandwiches:")
for sandwich in finished_sandwiches:
	print(f"I made your {sandwich}")