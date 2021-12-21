# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.0'

gem 'rails', github: 'rails/rails', branch: 'main'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
#gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
# gem 'webpacker', '~> 5.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', github: 'rails/web-console'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'listen', '~> 3.3'
  gem 'rack-mini-profiler', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'cssbundling-rails', '~> 0.2.8'
gem 'database_cleaner-active_record', '~> 2.0', group: :test
gem 'devise', github: 'heartcombo/devise', branch: 'main'
gem 'factory_bot_rails', '~> 6.2', groups: %i[development test]
gem 'faker', '~> 2.19', groups: %i[development test]
gem 'graphql', '~> 1.13'
gem 'guard', '~> 2.18', groups: %i[development test]
gem 'guard-rspec', '~> 4.7', groups: %i[development test]
gem 'jsbundling-rails', '~> 0.2.2'
gem 'rspec-rails', '~> 5.0', groups: %i[development test]
gem 'rubocop-graphql', '~> 0.11.2', group: :development
gem 'rubocop-rails', '~> 2.12', group: :development
gem 'rubocop-rspec', '~> 2.6', group: :development
gem 'sunspot_rails', '~> 2.5'
gem 'sunspot_solr', '~> 2.5', group: :development
gem 'turbo-rails', '~> 0.9.0'
gem 'simplecov', require: false, group: :test


gem "sprockets-rails", "~> 3.4"
