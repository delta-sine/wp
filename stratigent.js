var word_processor = function(initialData){
  this.getSentences = function(){return initialData.split(/[\.|!|?][\s\S]/gi);};
  this.getWords = function(param){
    var s; //string to parse
    if(arguments.length == 0){s = initialData;}
    //check for optional argument, and that it's a number
    else if (arguments.length == 1 && typeof(param) == 'number')
      {s  = getSentences()[param]};
    //remove all extra spaces before  counting.
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    s = s.replace(/\.|\?|\!/gi,"");
    return s.split(' ');
  };
  this.getReversedSentences = function(){ return getSentences().reverse();};
  this.getReverseWords = function(){ return getWords().reverse();};
  this.countWordsBeginningWith = function(beginswith, linenumber){
    var count = 0, pattern;
    if(beginswith){pattern=new RegExp('^'+beginswith,'g');};
    if(arguments.length==1){
      var words = getWords();
      for(w in words){if(words[w].match(pattern)){count++}};
    }
    if(arguments.length == 2 && typeof(arguments[1]) == 'number'){
      var sentence = getSentences()[linenumber];
      for (w in sentence){if(sentence[w].match(pattern)){count++}};
    }
    return count;
  };
  this.getWordsSorted = function(sort_method, linenumber){
    /*
     * Supported sort methods:
     *  wlength = returns sorted list by word length, descending
     *  alpha   = returns sorted list by alphabetical order
     *  ralpha  = returns sorted list by reverse alphabetical order
     */
    var list;
    if(arguments.length==1){list = this.getWords();};
    if(arguments.length==2 && typeof(arguments[1])=='number'){list=this.getWords(linenumber);};
    switch (sort_method) {
          case 'wlength': list.sort(function(a, b){return b.length - a.length;});
            break;
          case 'alpha': list.sort();
            break;
          case 'ralpha': list.reverse();
            break;
    }
    return list;
  };
  this.convertWordToPigLatin = function(w){
    if(w[0].search(/[aeiouAEIOU]/) == -1){
      var pre = w.slice(0,w.search(/[aeiouAEIOU]/));
      var post = w.slice(pre, w.length);
      return post.slice(pre.length,post.length)+pre+'ay'
    }
    else if(w[0].search(/[aeiouAEIOU]/)> -1){w = w+'yay';};
    return w;
  };

  this.convertParagraphToPigLatin = function(){
    old_words = getWords();
    new_words = [];
    for (w in old_words){new_words.push(convertWordToPigLatin(old_words[w]));};
    return new_words.join(" ");
  };
}
