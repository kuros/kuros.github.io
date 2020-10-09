#!/usr/bin/env bash

git checkout master

git pull origin master

git checkout base

JEKYLL_ENV=prod bundle exec jekyll build

rm -rf /tmp/kuros_site
cp -rvf _site /tmp/kuros_site

git checkout master

rm -rf *

cp /tmp/kuros_site/* .
