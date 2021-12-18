# frozen_string_literal: true

module Types
  class ActivityFeedItemType < Types::BaseObject
    field :likeable, Boolean, null: false
    field :liked, Boolean, null: false
    field :post, PostType, null: false

    def likeable
      object.likeable?
    end
  end
end
