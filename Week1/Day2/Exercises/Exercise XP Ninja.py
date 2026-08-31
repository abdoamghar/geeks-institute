#exercise 1:
manufacturers = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

manufacturers = manufacturers.split(", ")

print("Number of manufacturers:", len(manufacturers))

print("Manufacturers in reverse order:")
print(sorted(manufacturers, reverse=True))

o_count = sum("o" in manufacturer.lower() for manufacturer in manufacturers)
print("Manufacturers with the letter o:", o_count)

i_count = sum("i" not in manufacturer.lower() for manufacturer in manufacturers)
print("Manufacturers without the letter i:", i_count)


# Bonus 1
manufacturers = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

manufacturers = list(set(manufacturers))

print("Companies without duplicates:", ", ".join(manufacturers))
print("Number of companies:", len(manufacturers))


# Bonus 2
manufacturers.sort()

reversed_names = [manufacturer[::-1] for manufacturer in manufacturers]

print("Ascending order with reversed names:")
print(reversed_names)

#exercise 2:
def get_full_name(first_name, last_name, middle_name=None):
    if middle_name:
        return f"{first_name.title()} {middle_name.title()} {last_name.title()}"
    else:
        return f"{first_name.title()} {last_name.title()}"


print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

#exercise 3:
morse_code = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
    "Z": "--.."
}

reverse_morse = {value: key for key, value in morse_code.items()}


def english_to_morse(text):
    words = text.upper().split()
    morse_words = []

    for word in words:
        morse_word = " ".join(morse_code[letter] for letter in word)
        morse_words.append(morse_word)

    return " / ".join(morse_words)


def morse_to_english(morse):
    words = morse.split(" / ")
    english_words = []

    for word in words:
        letters = word.split()
        english_word = "".join(reverse_morse[letter] for letter in letters)
        english_words.append(english_word)

    return " ".join(english_words)


text = input("Enter English text: ")
morse = english_to_morse(text)

print("Morse:", morse)
print("English:", morse_to_english(morse))