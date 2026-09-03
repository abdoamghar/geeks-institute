from text_analyzer import TextAnalyzer

analyzer = TextAnalyzer("Python is fun and Python is powerful")

print(analyzer)
print(len(analyzer))
print(analyzer.word_count())
print(analyzer.count_word("Python"))

# test Exceptions

try:
    analyzer = TextAnalyzer("")
except Exception as e:
    print(e)

try:
    analyzer = TextAnalyzer("Python is fun")
    analyzer.count_word("")
except Exception as e:
    print(e)