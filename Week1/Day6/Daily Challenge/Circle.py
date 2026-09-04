import math

class Circle:

    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            self.radius = 0

    def get_radius(self):
        return self.radius

    def get_diameter(self):
        return self.radius * 2

    def area(self):
        return math.pi * self.radius ** 2

    def __str__(self):
        return f"Circle: radius = {self.radius}, diameter = {self.get_diameter()}"

    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)

    def __gt__(self, other):
        return self.radius > other.radius

    def __eq__(self, other):
        return self.radius == other.radius


def draw_sorted_circles(circles):
    import turtle

    sorted_circles = sorted(circles, reverse=True)
    screen = turtle.Screen()
    screen.title("Sorted circles")
    pen = turtle.Turtle()
    pen.speed(0)
    pen.hideturtle()

    x_position = -300
    for circle in sorted_circles:
        pen.penup()
        pen.goto(x_position, 0)
        pen.setheading(0)
        pen.pendown()
        pen.circle(circle.get_radius())
        x_position += circle.get_diameter() + 20

    screen.mainloop()



circles = [Circle(radius=40), Circle(diameter=120), Circle(radius=25)]
draw_sorted_circles(circles)