require 'open-uri'
FactoryBot.define do
  factory :profile_image do
    primary { false }
    association :profile

    transient do
      randomized_image { false }
    end

    after :create do |profile_image, options|
      if options.randomized_image
        if ENV['USE_REAL_FAKE_IMAGE']&.present?
          io = URI.parse(JSON.parse(URI.parse('https://tinyfac.es/api/data?limit=1&quality=0').open.read).first["url"]).open
        else
          io = File.open(Rails.root.join("app/assets/images/default_profile.jpg"))
        end
        profile_image.image.attach(
          io: io,
          filename: "profile-image-#{profile_image.id}.jpg"
        )
      end
    end
  end
end
