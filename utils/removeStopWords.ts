// https://stackoverflow.com/questions/5631422/stop-word-removal-in-javascript
const stopwords = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
    'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and',
    'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
    'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
    'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren',
    'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn', 'mustn', 'needn', 'neednt', 'shan', 'shouldn',
    'wasn', 'weren', 'won', 'wouldn', 'isnt', 'wasnt', 'weren’t', 'hasnt', 'haven’t', 'hadn’t', 'shouldnt', 'wouldnt',
    'dont', 'doesnt', 'didnt', 'havent', 'hasnt', 'isnt', 'werent', 'arent', 'wont', 'cant', 'mustnt', 'noone', 'nobody',
    'nothing', 'none', 'nor', 'not', 'nothing', 'nowhere', 'someone', 'somebody', 'something', 'somewhere', 'anyone', 'anybody',
    'anything', 'anywhere', 'everybody', 'everything', 'everywhere', 'each', 'all', 'few', 'less', 'least', 'more', 'most',
    'much', 'several', 'such', 'many', 'never', 'always', 'often', 'usually', 'frequently', 'sometimes', 'rarely', 'once',
    'twice', 'whenever', 'whilst', 'besides', 'either', 'neither', 'one', 'ones', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'ten', 'hundred', 'thousand', 'million', 'billion', 'first', 'second', 'third', 'next', 'last', 'prev',
    'much', 'somewhat', 'so', 'thus', 'therefore', 'nevertheless', 'however', 'hence', 'otherwise', 'consequently', 'finally'
];


export function remove_stopwords(str:string) {
    const res = []
   const  words = str.split(' ')

    for(let i=0;i<words.length;i++) {
      const  word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
} 