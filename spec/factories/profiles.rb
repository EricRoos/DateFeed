# frozen_string_literal: true

FactoryBot.define do
  factory :profile do
    age { (18...99).to_a.sample }
    name { Faker::Name.name }
    association :user
  end
end
