module Mutations
  class CreatePost < BaseMutation
    # TODO: define return fields
    field :post, Types::PostType, null: true
    field :errors, [Types::ValidationErrorType], null: false

    argument :post_input, Types::CreatePostInputType, required: true

    # TODO: define resolve method
    def resolve(post_input:)
      {
        post: context[:current_user].profile.posts.create!(post_input.to_h),
        errors: []
      }
    rescue ActiveRecord::RecordInvalid => e
      { 
        post: nil,
        errors: e.record.errors.as_json.to_a.map { |e| { field: e[0], messages: e[1]} }
      }
    end

  end
end
