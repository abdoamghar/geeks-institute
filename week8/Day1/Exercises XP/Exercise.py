#%%
# Exercise 1: Small Quiz
# 1. Traditional machine learning often depends on people to select or engineer useful
#    features, while deep learning learns useful features from data using multi-layer
#    neural networks.
# 2. ANNs are loosely inspired by the brain: connected artificial neurons receive inputs,
#    combine them using weights, and pass signals to other neurons. They are simplified
#    mathematical models, not exact copies of the brain.
# 3. Deep learning can learn complex patterns and increasingly useful representations
#    from many examples. More data helps it improve those representations, whereas
#    traditional methods may rely more on manually chosen features.
# 4. Challenges include needing large datasets and substantial computing power, long
#    training times, and difficulty interpreting some models. Address these with data
#    augmentation or transfer learning, efficient hardware and training methods, and
#    explainability techniques; regularization can also reduce overfitting.
# 5. Feature engineering is selecting, transforming, or creating input variables to
#    help a model learn. Deep learning can often learn useful features automatically
#    from raw or lightly processed data, so manual feature engineering is less necessary.
# 6. Hidden layers transform inputs into progressively more useful representations.
#    Multiple layers allow a model to learn hierarchical patterns, from simple to more
#    complex features.
# 7. An activation function applies a (usually nonlinear) transformation to a neuron's
#    weighted input. Nonlinearity lets the network learn complex relationships; without
#    it, stacked layers would behave like a single linear transformation.

# Exercise 2 : Building a Simple Perceptron Decision System

temperature_weight = 0.6
rain_weight = 0.4
bias = 2
threshold = 20


def perceptron_decision(temperature, rain):
    weighted_sum = (temperature * temperature_weight) + (rain * rain_weight) + bias
    output = 1 if weighted_sum > threshold else 0
    return weighted_sum, output


cases = [
    ("Case 1", 70, 0),
    ("Case 2", 50, 1),
]

for case_name, temperature, rain in cases:
    weighted_sum, output = perceptron_decision(temperature, rain)
    decision = "Yes, go outside" if output == 1 else "No, stay inside"
    print(f"{case_name}: weighted sum = {weighted_sum}, output = {output} ({decision})")

# Exercise 3: Building a Simple Neural Network for Classification
import keras
import numpy as np
from tensorflow.keras.datasets import mnist
import matplotlib.pyplot as plt

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 28 * 28).astype("float32") / 255.0
x_test = x_test.reshape(-1, 28 * 28).astype("float32") / 255.0

one_hot_y_train = keras.utils.to_categorical(y_train, 10)
one_hot_y_test = keras.utils.to_categorical(y_test, 10)


model = keras.models.Sequential([
    keras.layers.Input(shape=(28 * 28,)),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(10, activation="softmax"),
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
model.fit(x_train, one_hot_y_train, epochs=5, batch_size=32, validation_split=0.1)
predictions = model.predict(x_test)
plt.imshow(x_test[8].reshape(28, 28), cmap="gray")
predicted_label = np.argmax(predictions[8])
plt.title(f"Predicted label: {predicted_label}")
plt.show()

# Exercise 4 : Forward Propagation Calculation

square_footage = 2000
bedrooms = 3
square_footage_weight = 0.5
bedrooms_weight = 0.7
bias = 50000

z = square_footage * square_footage_weight + bedrooms * bedrooms_weight + bias
prediction = max(0, z)

print(f"Value before ReLU (z): {z}")
print(f"Predicted house price after ReLU: ${prediction:,.2f}")
