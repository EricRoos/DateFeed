FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'test123456' }
  end
end
