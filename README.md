angular-backgroundSizer
=======================

A directive to automatically apply background sizing once an image is loaded. Useful for dynamic images
without predefined aspect ratios.

It will discreetly load the image into the DOM (invisible and absolute, so it doesn't jump the page),
take height measurements and then apply background-size 'contain', 'cover' or nothing. It also listens
to the window 'resize' event and appropriately adjusts the background-size if needed.

Load it into your AngularJS app by including it in your module's dependency array like so:

`var app = angular.module('myModule', ['backgroundSizer']);`

Then use it like this:

`<figure ng-style="{ 'background-image': 'url(' + image.url + ')' }" background-sizer="{{ image.url }}"></figure>`
