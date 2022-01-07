# frozen_string_literal: true

FactoryBot.define do
  factory :profile do
    age { (18...99).to_a.sample }
    name { Faker::Name.name }
    looking_for { [:chat, :right_now] }
    association :user
    transient do
      with_geo_detail { false }
    end

    after :create do |profile, options|
      if options.with_geo_detail
        create(:profile_geo_detail, profile: profile)
      end
    end
  end
end
