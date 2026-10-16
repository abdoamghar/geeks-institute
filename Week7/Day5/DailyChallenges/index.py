# %%
%pip install pandas
%pip install matplotlib
%pip install seaborn
%pip install scikit-learn

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    confusion_matrix,
    precision_recall_fscore_support,
    roc_auc_score,
    roc_curve,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

df = pd.read_csv("diabetes_prediction_dataset.csv")
display(df.head())
df.info()

print("Missing values:")
print(df.isna().sum())
print("Duplicate rows:", df.duplicated().sum())
print("Diagnosis counts before cleaning:")
print(df["diabetes"].value_counts(dropna=False).sort_index())

df = df.drop_duplicates().dropna(subset=["diabetes"]).copy()
df = df[df["gender"].isin(["Female", "Male"])].copy()
df["gender"] = df["gender"].map({"Female": 0, "Male": 1})

print("Diagnosis counts used for modeling:")
print(df["diabetes"].value_counts().sort_index())
print(f"Rows after cleaning: {len(df)}")

plt.figure(figsize=(6, 4))
sns.countplot(data=df, x="diabetes", hue="diabetes", palette="magma", legend=False)
plt.title("Diabetes cases")
plt.xlabel("Diabetes (0 = no, 1 = yes)")
plt.ylabel("Number of people")
plt.tight_layout()
plt.show()

X = df.drop(columns="diabetes")
y = df["diabetes"].astype(int)

numeric_columns = X.select_dtypes(include="number").columns.tolist()
categorical_columns = ["smoking_history"]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            make_pipeline(
                SimpleImputer(strategy="median"),
                StandardScaler(),
            ),
            numeric_columns,
        ),
        (
            "smoking",
            make_pipeline(
                SimpleImputer(strategy="most_frequent"),
                OneHotEncoder(handle_unknown="ignore"),
            ),
            categorical_columns,
        ),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

print("Logistic Regression is a good baseline for this binary classification task.")
print("StandardScaler puts numeric features on comparable scales.")
model = make_pipeline(preprocessor, LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)
print(f"\nTest accuracy: {accuracy:.3f}")
print("Accuracy is the fraction of test predictions that were correct.")

plt.figure(figsize=(5, 4))
plt.bar(["Logistic Regression"], [accuracy], color="steelblue")
plt.ylim(0, 1)
plt.ylabel("Accuracy")
plt.title("Test accuracy")
plt.tight_layout()
plt.show()

matrix = confusion_matrix(y_test, predictions, labels=[0, 1])
tn, fp, fn, tp = matrix.ravel()
print(f"Correctly identified non-diabetes cases: {tn}")
print(f"Non-diabetes cases predicted as diabetes: {fp}")
print(f"Diabetes cases predicted as non-diabetes: {fn}")
print(f"Correctly identified diabetes cases: {tp}")
print("Pay particular attention to missed diabetes cases (false negatives).")

ConfusionMatrixDisplay(
    confusion_matrix=matrix,
    display_labels=["No diabetes", "Diabetes"],
).plot(cmap="Blues")
plt.title("Confusion matrix")
plt.tight_layout()
plt.show()

precision, recall, f1_score, _ = precision_recall_fscore_support(
    y_test,
    predictions,
    labels=[0, 1],
    zero_division=0,
)
metric_names = ["Precision", "Recall", "F1-score"]
class_metrics = pd.DataFrame(
    {
        "No diabetes (0)": [precision[0], recall[0], f1_score[0]],
        "Diabetes (1)": [precision[1], recall[1], f1_score[1]],
    },
    index=metric_names,
)
class_metrics.plot(kind="bar", ylim=(0, 1), figsize=(7, 4))
plt.ylabel("Score")
plt.title("Test metrics by class")
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()

print("The metric chart compares precision, recall and F1-score for both classes.")
print("For diabetes detection, recall for Diabetes (1) shows how many positive cases were found.")

diabetes_probabilities = model.predict_proba(X_test)[:, 1]
false_positive_rate, true_positive_rate, _ = roc_curve(
    y_test,
    diabetes_probabilities,
)
roc_auc = roc_auc_score(y_test, diabetes_probabilities)

plt.figure(figsize=(7, 5))
plt.plot(
    false_positive_rate,
    true_positive_rate,
    color="darkorange",
    label=f"Logistic Regression (AUC = {roc_auc:.3f})",
)
plt.plot([0, 1], [0, 1], linestyle="--", color="navy", label="Random guessing")
plt.xlim(0, 1)
plt.ylim(0, 1.05)
plt.xlabel("False positive rate")
plt.ylabel("True positive rate (recall)")
plt.title("ROC curve")
plt.legend(loc="lower right")
plt.tight_layout()
plt.show()

print(f"ROC AUC: {roc_auc:.3f}")

boundary_features = ["HbA1c_level", "blood_glucose_level"]
boundary_model = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000),
)
boundary_model.fit(X_train[boundary_features], y_train)
boundary_accuracy = accuracy_score(
    y_test,
    boundary_model.predict(X_test[boundary_features]),
)

plot_data = X_test[boundary_features].copy()
plot_data["diabetes"] = y_test
plot_data = plot_data.sample(min(3000, len(plot_data)), random_state=42)

x_min, x_max = X[boundary_features[0]].min(), X[boundary_features[0]].max()
y_min, y_max = X[boundary_features[1]].min(), X[boundary_features[1]].max()
grid_x, grid_y = np.meshgrid(
    np.linspace(x_min, x_max, 250),
    np.linspace(y_min, y_max, 250),
)
grid = pd.DataFrame(
    {
        boundary_features[0]: grid_x.ravel(),
        boundary_features[1]: grid_y.ravel(),
    }
)
regions = boundary_model.predict(grid).reshape(grid_x.shape)

plt.figure(figsize=(8, 6))
plt.contourf(grid_x, grid_y, regions, alpha=0.2, cmap="coolwarm")
for diagnosis, label, color in [
    (0, "No diabetes", "blue"),
    (1, "Diabetes", "red"),
]:
    rows = plot_data[plot_data["diabetes"] == diagnosis]
    plt.scatter(
        rows[boundary_features[0]],
        rows[boundary_features[1]],
        label=label,
        alpha=0.45,
        s=12,
        color=color,
    )
plt.xlabel("HbA1c level")
plt.ylabel("Blood glucose level")
plt.title(f"Two-feature decision boundary (accuracy: {boundary_accuracy:.3f})")
plt.legend()
plt.tight_layout()
plt.show()

print(
    f"Decision-boundary accuracy using only HbA1c and blood glucose: "
    f"{boundary_accuracy:.3f}"
)
print("This boundary plot uses two features for visualization; the main model uses all features.")
