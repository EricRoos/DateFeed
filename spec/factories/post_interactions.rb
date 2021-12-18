# frozen_string_literal: true

FactoryBot.define do
  factory :post_interaction do
    association :profile
    association :post
  end
end
