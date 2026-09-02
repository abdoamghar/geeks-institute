#exercise 1:
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'


class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    pass

all_cats = [
    Bengal("Kitty", 3),
    Chartreux("Fluffy", 2),
    Siamese("Mittens", 4)
]

sara_pets = Pets(all_cats)
sara_pets.walk()

#exercise 2:
class Dog():
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        if self.run_speed() * self.weight > other_dog.run_speed() * other_dog.weight:
            return f"{self.name} won the fight against {other_dog.name}"
        else:
            return f"{other_dog.name} won the fight against {self.name}"

dog1 = Dog("Rex", 5, 30)
dog2 = Dog("Buddy", 3, 20)
dog3 = Dog("Max", 4, 25)
print(dog1.bark())
print(dog1.run_speed())
print(dog1.fight(dog2))
print(dog2.fight(dog3))

#exercise 3:
class Family():
    def __init__(self, members, last_name):
        self.members = members
        self.last_name = last_name

    def born(self, **kwargs):
        new_member = {"name": kwargs.get("name"), "age": kwargs.get("age")}
        self.members.append(new_member)
        print(f"congratulations! {new_member['name']} has been born into the {self.last_name} family.")

    def is_18(self, name):
        for member in self.members:
            if member["name"] == name:
                return member["age"] >= 18
        return False

    def family_presentation(self):
        print(f"The {self.last_name} family has the following members:")
        for member in self.members:
            print(f"{member['name']}, age {member['age']}")

family1 = Family([
    {'name':'Michael','age':35,'gender':'Male','is_child':False},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False}
]
, "Amghar")

family1.born(name="silya", age=0)
print(family1.is_18(name="Sarah"))
family1.family_presentation()

#exercise 4:
class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member["name"] == name:
                if self.is_18(name):
                    print(f"{member['name']} can use their power: {member['power']}")
                else:
                    print(f"{member['name']} is not old enough to use their power.")
                return

    def incredible_presentation(self):
        print("Here is our powerful family")
        super().family_presentation()


family = TheIncredibles(
    [
        {
            "name": "Michael",
            "age": 35,
            "gender": "Male",
            "is_child": False,
            "power": "fly",
            "incredible_name": "MikeFly"
        },
        {
            "name": "Sarah",
            "age": 32,
            "gender": "Female",
            "is_child": False,
            "power": "read minds",
            "incredible_name": "SuperWoman"
        }
    ], "Incredibles"
)

family.incredible_presentation()

family.born(
    name="Jack",
    age=0,
    gender="Male",
    is_child=True,
    power="Unknown Power",
    incredible_name="Baby Jack"
)

family.incredible_presentation()

family.use_power("Michael")
family.use_power("Jack")