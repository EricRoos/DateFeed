module Mutations
  class TogglePostInteraction < BaseMutation
    field :liked, Boolean , null: false

    argument :post_id, ID, required: true

    def resolve(post_id:)
      attrs = {
        post_id: post_id,
        profile_id: context[:current_user].profile.id
      }

      query_base = PostInteraction
        .where(attrs)

      if query_base.exists?
        query_base.destroy_all
        { liked: false }
      else
        { liked: PostInteraction.new(attrs).save }
      end
    end
  end
end
