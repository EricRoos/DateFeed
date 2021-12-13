module Types
  class MutationType < Types::BaseObject
    field :toggle_post_interaction, mutation: Mutations::TogglePostInteraction
    field :unlike_activity_feed_item, mutation: Mutations::UnlikeActivityFeedItem
    field :like_activity_feed_item, mutation: Mutations::LikeActivityFeedItem
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
