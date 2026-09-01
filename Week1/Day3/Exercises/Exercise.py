#exercise 1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Whiskers", 3)
cat2 = Cat("Mittens", 5)
cat3 = Cat("Shadow", 2)

def oldest_cat(cat1, cat2, cat3):
    oldest = cat1
    if cat2.age > oldest.age:
        oldest = cat2
    if cat3.age > oldest.age:
        oldest = cat3
    return oldest

the_cat = oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {the_cat.name}, and it is {the_cat.age} years old.")

#exercise 2
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        return f"{self.name} goes woof"

    def jump(self):
        return f"{self.name} jumps {self.height * 2} cm high"

davids_dog = Dog("Rex", 50)
print(f"{davids_dog.name} is {davids_dog.height} cm tall {davids_dog.bark()} {davids_dog.jump()}")

sarahs_dog = Dog("Teacup", 20)
print(f"{sarahs_dog.name} is {sarahs_dog.height} cm tall {sarahs_dog.bark()} {sarahs_dog.jump()}")

if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger than {sarahs_dog.name}")
else:
    print(f"{sarahs_dog.name} is bigger than {davids_dog.name}")

#exercise 3
class Song:
    def __init__(self, lyrics):
        self.lyrics = list(lyrics)

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway= Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()

#exercise 4
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        for animal in self.animals:
            print(animal)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        animal_dict = {}
        for animal in sorted_animals:
            first_letter = animal[0]
            if first_letter not in animal_dict:
                animal_dict[first_letter] = []
            animal_dict[first_letter].append(animal)
        return animal_dict
    
    def get_groups(self):
        animal_dict = self.sort_animals()
        for letter, animals in animal_dict.items():
            print(f"{letter}: {', '.join(animals)}")

new_york_zoo = Zoo("New York Zoo")
new_york_zoo.add_animal(input("Which animal should we add to the zoo? : "))
new_york_zoo.get_animals()
new_york_zoo.sell_animal(input("Which animal should we sell from the zoo? : "))
new_york_zoo.sort_animals()
new_york_zoo.get_groups()