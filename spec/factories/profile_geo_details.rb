FactoryBot.define do
  factory :profile_geo_detail do
    latitude { 1.5 }
    longitude { 1.5 }
    association :profile
  end
end
