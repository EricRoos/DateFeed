# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_post, mutation: Mutations::CreatePost
    field :toggle_post_interaction, mutation: Mutations::TogglePostInteraction
  end
end
