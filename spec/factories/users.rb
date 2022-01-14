# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'test123456' }
    uid { email }
    confirmed_at { DateTime.now }
  end
end
