#!/usr/bin/env node

"use strict";

var resolve = require("resolve"),
	fs = require("fs"),
	path = require("path"),
	workingDir = process.cwd(),
	localApiMeta;

try {
	localApiMeta = requireLocal("api-meta/src/cli");

} catch (error) {
	logError();
	process.exit();
}

localApiMeta.run();

function requireLocal (id) {
	var localPath = resolve.sync(id, {
		basedir: workingDir
	});

	return require(localPath);
}

function logError () {
	var message = getErrorMessage();

	console.error(message, workingDir);
}

function getErrorMessage () {
	var messagePath = path.join(__dirname, "error-message.txt"),
		message = fs.readFileSync(messagePath, "utf-8");

	return message;
}