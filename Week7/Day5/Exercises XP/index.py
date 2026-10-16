# %%
%pip install pandas
%pip install matplotlib
%pip install seaborn
%pip install scikit-learn


import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    classification_report,
    confusion_matrix,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import RobustScaler
from sklearn.svm import SVC
from sklearn.tree import plot_tree

df = pd.read_csv("data.csv")
display(df.head())

print("Missing values:")
print(df.isna().sum())
df = df.dropna(subset=["diagnosis"]).copy()

plt.figure(figsize=(6, 4))
sns.countplot(data=df, x="diagnosis", hue="diagnosis", palette="magma", legend=False)
plt.title("Count of samples by diagnosis")
plt.xlabel("Diagnosis (B = benign, M = malignant)")
plt.ylabel("Number of samples")
plt.tight_layout()
plt.show()

features = (
    df.drop(columns=["id", "diagnosis"], errors="ignore")
      .dropna(axis=1, how="all")
)

print("Diagnosis counts:")
print(df["diagnosis"].value_counts())

q1 = features.quantile(0.25)
q3 = features.quantile(0.75)
iqr = q3 - q1

outlier_counts = (
    ((features < q1 - 1.5 * iqr) | (features > q3 + 1.5 * iqr))
    .sum()
    .sort_values(ascending=False)
)

display(outlier_counts)

y = df["diagnosis"].map({"B": 0, "M": 1})
if y.isna().any():
    raise ValueError("Diagnosis contains values other than 'B' and 'M'.")

X = features

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.3,
    random_state=42,
    stratify=y,
)

models = {
    "Logistic Regression": make_pipeline(
        SimpleImputer(strategy="median"),
        RobustScaler(),
        LogisticRegression(max_iter=1000),
    ),
    "Random Forest": make_pipeline(
        SimpleImputer(strategy="median"),
        RandomForestClassifier(n_estimators=100, random_state=42),
    ),
    "Support Vector Machine (SVM)": make_pipeline(
        SimpleImputer(strategy="median"),
        RobustScaler(),
        SVC(),
    ),
}

results = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    results[name] = {
        "accuracy": accuracy_score(y_test, predictions),
        "predictions": predictions,
    }

    print(f"\n{name}")
    print(f"Accuracy: {results[name]['accuracy']:.3f}")
    print("Confusion matrix (B, M):")
    print(confusion_matrix(y_test, predictions, labels=[0, 1]))
    print(classification_report(
        y_test, predictions, labels=[0, 1],
        target_names=["Benign (B)", "Malignant (M)"],
    ))

accuracies = pd.Series(
    {name: result["accuracy"] for name, result in results.items()}
)
accuracies.plot(kind="bar", ylim=(0, 1), ylabel="Test accuracy", rot=15)
plt.title("Classifier accuracy comparison")
plt.tight_layout()
plt.show()

fig, axes = plt.subplots(1, len(results), figsize=(15, 4))
for ax, (name, result) in zip(axes, results.items()):
    ConfusionMatrixDisplay.from_predictions(
        y_test,
        result["predictions"],
        labels=[0, 1],
        display_labels=["Benign (B)", "Malignant (M)"],
        cmap="Blues",
        ax=ax,
        colorbar=False,
    )
    ax.set_title(name)

fig.suptitle("Confusion matrices on test data")
fig.tight_layout()
plt.show()

best_model_name = accuracies.idxmax()
print(
    f"\nBest model by test accuracy: {best_model_name} "
    f"({accuracies[best_model_name]:.3f})"
)

forest = models["Random Forest"].named_steps["randomforestclassifier"]
fig, ax = plt.subplots(figsize=(24, 12))
plot_tree(
    forest.estimators_[0],
    feature_names=X.columns,
    class_names=["Benign (B)", "Malignant (M)"],
    filled=True,
    rounded=True,
    max_depth=3,
    fontsize=8,
    ax=ax,
)
ax.set_title("Random Forest tree (first 3 levels)")
fig.tight_layout()
plt.show()
