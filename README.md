# `nossa`

## About

HTML5 required attribute is great, it makes front side validation of form fields
a piece of cake. But there is a missing piece.

While a user won't be able to submit a form that has nothing entered in required
fields, the validation can be bypassed with whitespace characters by tapping the
space bar.

NOSSA, short for "No Starting Space Allowed" prevents that by ensuring all
inputs and textareas values cannot be started with a whitespace.

[See Demo](https://engrtitus.github.io/nossa/example/)

## Install

```
npm install nossa
```

Or for a CDN version, you can use it on [unpkg.com](https://unpkg.com/nossa)

```
<script src ="https://unpkg.com/nossa"/>
```

## Usage

```js
import "nossa"; // or using the CDN version
```

This should be imported in your index.js.

A user won't be able to enter values like below in all your project's input and
textarea.

```
 "  "
 "  john doe"
```

If you'll like to exempt a particular input or textarea (i.e allow values that
start with whitespace), you can add nossa-ignore class to the it like so.

```
 <input class="nossa-ignore">
 <textarea class="nossa-ignore">
```
