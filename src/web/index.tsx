/// <reference path="../../typings/main.d.ts" />
import React = require('react');
import ReactDom = require('react-dom');
import {Example} from './Example';

ReactDom.render(
    <Example input="write 1?"/>,
    document.getElementById('examples-react')
);