# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :add_photo, mutation: Mutations::AddPhoto
    field :edit_profile, mutation: Mutations::EditProfile
    field :log_location, mutation: Mutations::LogLocation
    field :create_post, mutation: Mutations::CreatePost
    field :toggle_post_interaction, mutation: Mutations::TogglePostInteraction
  end
end
