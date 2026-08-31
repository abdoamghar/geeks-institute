
word = input("Enter a word: ")

letter_indexes = {}

for index, letter in enumerate(word):
    if letter in letter_indexes:
        letter_indexes[letter].append(index)
    else:
        letter_indexes[letter] = [index]

print(letter_indexes)

# enumerate(word) gives us both the index and the letter.
# The letter is used as the dictionary key.
# The index is stored inside a list.
# If the letter appears again, .append(index) adds the new index to its existing list.
