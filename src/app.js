import fetch from 'fetch-jsonp';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import cash from 'cash-dom';
import './style.css';

const options = {
  minChars: 2
};

const elements = {
  input: cash('.search-input'),
  results: cash('.results')
};

function init() {
  const searcher = Observable.fromEvent(elements.input, 'keyup')
    .map(event => event.target.value)
    .filter(filterSearchByConditions)
    .debounceTime(300)
    .throttleTime(300)
    .distinctUntilChanged()
    .switchMap(search);

  searcher.subscribe(response => {
    elements.results.empty();
    if (response.suggestions.length) {
      elements.results.append(
        response.suggestions.map(item =>
          cash('<li>').html(item._highlight.suggestion)
        )
      );
    }
  });
}

function search(term) {
  return fetch(`http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${term}`)
    .then(response => response.json());
}

function filterSearchByConditions(query) {
  console.log('query');

  const condition = query.length >= options.minChars;
  if (!condition) elements.results.empty();
  return condition;
}

document.addEventListener('DOMContentLoaded', init);
