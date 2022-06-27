FROM jekyll/jekyll:3.8

COPY Gemfile* ./

RUN gem install bundler:2.2.24 && bundle install

ENTRYPOINT [ "jekyll" ]

CMD [ "build" ]