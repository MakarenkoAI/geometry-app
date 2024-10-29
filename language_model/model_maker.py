import nltk
import numpy as np
import os
import pandas as pd

from keras._tf_keras.keras.models import Sequential, load_model
from keras._tf_keras.keras.layers import Dense, Dropout

from sklearn.feature_extraction.text import TfidfVectorizer

model = None
vectorizer = None
answers = []

def initialize_model():
    global model, vectorizer, answers
    data = pd.read_csv('language_model/data/geometry_qa.csv')
    questions = data['question'].tolist()
    answers = data['answer'].tolist()

    nltk.download('punkt')
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(questions).toarray()
    y = np.array([i for i in range(len(answers))])

    model_path = 'language_model/model/geometry_model.h5'

    if os.path.exists(model_path):
        model = load_model(model_path)
    else:
        model = Sequential([
            Dense(512, activation='relu', input_shape=(X.shape[1],)),
            Dropout(0.5),
            Dense(len(answers), activation='softmax')
        ])
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
        model.fit(X, y, epochs=20, batch_size=1)
        model.save(model_path)

def get_response(query):
    global vectorizer, model, answers
    query_vec = vectorizer.transform([query]).toarray()
    prediction = model.predict(query_vec)
    response_index = np.argmax(prediction)
    return answers[response_index]
