import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  tabs = [
    {
      value: 'html',
      label: 'HTML',
      panel:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      value: 'css',
      label: 'CSS',
      panel:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      panel:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ];
}
