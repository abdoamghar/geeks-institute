import numpy as np
import matplotlib.pyplot as plt
import keras


(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
one_hot_y_train = keras.utils.to_categorical(y_train, 10)
one_hot_y_test = keras.utils.to_categorical(y_test, 10)

x_train = x_train.reshape(-1, 28 * 28).astype("float32") / 255.0
x_test = x_test.reshape(-1, 28 * 28).astype("float32") / 255.0

model = keras.models.Sequential([
    keras.layers.Input(shape=(28 * 28,)),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(10, activation="softmax"),
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
history = model.fit(
    x_train,
    one_hot_y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.1,
)

plt.figure(figsize=(10, 4))
predictions = model.predict(x_test, verbose=0)
predicted_classes = np.argmax(predictions, axis=1)

for i in range(5):
    plt.subplot(1, 5, i + 1)
    plt.imshow(x_test[i].reshape(28, 28), cmap="gray")
    plt.title(f"True: {y_test[i]}\nPredicted: {predicted_classes[i]}")
    plt.axis("off")
plt.show()

epochs = range(1, len(history.history["loss"]) + 1)
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(epochs, history.history["loss"], label="Training loss")
plt.plot(epochs, history.history["val_loss"], label="Validation loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(epochs, history.history["accuracy"], label="Training accuracy")
plt.plot(epochs, history.history["val_accuracy"], label="Validation accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.tight_layout()
plt.show()

test_loss, test_accuracy = model.evaluate(x_test, one_hot_y_test, verbose=0)
print(f"Test accuracy: {test_accuracy:.4f}")
print(f"Test loss: {test_loss:.4f}")

confusion_matrix = np.zeros((10, 10), dtype=int)
np.add.at(confusion_matrix, (y_test, predicted_classes), 1)

plt.figure(figsize=(8, 6))
plt.imshow(confusion_matrix, cmap="Blues")
plt.colorbar(label="Number of images")
plt.xticks(range(10))
plt.yticks(range(10))
plt.xlabel("Predicted digit")
plt.ylabel("True digit")
plt.title("MNIST Confusion Matrix")
plt.tight_layout()
plt.show()

correct_by_digit = np.diag(confusion_matrix)
total_by_digit = confusion_matrix.sum(axis=1)
accuracy_by_digit = correct_by_digit / total_by_digit
hardest_accuracy = accuracy_by_digit.min()
hardest_digits = np.flatnonzero(accuracy_by_digit == hardest_accuracy)

print("Per-digit accuracy:")
for digit, accuracy in enumerate(accuracy_by_digit):
    print(f"Digit {digit}: {accuracy:.4f}")
print(
    "Digits with the lowest accuracy: "
    + ", ".join(
        f"{digit} ({accuracy_by_digit[digit]:.4f})" for digit in hardest_digits
    )
)