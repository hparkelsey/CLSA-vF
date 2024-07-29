import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

nltk.download('vader_lexicon')
nltk.download('punkt')

app = Flask(__name__)
CORS(app)

sid = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text')
    subject = data.get('subject')
    
    # Perform sentiment analysis (implement your logic here)
    sentences = nltk.sent_tokenize(text)
    scores = [sid.polarity_scores(sentence) for sentence in sentences]

    avg_scores = {
        "pos": sum(score['pos'] for score in scores) / len(scores),
        "neg": sum(score['neg'] for score in scores) / len(scores),
        "neu": sum(score['neu'] for score in scores) / len(scores),
        "compound": sum(score['compound'] for score in scores) / len(scores)
    }
    
    relevant_sentences = [sentence for sentence in sentences if subject.lower() in sentence.lower()]

    return jsonify(avg_scores=avg_scores, relevant_sentences=relevant_sentences)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))  # Changed to port 5001
    app.run(host='0.0.0.0', port=port, debug=True)
