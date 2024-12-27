export function tf(sentence: string, word: string): number {
    const words = sentence.split(/\s+/);
    const wordCount = words.length;
    let wordRepeated = 0;
    for (let i = 0; i < wordCount; i++) {
        if (words[i] === word) wordRepeated++;
    }
    return wordRepeated / wordCount;
}

export function df(sentences: { text: string }[], word: string): number {
    let count = 0;
    const wordLower = word;
    for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].text.includes(wordLower)) count++;
    }
    return count;
}

export function idf(numberOfSentences: number, documentFrequency: number): number {
    return Math.log(numberOfSentences / (1 + documentFrequency));
}

export function tf_idf(sentence: string, sentences: { text: string }[], query: string): number {
    const words = new Set(sentence.toLocaleLowerCase().split(/\s+/));
    let tfidf_sum = 0;
  
    for (let word of words) {
        if (query.includes(word)) {
            const tfValue = tf(sentence, word);
            const dfValue = df(sentences, word);
            const idfValue = idf(sentences.length, dfValue);
            tfidf_sum += tfValue * idfValue;
        }
    }
    return tfidf_sum;
}

export function rankSentencesByQuery(documents: { text: string }[], query: string): { index: number, score: number }[] {
    const queryLower = query.toLocaleLowerCase();
    const scores = documents.map((sentence, index) => {
        const score = tf_idf(sentence.text.toLowerCase(), documents, queryLower);
        return { index, score };
    });
    return scores.sort((a, b) => b.score - a.score);
}
