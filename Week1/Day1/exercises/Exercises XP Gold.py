#exercise 1:
month = int(input("Enter a month (1-12): "))
if month in range(1, 13):
    if month in (3, 4, 5):
        print("you are in Spring")
    elif month in (6, 7, 8):
        print("you are in Summer")
    elif month in (9, 10, 11):
        print("you are in Autumn")
    elif month in (12, 1, 2):
        print("you are in Winter")
else:
    print("Invalid month number. Please enter a number between 1 and 12.")