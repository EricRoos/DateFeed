# frozen_string_literal: true

FactoryBot.define do
  factory :app_token do
    token { SecureRandom.alphanumeric(32) }
    sequence(:app_name) { |n| "App-#{n}" }
    host { '127.0.0.1' }
  end
end
