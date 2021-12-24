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
    field :distance, Float, null: true

    def profile_image_url
      profile_image = object.profile_images.detect { |img| img.primary }
      return ActionController::Base.helpers.image_path("default_profile.jpeg") unless profile_image&.image&.present?
      Rails.application.routes.url_helpers
          .rails_blob_url(profile_image.image)
    end

    def distance
      context[:current_user].profile.distance_to_profile(object)
    end
  end
end
