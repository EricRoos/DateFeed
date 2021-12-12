FactoryBot.define do
  factory :post do
    content { "MyText" }
    association :profile
    transient do
      interacted_with_by { [] }
    end

    after :create do |post, options|
      options.interacted_with_by.each do |profile|
        create(:post_interaction, profile: profile, post: post)
      end
    end
  end
end
