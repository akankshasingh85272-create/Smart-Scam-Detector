import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# 1. Load dataset 1: Phishing_Email.csv (your uploaded dataset)
df1 = pd.read_csv('datasets/Phishing_Email.csv')
df1 = df1[['Email Text', 'Email Type']]
df1.columns = ['text', 'label']
df1['label'] =df1['label'].map({'Safe Email': 0, 'Phishing Email': 1})

# 2. Load dataset 2: Indian scam samples (our own, smaller set)
df2 = pd.read_csv('datasets/indian_scam_samples.csv')
df2['label'] = df2['label'].map({'ham': 0, 'spam': 1})

#combine both of the datasets

df = pd.concat([df1, df2], ignore_index=True)

#cleaning: remove empty/missing rows
df = df.dropna(subset=['text', 'label'])
df = df[df['text'].str.strip().str.lower() != 'empty']
df = df[df['text'].str.strip() != '']
df = df.drop_duplicates(subset=['text'])

#Check how many data is still here
print('Total messages:', len(df))
print(df['label'].value_counts())

#5. Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
)
 
# 6. Convert text to numbers (TF-IDF)
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=10000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)
 
# 7. Train model
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train_vec, y_train)
 
# 8. Evaluate
pred = model.predict(X_test_vec)
print(classification_report(y_test, pred, target_names=['Safe', 'Scam']))
print(confusion_matrix(y_test, pred))
 
# 9. Save model
joblib.dump(model, 'model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')
print('Model saved: model.pkl, vectorizer.pkl')
 

