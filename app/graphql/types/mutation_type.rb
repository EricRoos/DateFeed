# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :toggle_post_interaction, mutation: Mutations::TogglePostInteraction
  end
end
