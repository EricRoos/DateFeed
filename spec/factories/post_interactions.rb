FactoryBot.define do
  factory :post_interaction do
    association :profile
    association :post
  end
end
