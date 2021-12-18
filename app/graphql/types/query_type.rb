# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    # include GraphQL::Types::Relay::HasNodeField
    # include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :profile, ProfileType, 'Find a profile by id' do
      argument :id, ID
    end
    field :profile_search, [ProfileType], 'Search for profiles' do
      argument :searchParam, ProfileSearchInputType
    end
    field :activity_feed, [ActivityFeedItemType], 'Look at the posts in the feed'
    def profile(id:)
      Profile.find(id)
    end

    def profile_search(searchParam:)
      actual_params = searchParam.to_h.reject { |_k, v| v.blank? }
      ProfileSearch.new(actual_params.merge(profile_id: context[:current_user].profile.id)).results
    end

    def activity_feed
      ActivityFeed.for(context[:current_user].profile)
    end
  end
end
