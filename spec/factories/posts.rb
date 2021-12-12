FactoryBot.define do
  factory :post do
    content { "MyText" }
    association :profile
  end
end
