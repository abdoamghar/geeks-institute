#exercise 1:
# 3 <= 3 < 9
True
# 3 == 3 == 3
True
# bool(0)
False
# bool(5 == "5")
False
# bool(4 == 4) == bool("4" == "4")
True
# bool(bool(None))
False
# x = (1 == True) y = (1 == False) a = True + 4 b = False + 10
# --> x is True
# --> y is False
# --> a: 5
# --> b: 10

#exercise 2:
longest_sentence = ""

while True:
    sentence = input('Enter your longest sentence without the letter "A": ')

    if "a" in sentence.lower():
        print('Your sentence contains the letter "A".')
        break

    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print("Congratulations You have a new longest sentence")
        print("Length:", len(longest_sentence))

#exercise 3:
paragraph = """Technology has changed the way students learn. Computers, tablets, and the internet give students access to information quickly. Online classes and educational apps make learning more flexible and interactive. Technology also helps students work together on projects and communicate with teachers. However, too much screen time can be distracting. Students should use technology wisely and balance online learning with real-life activities."""

# Number of characters
characters = len(paragraph)

# Number of sentences
sentences = paragraph.count(".") + paragraph.count("!") + paragraph.count("?")

# Number of words
words = paragraph.split()
number_of_words = len(words)

# Number of unique words
unique_words = set(words)
number_of_unique_words = len(unique_words)

# Non-whitespace characters
non_whitespace = len(paragraph.replace(" ", ""))

# Average words per sentence
average_words = number_of_words / sentences

# Non-unique words
non_unique_words = number_of_words - number_of_unique_words

print("----- Paragraph Analysis -----")
print("Characters:", characters)
print("Sentences:", sentences)
print("Words:", number_of_words)
print("Unique words:", number_of_unique_words)
print("Non-whitespace characters:", non_whitespace)
print("Average words per sentence:", round(average_words, 2))
print("Non-unique words:", non_unique_words)



