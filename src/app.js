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

const elements = {
  input: cash('.search-input'),
  results: cash('.results')
};

function init() {
  const searcher = Observable.fromEvent(elements.input, 'keyup')
    .map(event => event.target.value)
    .filter(query => {
      const doSearch = query.length >= 2;
      if (!doSearch) elements.results.empty();
      return doSearch;
    })
    .debounceTime(300)
    .throttleTime(300)
    .distinctUntilChanged()
    .switchMap(search);

  searcher.subscribe(response => {
    const [ titles, summaries, links ] = response.slice(1);
    elements.results.empty();
    titles.forEach((title, i) => elements.results.append(
      cash(getTemplate(title, links[i], summaries[i]))
    ));
  });
}

function search(term) {
  return fetch(`http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${term}`)
    .then(response => response.json());
}

function getTemplate(title, link, summary) {
  return `<li><a href="${link}"><span>${title}</span><span>${summary}</span></a></li>`;
}

document.addEventListener('DOMContentLoaded', init);
