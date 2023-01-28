const fs = require('fs');
const { element } = require('parts-of-speech/lexicon');
var pos = require('pos');

const NOUN = 'NN'
const VERB = 'VB'
const AJD = 'JJ'
const ADV = 'RB'

const partOfSpeechAnalyse = (text) => {
  const stats = {
    noun: {
      count: 0,
      elements: [],
    },
    verb: {
      count: 0,
      elements: [],
    },
    adj: {
      count: 0,
      elements: [],
    },
    adv: {
      count: 0,
      elements: [],
    }
  }
  var words = new pos.Lexer().lex(text);
  var tagger = new pos.Tagger();
  var taggedWords = tagger.tag(words);
  
  taggedWords.forEach(ele => {
    if (ele[1].includes(NOUN)){
      stats.noun.elements.push(ele[0]);
    } else if (ele[1].includes(VERB)){
      stats.verb.elements.push(ele[0]);
    } if (ele[1].includes(ADV)){
      stats.adv.elements.push(ele[0]);
    } if (ele[1].includes(AJD)){
      stats.adj.elements.push(ele[0]);
    }
  })
  const arrayStats = Object.entries(stats);
  arrayStats.forEach(ele => stats[ele[0]].count = stats[ele[0]].elements.length)
  return stats;
}

const readFile = ({ filename, destination}) => fs
.readFileSync(`${destination}/${filename}`)
.toString()
.split('.');

const handleTextMining = (file)=>{
  let data  = readFile(file).map(element => element.split('\r')[0])
  const summery = {
    noun: 0,
    verb: 0,
    adj: 0,
    adv: 0,
  }

  const sentenceAnalysis = data.map(ele => {
    const data  = partOfSpeechAnalyse(ele)
    const arryStats = Object.entries(data);
    arryStats.forEach(ele => summery[ele[0]] += ele[1].count)
    return {sentence:ele,data}
  })
  return {summery,sentenceAnalysis};
}

module.exports = handleTextMining