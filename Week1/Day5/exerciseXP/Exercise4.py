import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "Day4" / "exerciseXP"))

from ExerciseXP import Dog
import random


class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        names = [self.name] + list(args)
        print(", ".join(names) + " all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))


dog1 = PetDog("Rex", 3, 20)
dog2 = Dog("Max", 4, 25)
dog3 = Dog("Buddy", 2, 15)

dog1.train()
dog1.play(dog2.name, dog3.name)
dog1.do_a_trick()


