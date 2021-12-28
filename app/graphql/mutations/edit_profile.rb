module Mutations
  class EditProfile < BaseMutation
    # TODO: define return fields
    field :profile, Types::ProfileType, null: false

    # TODO: define arguments
    argument :profile, Types::ProfileInputType, required: true

    def resolve(profile:)
      current_profile = context[:current_user].profile
      current_profile.update(profile.to_h)
      { profile: profile }
    end
  end
end
