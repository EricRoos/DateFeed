module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :profile, ProfileType, "Find a profile by id" do
      argument :id, ID
    end

    def profile(id:)
      Profile.find(id)
    end
  end
end
