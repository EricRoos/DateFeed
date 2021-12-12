FactoryBot.define do
  factory :profile do
    age { (18...99).to_a.shuffle.first }
    name { Faker::Name.name  }
    association :user
  end
end
