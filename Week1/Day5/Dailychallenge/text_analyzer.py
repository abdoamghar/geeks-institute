class TextAnalyzer:
    def __init__(self, text):
        if text == "":
            raise Exception("Text cannot be empty")
        self.text = text

    def __str__(self):
        return f"TextAnalyzer object with {self.word_count()} words"

    def __len__(self):
        return len(self.text)

    def word_count(self):
        return len(self.text.split())

    def count_word(self, word):
        if word == "":
            raise Exception("Word cannot be empty")
        return self.text.split().count(word)