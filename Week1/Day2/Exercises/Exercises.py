#exercise 1:
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

result = dict(zip(keys, values))
print(result)

#exercise 2:
family = {}
total_cost = 0

num_members = int(input("Enter the number of family members: "))
for x in range(num_members):
    name = input(f"Enter the name of the family member {x + 1}: ")
    age = int(input(f"Enter the age of the family member {x + 1}: "))
    family[name] = age

for name, age in family.items():
    if age < 3:
        cost = 0
    elif 3 <= age <= 12:
        cost = 10
    else:
        cost = 15
    total_cost += cost
    print(f"{name} has to pay ${cost}")

print(f"Total cost for the family: ${total_cost}")

#exercise 3:
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

brand["number_stores"] = 2
print(f"Zara's clients are {', '.join(brand['type_of_clothes'])}")

brand["country_creation"] = "Spain"
brand.pop("creation_date")
brand["international_competitors"].pop(-1)
print(*brand["major_color"]["US"])
print(len(brand))
print(brand.keys())

more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

brand.update(more_on_zara)
print(brand["number_stores"])
# when we added the more_on_zara dictionary to the brand dictionary, the value of "number_stores" was updated to 10000, which is the value from more_on_zara. The original value of 2 was overwritten.

#exercise 4:
def describe_city(city, country="Morocco"):
    print(city, "is in", country)


describe_city("Casablanca")

