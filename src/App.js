import React, { useState } from 'react';

const App = () => {
    const [result, setResult] = useState({});
    const [inputText, setInputText] = useState("");

    const excludedWords = ["the", "and", "what", "he", "she", "it", "do", "does"];

    const handleInput = (event) => {
        setInputText(event.target.value);
    }

    const analyzeText = async () => {
        const API_KEY = '38e2d3f94b1c497591e20b1d8332e2bd';
        const endpoint = 'https://mycognitive8779.cognitiveservices.azure.com/';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': API_KEY,
            },
            body: JSON.stringify({
                'documents': [
                    {
                        'language': 'en',
                        'id': '1',
                        'text': inputText,
                    },
                ],
            }),
        });

        const data = await response.json();
        setResult(data);
    }

    const getWords = () => {
        if (!result.documents) return;
        let wordFrequency = {};
        result.documents[0].keyPhrases.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        // removing unwanted keywords 
        for (let word of excludedWords) {
            if (wordFrequency[word]) {
                delete wordFrequency[word];
            }
        }

        let sortedWords = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        return sortedWords;
    }

    return (
        <div>
            <h1>Your SEO Words</h1>
            <textarea onChange={handleInput} />
            <button onClick={analyzeText}>Submit</button>
            <ul>
            {getWords().map((word, index) => 
              <li key={index}>{word[0]}: {word[1]}</li>)}
            </ul>
        </div>
    );
            }
export default App;
