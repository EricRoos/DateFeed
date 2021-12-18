# frozen_string_literal: true

module Types
  class ActivityFeedItemType < Types::BaseObject
    field :likeable, Boolean, null: false, method: :likeable?
    field :liked, Boolean, null: false
    field :post, PostType, null: false
  end
end
