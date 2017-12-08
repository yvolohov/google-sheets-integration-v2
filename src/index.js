import m from 'mithril';
import PageSet from './components/page-set';

let pageSet = new PageSet();

m.render(document.getElementById('content'), m(pageSet));
