from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
import socket

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

def find_free_port(start_port=5000):
    """Find the next available port starting from `start_port`."""
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("", port))
                return port
            except OSError:
                port += 1

def get_active_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
    except Exception:
        ip_address = "127.0.0.1"  # Fallback to localhost
    finally:
        s.close()
    return ip_address

active_ip = get_active_ip()
port = find_free_port(5000)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == "__main__":
    print(f"Running on IP: {active_ip}, Port: {port}")
    app.run(debug=True, host=active_ip, port=port)
