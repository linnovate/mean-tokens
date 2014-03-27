'use strict';

angular.module('mean').controller('TokensController', ['$scope', 'Global', 'Tokens',
	function($scope, Global, Tokens) {
		$scope.global = Global;

		$scope.create = function() {
			if (this.title) {
				var content = {};
				content[$scope.global.lang] = this.content;
				var categories = this.categories ? this.categories.split(',') : [];
				var token = new Tokens({
					title: this.title,
					content: content,
					categories: categories
				});
				token.$save(function(token) {
					if (token.title)
						$scope.global.tokens[token.title] = token;
				});

				this.title = '';
				this.content = '';
				this.categories = '';
			}
		};

		$scope.remove = function(token) {
			if (token) {
				token.$remove();
				delete $scope.global.tokens[token.title];
			}
		};

		$scope.update = function(token) {
			if (!token)
				token = $scope.token;
			if (!token.updated) {
				token.updated = [];
			}
			token.categories = token.categories ? this.categories.split(',') : [];
			token.updated.push(new Date().getTime());

			token.$update();
		};

		$scope.init = function() {
			$scope.sort = 'title';
			$scope.reverse = true;
			if (!$scope.global.langs)
				$scope.global.langs = ['en'];
			if (!$scope.global.lang)
				$scope.global.lang = 'en';

			if (!$scope.global.tokens) {
				$scope.global.tokens = {};
				var token = {};
				Tokens.query(function(tokens) {
					for (var i = 0; i < tokens.length; i++) {
						token = tokens[i];
						$scope.global.tokens[token.title] = token;
					}
				});
			}
		};

		$scope.isEmpty = function() {
			return (Object.keys($scope.global.tokens).length === 0);
		}
	}
]);

angular.module('mean.system').directive('meanToken', ['Global', 'Tokens',
	function(Global, Tokens) {
		return {
			restrict: 'A',
			templateUrl: 'mean-tokens/views/tokens.html',
			scope: {
				meanToken: '=',
				l: '='
			},
			replace: true,
			link: function(scope, elem, attrs) {
				scope.global = Global;
				if (!scope.global.lang)
					scope.global.lang = 'en';
				if (!scope.global.langs)
					scope.global.langs = ['en'];

				if (!scope.global.tokens) {
					scope.global.tokens = {};
					var token = {};
					Tokens.query(function(tokens) {
						for (var i = 0; i < tokens.length; i++) {
							token = tokens[i];
							scope.global.tokens[token.title] = token;
						}
					});
				}

				scope.$watch('l', function() {
					if (scope.l && !scope.lang)
						scope.lang = scope.l;
				});

				scope.$watch('global.lang', function() {
					if (scope.global.lang && !scope.lang)
						scope.lang = scope.global.lang;
				});

				scope.$watch('meanToken', function() {
					if (scope.meanToken) {
						if (!scope.global.tokens[scope.meanToken]) {
							var content = {};
							content[scope.lang] = scope.meanToken;
							var token = new Tokens({
								title: scope.meanToken,
								content: content
							});
							if (scope.global.user && scope.global.user.role === 'admin') {
								token.$save(function(token) {
									scope.global.tokens[token.title] = token;
								});
							}
						}
					}
				});

				scope.save = function() {
					if (scope.meanToken) {
						var token = scope.global.tokens[scope.meanToken];
						if (token) {
							if (!token.updated) {
								token.updated = [];
							}
							token.updated.push(new Date().getTime());

							token.$update(function(token) {
								if (!token.errors) {
									scope.global.tokens[token.title] = token;
								} else {
									alert(token.errors.content.message);
								}
							});
						}
					}
				}
			}
		};
	}
]);

angular.module('mean.system').directive('meanTokenEditable', ['Global',
	function(Global) {
		return {
			restrict: 'A',
			templateUrl: 'mean-tokens/views/tokens-editable.html',
			scope: {},
			replace: true,
			link: function(scope, elem, attrs) {
				scope.global = Global;
			}
		};
	}
]);

angular.module('mean.system').filter('textilizableContent', function() {
	return function(content) {
		if (content) {
			content = content.replace(/\n/g, '<br>');
			content = content.replace(/\*\}/g, '</strong>').replace(/\{\*/g, '<strong>');
			content = content.replace(/_\}/g, '</ins>').replace(/\{_/g, '<ins>');
			content = content.replace(/\+\}/g, '</em>').replace(/\{\+/g, '<em>');
			content = content.replace(/\#\}/g, '</li>').replace(/\{\#/g, '<li>');
			content = content.replace(/<\/li><br><li>/g, '<\/li><li>');
			content = content.replace(/!!\}/g, '</ol>').replace(/\{!!/g, '<ol>');
			content = content.replace(/!\}/g, '</ul>').replace(/\{!/g, '<ul>');

			//font size
			content = content.replace(/~\}/g, '</font>');
			content = content.replace(/\{~s~/g, '<font size="1">');
			content = content.replace(/\{~n~/g, '<font>');
			content = content.replace(/\{~l~/g, '<font size="4">');
			content = content.replace(/\{~h~/g, '<font size="6">');

			content = content.replace(/\]\}/g, '</a>').replace(/\{\[/g, '<a>');
			return '<div>' + content + '</div>';
		}
	}
});

angular.module('mean.system').filter('meanTokensToArray', function() {
	return function(input) {
		var out = [];
		for (var i in input) {
			out.push(input[i]);
		}
		return out;
	}
});

angular.module('mean.system').filter('meanTokensCategory', function() {
	return function(input, title, category) {
		if (title || category) {
			var out = [];
			for (var i = 0; i < input.length; i++) {
				if (input[i].categories && input[i].categories.join(',').match(category) && input[i].title.match(title))
					out.push(input[i]);
			}
			return out;
		} else {
			return input;
		}
	}
});