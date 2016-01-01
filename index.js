'use strict';

/*
 * index.js
 *
 * New Age Bullshit Generator
 * © 2014-15 Seb Pearce (sebpearce.com)
 * Licensed under the MIT License.
 *
 */

const util = require('./lib/util');

const SENTENCE_PATTERNS = require('./lib/patterns');
const BS_WORDS = require('./lib/vocab');

// The generator in all its quantum glory
module.exports = {
  sentencePool: [],

  initializeSentencePool() {
    this.sentencePool = [];
    this.sentencePool = util.copyArrayOfArrays(SENTENCE_PATTERNS);
  },

  removeSentenceFromPool(topic, el) {
    if (el > -1) {
      this.sentencePool[topic].splice(el, 1);
    }
  },

  retrieveRandomWordOfType(type) {
    const rand = util.randomInt(BS_WORDS[type].length - 1);
    return BS_WORDS[type][rand];
  },

  generateSentence(topic) {
    const patternNumber = util.randomInt(this.sentencePool[topic].length - 1);
    let pattern = this.sentencePool[topic][patternNumber];

    if (typeof pattern === 'undefined') {
      /* eslint-disable no-console */
      console.log('ran out of pattern ' + patternNumber);
      /* eslint-disable */
    }

    // insert a space before . , ; ? so we can split the string into an array
    pattern = pattern.replace(/([\.,;\?])/g, ' $1');
    pattern = pattern.split(' ');

    // remove the pattern from the sentence pool so it can't be re-used
    this.removeSentenceFromPool(topic, patternNumber);

    // remove the topic from the sentence pool if there are no sentences left
    // for that particular topic
    if (this.sentencePool[topic].length === 0) {
      this.sentencePool.splice(topic, 1);
    }

    let result = '';
    for (const x in pattern) {
      // if word matches one of the placeholder words (e.g. nPerson),
      // replace it with a random instance of its type (e.g. warrior)
      if (BS_WORDS.hasOwnProperty(pattern[x])) {
        result += this.retrieveRandomWordOfType(pattern[x]);
      } else {
        result += pattern[x];
      }
      result += ' ';
    }

    // replace 'a [vowel]' with 'an [vowel]'
    // I added a \W before the [Aa] because one time I got
    // 'Dogman is the antithesis of knowledge' :)
    result = result.replace(/(^|\W)([Aa]) ([aeiou])/g, '$1$2n $3');

    result = result.trim();
    result = util.capitalizeFirstLetter(result);

    // remove spaces before commas/periods/semicolons
    result = result.replace(/ ([,\.;\?])/g, '$1');
    // take care of prefixes (delete the space after the hyphen)
    result = result.replace(/- /g, '-');
    // add space after question marks if they're mid-sentence
    result = result.replace(/\?(\w)/g, '? $1');

    return result;
  },

  generateText(numberOfSentences, sentenceTopic) {
    this.initializeSentencePool();

    let fullText = '';
    let topic = sentenceTopic;

    for (let i = 0; i < numberOfSentences; i++) {
      fullText += this.generateSentence(topic);
      // if the topic has been deleted, pick another topic
      if (typeof this.sentencePool[topic] === 'undefined') {
        topic = util.randomInt(this.sentencePool.length - 1);
      }
    }

    // insert a space between sentences (after periods and question marks)
    fullText = fullText.replace(/([\.\?])(\w)/g, '$1 $2');

    return fullText;
  },

};
