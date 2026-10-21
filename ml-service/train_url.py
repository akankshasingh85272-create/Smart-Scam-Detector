import pandas as pd
import re
import joblib
from urllib.parse import urlparse
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 1. Load dataset
df = pd.read_csv('datasets/url_dataset.csv')
df['label'] = df['label'].map({'legitimate': 0, 'phishing': 1})

# 2. Feature extraction function
def extract_features(url):
    parsed = urlparse(url)
    hostname = parsed.hostname or ''

    return {
        'length': len(url),
        'num_dots': url.count('.'),
        'num_hyphens': url.count('-'),
        'has_at_symbol': 1 if '@' in url else 0,
        'has_ip': 1 if re.match(r'^(http|https)://\d+\.\d+\.\d+\.\d+', url) else 0,
        'has_https': 1 if url.startswith('https') else 0,
        'num_digits': sum(c.isdigit() for c in url),
        'num_subdomains': hostname.count('.'),
        'suspicious_tld': 1 if hostname.split('.')[-1] in ['tk', 'ga', 'ml', 'cf', 'xyz', 'icu', 'top', 'ru'] else 0,
    }

# 3. Apply to every URL
features = df['url'].apply(extract_features).apply(pd.Series)
X = features
y = df['label']

print('Total URLs:', len(df))
print(df['label'].value_counts())

# 4. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 5. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
model.fit(X_train, y_train)

# 6. Evaluate
pred = model.predict(X_test)
print(classification_report(y_test, pred, target_names=['Legitimate', 'Phishing']))
print(confusion_matrix(y_test, pred))

# 7. Save model
joblib.dump(model, 'url_model.pkl')
print('URL model saved: url_model.pkl')