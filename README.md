New Age Bullshit Generator
==========================

Extracted generator into a Node module from [sebpearce/bullshit](https://github.com/sebpearce/bullshit)

The main script ([index.js](index.js)) relies on two lists of words called [patterns](lib/patterns.js), which is a stock of sentence patterns made up of fixed words and variable words, and [vocab](lib/vocab.js), which contains these variable words.

For example, take this sentence pattern from [patterns](lib/patterns.js):

`This life is nothing short of a ing nOf of adj nMass`

Here there are 4 variable words: `ing`, `nOf`, `adj` and `nMass`.

The script looks inside `vocab.js` for those 4 words. In the case of `ing` (a present participle), it might choose "flowering" or "unveiling." For `nMass` (a mass noun), it might choose "consciousness," "growth" or "stardust."

It avoids duplicate sentences by making a copy of the entire pattern array found in [patterns](lib/patterns.js) at the start and removing each sentence as it is used.
