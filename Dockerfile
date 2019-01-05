FROM ruby:2.5-alpine

RUN apk add --no-cache build-base gcc bash cmake

RUN gem install jekyll

COPY Gemfile Gemfile

RUN bundle install

RUN rm Gemfile

RUN mkdir data

WORKDIR /site

VOLUME [ "/site" ]

EXPOSE 4000

CMD [ "bundle", "exec", "jekyll", "serve" ] 

