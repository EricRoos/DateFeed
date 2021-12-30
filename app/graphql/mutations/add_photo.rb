module Mutations
  class AddPhoto < BaseMutation
    field :post, Types::PostType, null: false

    # TODO: define arguments
    argument :file, ApolloUploadServer::Upload, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
  end
end
