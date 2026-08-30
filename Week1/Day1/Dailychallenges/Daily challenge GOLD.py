from datetime import datetime

birthdate = input("Enter your birthdate (DD/MM/YYYY): ")

birthdate = datetime.strptime(birthdate, "%d/%m/%Y")

today = datetime.today()

age = today.year - birthdate.year

# Check if birthday has happened this year
if (today.month, today.day) < (birthdate.month, birthdate.day):
    age -= 1

# Last digit of age = number of candles
candles = age % 10

cake = f"""{"i" * candles:^23}
       |:H:a:p:p:y:|
     __|___________|__
    |^^^^^^^^^^^^^^^^^|
    |:B:i:r:t:h:d:a:y:|
    |                 |
    ~~~~~~~~~~~~~~~~~~~"""

print(cake)

# Bonus: check if birth year was a leap year
if birthdate.year % 4 == 0 and (birthdate.year % 100 != 0 or birthdate.year % 400 == 0):
    print()
    print(cake)