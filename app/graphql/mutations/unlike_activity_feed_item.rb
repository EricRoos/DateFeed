module Mutations
  class UnlikeActivityFeedItem < BaseMutation
    field :unliked, Boolean , null: false

    argument :post_id, ID, required: true

    def resolve(post_id:)
      destroyed = PostInteraction.where(post_id: post_id)
          .where(profile: context[:current_user].profile)
          .first
          .destroy

      { unliked: destroyed }
    end
  end
end
