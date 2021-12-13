module Mutations
  class LikeActivityFeedItem < BaseMutation
    field :liked, Boolean , null: false

    argument :post_id, ID, required: true

    def resolve(post_id:)
      { liked: PostInteraction.new(
        post: Post.find(post_id),
        profile: context[:current_user].profile
      ).save }
    end
  end
end
