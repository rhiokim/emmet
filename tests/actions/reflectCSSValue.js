var assert = require('assert');
var editor = require('../stubs/editor');
var action = require('../../lib/action/reflectCSSValue');

describe('Reflect CSS Value action', function() {
	var run = function(content) {
		if (content) {
			editor.replaceContent(content);
		}
		action.reflectCSSValueAction(editor);
	};

	it('should work', function() {
		editor.setSyntax('css');
		
		run('a {p:1; -a-p:12${0}; -b-p:1; x:1;}');
		assert.equal(editor.getContent(), 'a {p:12; -a-p:12; -b-p:12; x:1;}');
		assert.equal(editor.getCaretPos(), 16);
		
		run('a {opacity: 0.5${0}; filter: alpha(opacity=60)}');
		assert.equal(editor.getContent(), 'a {opacity: 0.5; filter: alpha(opacity=50)}');
		
		run('a {border-top-left-radius: 10px${0}; -moz-border-radius-topleft: 5px;}');
		assert.equal(editor.getContent(), 'a {border-top-left-radius: 10px; -moz-border-radius-topleft: 10px;}');
		
		editor.setSyntax('html');
	});
});
