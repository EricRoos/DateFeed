# frozen_string_literal: true

module Types
  class ProfileType < Types::BaseObject
    include ActionView::Helpers::AssetUrlHelper 

    field :age, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :name, String, null: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :profile_image_url , String, null: true
    field :photo_urls, [String], null: true
    field :profile_images, [Types::ProfileImageType], null: false
    field :distance, Float, null: true
    field :looking_for, [String], null: false

    def profile_image_url
      profile_image = object.profile_images.detect { |img| img.primary }
      return ActionController::Base.helpers.image_path("default_profile.jpg") unless profile_image&.image&.present?
      Rails.application.routes.url_helpers
          .rails_blob_url(profile_image.image)
    end

    def photo_urls
      object.profile_images.map do |profile_image|
        Rails.application.routes.url_helpers
          .rails_blob_url(profile_image.image)
      end
    end

    def distance
      context[:current_user].profile.distance_to_profile(object)
    end
  end
end
