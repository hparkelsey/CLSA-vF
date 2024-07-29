from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Download the VADER lexicon if not already downloaded
nltk.download('vader_lexicon')
nltk.download('punkt')

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')
    subject = data.get('subject').lower()

    if not text or not subject:
        return jsonify({'error': 'Text and subject are required'}), 400

    # Initialize the sentiment intensity analyzer
    sia = SentimentIntensityAnalyzer()

    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Filter sentences that contain the subject
    relevant_sentences = [sentence for sentence in sentences if subject.lower() in sentence.lower()]

    # Analyze the sentiment of each relevant sentence
    sentiment_scores = [sia.polarity_scores(sentence) for sentence in relevant_sentences]

    avg_scores = average_sentiment_scores(sentiment_scores) if sentiment_scores else None

    return jsonify({
        'sentiment_scores': sentiment_scores,
        'avg_scores': avg_scores,
        'relevant_sentences': relevant_sentences
    })


def average_sentiment_scores(sentiment_scores):
    if not sentiment_scores:
        return None

    avg_scores = {
        'neg': sum(score['neg'] for score in sentiment_scores) / len(sentiment_scores),
        'neu': sum(score['neu'] for score in sentiment_scores) / len(sentiment_scores),
        'pos': sum(score['pos'] for score in sentiment_scores) / len(sentiment_scores),
        'compound': sum(score['compound'] for score in sentiment_scores) / len(sentiment_scores)
    }

    return avg_scores


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
