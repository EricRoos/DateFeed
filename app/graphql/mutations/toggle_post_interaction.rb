# frozen_string_literal: true

module Mutations
  class TogglePostInteraction < BaseMutation
    field :liked, Boolean, null: false

    argument :liked, Boolean, required: true
    argument :post_id, ID, required: true

    def resolve(post_id:, liked:)
      attrs = {
        post_id: post_id,
        profile_id: context[:current_user].profile.id
      }

      query_base = PostInteraction
                   .where(attrs)
      previously_liked = query_base.exists?
      if previously_liked && !liked
        query_base.destroy_all
        { liked: false }
      elsif !previously_liked && liked
        { liked: PostInteraction.new(attrs).save }
      else
        { liked: previously_liked }
      end
    end
  end
end
