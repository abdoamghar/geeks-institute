#Challenge 1
number = int(input("Enter a number: "))
length = int(input("Enter a length: "))

multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)

print(f"number: {number} - length: {length} --> {multiples}")

#Challenge 2
text = input("Enter a string: ")

result = ""

for letter in text:
    if result == "" or letter != result[-1]:
        result = result + letter

print(f"user's word: {text} --> result: {result}")