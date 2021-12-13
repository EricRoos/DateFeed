module Types
  class ActivityFeedItemType < Types::BaseObject
    field :post, PostType, null: false
    field :likeable, Boolean, null: false
    field :liked, Boolean, null: false

    def likeable
      object.likeable?
    end
  end
end
