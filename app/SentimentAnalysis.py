from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize NLTK's SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    subject = data.get('subject', '')

    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)
   
    # Filter sentences that contain the subject
    relevant_sentences = [sentence for sentence in sentences if subject.lower() in sentence.lower()]
   
    # Analyze the sentiment of each relevant sentence
    sentiment_scores = [sia.polarity_scores(sentence) for sentence in relevant_sentences]
   
    avg_scores = {
        'neg': sum(score['neg'] for score in sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0,
        'neu': sum(score['neu'] for score in sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0,
        'pos': sum(score['pos'] for score in sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0,
        'compound': sum(score['compound'] for score in sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0
    }

    return jsonify(avg_scores)

if __name__ == '__main__':
    app.run(port=5000)  # Choose an appropriate port number
