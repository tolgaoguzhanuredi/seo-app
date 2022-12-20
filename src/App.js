import React, { useState } from 'react';

function App() {
  const [seoWords, setSeoWords] = useState([]);
  const [text, setText] = useState('');

  const handleTextInput = (event) => {
    setText(event.target.value);
  }

  const calculateTopWords = () => {
    // split the text into an array of words
    const words = text.split(' ');
    // create an object to store the frequency of each word
    const wordFrequency = {};
    // iterate over the array of words and increment the count for each word in the object
    for (const word of words) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
    // get an array of key-value pairs from the object
    const wordArray = Object.entries(wordFrequency);
    // sort the array in descending order by the frequency of the words
    wordArray.sort((a, b) => b[1] - a[1]);
    // get the top 5 most frequent words
    const topWords = wordArray.slice(0, 5);
    // update the state with the top words
    setSeoWords(topWords);
  }

  return (
    <div>
      <h1>Your SEO Words</h1>
      <textarea onChange={handleTextInput} />
      <button onClick={calculateTopWords}>Calculate</button>
      <ul>
        {seoWords.map(([word, frequency]) => (
          <li key={word}>{word}: {frequency}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
